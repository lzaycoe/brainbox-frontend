'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { LectureData, lectureSchema } from '@/schemas/lecture.schema';
import { createLecture, updateLecture } from '@/services/api/lecture';
import { deleteAttachment } from '@/services/supabase/delete';
import { uploadAttachment } from '@/services/supabase/upload';

import FileUploadInput from './FileUploadInput';

interface FormCreateLectureProps {
	readonly initialData?: LectureData;
	readonly isEdit?: boolean;
	readonly courseId: string;
	readonly sectionId: string;
	readonly lectureId?: string;
}

export default function FormCreateLecture({
	initialData,
	isEdit = false,
	courseId,
	sectionId,
	lectureId,
}: FormCreateLectureProps) {
	const { toast } = useToast();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		reset,
	} = useForm<LectureData>({
		resolver: zodResolver(lectureSchema),
		defaultValues: initialData || {
			title: '',
			description: '',
			content: '',
			type: undefined,
			attachments: [],
			canPreview: false,
		},
	});

	const [type, setType] = useState<'video' | 'file' | ''>(
		initialData?.type || '',
	);
	const [uploadOption, setUploadOption] = useState<'link' | 'file'>(
		initialData?.attachments?.length && initialData.type === 'video'
			? 'link'
			: 'file',
	);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (initialData) {
			reset(initialData);
			setType(initialData.type || '');
			setUploadOption(
				initialData.attachments?.length && initialData.type === 'video'
					? 'link'
					: 'file',
			);
		}
	}, [initialData, reset]);

	const validateFileUpload = (): boolean => {
		const requiresFile =
			type === 'file' || (type === 'video' && uploadOption === 'file');
		if (requiresFile && !selectedFile) {
			throw new Error('No file selected for upload');
		}
		return requiresFile;
	};

	const handleAttachment = async (data: LectureData) => {
		if (type === 'file' || (type === 'video' && uploadOption === 'file')) {
			if (isEdit && initialData?.attachments?.[0]) {
				await deleteAttachment(initialData.attachments[0]);
			}
			const publicUrl = await uploadAttachment(selectedFile!);
			if (!publicUrl) {
				throw new Error('Failed to upload attachment');
			}
			data.attachments = [publicUrl];
		} else if (type === 'video' && uploadOption === 'link') {
			if (!data.attachments?.[0] && initialData?.attachments?.[0]) {
				data.attachments = initialData.attachments;
			}
		}
	};

	const submitLecture = async (data: LectureData) => {
		if (isEdit && lectureId) {
			await updateLecture(courseId, sectionId, lectureId, data);
			toast({
				title: 'Success',
				description: 'Lecture updated successfully!',
				variant: 'success',
			});
		} else {
			await createLecture(courseId, sectionId, data);
			toast({
				title: 'Success',
				description: 'Lecture created successfully!',
				variant: 'success',
			});
		}
		router.push(`/teachers/courses/${courseId}/sections`);
	};

	const onSubmit = async (data: LectureData) => {
		setIsLoading(true);
		try {
			if (validateFileUpload()) {
				await handleAttachment(data);
			} else if (type === 'video' && uploadOption === 'link') {
				await handleAttachment(data);
			}
			await submitLecture(data);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Failed to process lecture';
			console.error('Error in onSubmit:', error);
			toast({
				title: 'Error',
				description: errorMessage,
				variant: 'destructive',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const submitButtonText = isEdit ? 'Update Lecture' : 'Create Lecture';

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit((data) => {
					onSubmit(data);
				})(e);
			}}
			className="space-y-6 bg-white p-8 my-5"
		>
			<div className="flex flex-col space-y-2">
				<label htmlFor="title" className="text-lg font-medium text-[#1d1f26]">
					Title
				</label>
				<Input id="title" {...register('title')} placeholder="Enter title" />
				{errors.title && (
					<p className="text-red-500 text-sm">{errors.title.message}</p>
				)}
			</div>
			<div className="flex flex-col space-y-2">
				<label
					htmlFor="description"
					className="text-lg font-medium text-[#1d1f26]"
				>
					Description
				</label>
				<Textarea
					id="description"
					{...register('description')}
					placeholder="Enter description"
				/>
				{errors.description && (
					<p className="text-red-500 text-sm">{errors.description.message}</p>
				)}
			</div>
			<div className="flex flex-col space-y-2">
				<label htmlFor="content" className="text-lg font-medium text-[#1d1f26]">
					Content
				</label>
				<Textarea
					id="content"
					{...register('content')}
					placeholder="Enter content"
				/>
				{errors.content && (
					<p className="text-red-500 text-sm">{errors.content.message}</p>
				)}
			</div>
			<div className="flex flex-col space-y-2">
				<label htmlFor="note" className="text-lg font-medium text-[#1d1f26]">
					Note
				</label>
				<Textarea id="note" {...register('note')} placeholder="Enter note" />
			</div>
			<div className="flex flex-col space-y-2">
				<label htmlFor="type" className="text-lg font-medium text-[#1d1f26]">
					Type
				</label>
				<Controller
					name="type"
					control={control}
					render={({ field }) => (
						<Select
							onValueChange={(value) => {
								field.onChange(value);
								setType(value as 'video' | 'file');
							}}
							value={field.value}
						>
							<SelectTrigger>
								<SelectValue placeholder="Select type" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="video">Video</SelectItem>
								<SelectItem value="file">Document</SelectItem>
							</SelectContent>
						</Select>
					)}
				/>
				{errors.type && (
					<p className="text-red-500 text-sm">{errors.type.message}</p>
				)}
			</div>
			{type === 'file' && (
				<FileUploadInput
					id="attachments"
					accept=".txt,.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
					label="Upload Document"
					register={register}
					onFileChange={(file) => {
						console.log('File selected:', file.name);
						setSelectedFile(file);
					}}
				/>
			)}
			{type === 'video' && (
				<div className="flex flex-col space-y-2">
					<label
						htmlFor="uploadOption"
						className="text-lg font-medium text-[#1d1f26]"
					>
						Upload Video
					</label>
					<RadioGroup
						value={uploadOption}
						onValueChange={(value: string) =>
							setUploadOption(value as 'link' | 'file')
						}
					>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="link" id="upload-link" />
							<label
								htmlFor="upload-link"
								className="text-lg font-medium text-[#1d1f26]"
							>
								Upload by Link
							</label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="file" id="upload-file" />
							<label
								htmlFor="upload-file"
								className="text-lg font-medium text-[#1d1f26]"
							>
								Upload Video File
							</label>
						</div>
					</RadioGroup>
					{uploadOption === 'link' && (
						<div className="flex flex-col space-y-2">
							<label
								htmlFor="videoLink"
								className="text-lg font-medium text-[#1d1f26]"
							>
								Video Link
							</label>
							<Input
								id="videoLink"
								{...register('attachments.0')}
								placeholder="Enter video link"
							/>
						</div>
					)}
					{uploadOption === 'file' && (
						<FileUploadInput
							id="attachments"
							accept="video/*"
							label="Upload Video"
							register={register}
							onFileChange={(file) => {
								setSelectedFile(file);
							}}
						/>
					)}
				</div>
			)}
			<div className="flex items-center space-x-2">
				<Controller
					name="canPreview"
					control={control}
					render={({ field }) => (
						<Checkbox
							id="canPreview"
							checked={field.value}
							onCheckedChange={(checked) => {
								field.onChange(checked);
							}}
						/>
					)}
				/>
				<label
					htmlFor="canPreview"
					className="text-lg font-medium text-[#1d1f26]"
				>
					Can Preview
				</label>
			</div>
			<div className="flex justify-end">
				<Button
					type="submit"
					className="bg-[#ff6636] text-white text-lg py-6 px-6 disabled:opacity-70"
					disabled={isLoading}
				>
					{isLoading ? (
						<div className="flex items-center space-x-2">
							<Spinner size="small" />
							<span>{isEdit ? 'Updating...' : 'Creating...'}</span>
						</div>
					) : (
						submitButtonText
					)}
				</Button>
			</div>
		</form>
	);
}
