'use client';

import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { PiUploadSimpleBold } from 'react-icons/pi';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormData } from '@/schemas/course.schema';

interface FormAdvanceInfoProps {
	onPreviousTab: () => void;
	onSubmit: (data: FormData, file: File | null) => Promise<void>;
}

const FormAdvanceInfo: React.FC<FormAdvanceInfoProps> = ({
	onPreviousTab,
	onSubmit,
}) => {
	const { handleSubmit, control, setValue } = useFormContext<FormData>();

	const fileInputRef = useRef<HTMLInputElement>(null);
	const [thumbnail, setThumbnail] = useState<string | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const handleUploadClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setThumbnail(URL.createObjectURL(file));
			setSelectedFile(file);
			setValue('thumbnail', file.name, { shouldValidate: true });
		}
	};

	const handleNumberChange = (field: keyof FormData, value: string) => {
		const parsedValue = value === '' ? undefined : parseFloat(value);
		setValue(field, parsedValue ?? 0, {
			shouldValidate: true,
		});
	};

	const handleFormSubmit = (data: FormData) => {
		onSubmit(data, selectedFile);
	};

	return (
		<div className="flex flex-col gap-8">
			<div className="self-stretch justify-between items-center inline-flex">
				<div className="text-[#1d1f26] text-3xl font-semibold">
					Advance Information
				</div>
			</div>
			<form
				onSubmit={handleSubmit(handleFormSubmit)}
				className="flex flex-col gap-8"
			>
				<FormField
					control={control}
					name="thumbnail"
					render={() => (
						<FormItem>
							<div className="flex-col justify-start items-start gap-4 inline-flex">
								<FormLabel className="text-lg">Course Thumbnail</FormLabel>
								<div className="justify-start items-start gap-6 inline-flex">
									<div className="relative w-[450px] h-[250px]">
										{thumbnail ? (
											<Image
												src={thumbnail}
												alt="Course Thumbnail"
												layout="fill"
												objectFit="cover"
											/>
										) : (
											<Image
												src="/app/course-thumbnail-placeholder.png"
												alt="Course Thumbnail Placeholder"
												layout="fill"
												objectFit="cover"
											/>
										)}
									</div>
									<div className="flex-col justify-start items-start gap-6 inline-flex">
										<div className="w-[344px]">
											<span className="text-[#6e7484] text-sm font-normal leading-snug">
												Upload your course Thumbnail here.{' '}
											</span>
											<span className="text-[#1d1f26] text-sm font-medium leading-tight">
												Important guidelines:
											</span>
											<span className="text-[#6e7484] text-sm font-normal leading-snug">
												{' '}
												1200x800 pixels or 12:8 Ratio. Supported format:{' '}
											</span>
											<span className="text-[#1d1f26] text-sm font-medium leading-tight">
												.jpg, .jpeg, or .png
											</span>
										</div>
										<div
											className="px-6 bg-[#ffeee8] justify-center items-center gap-3 inline-flex cursor-pointer"
											onClick={handleUploadClick}
										>
											<div className="text-[#ff6636] text-base font-semibold capitalize leading-[48px]">
												Upload image
											</div>
											<PiUploadSimpleBold className="text-[#ff6636]" />
										</div>
										<input
											type="file"
											accept=".jpg, .jpeg, .png"
											className="hidden"
											ref={fileInputRef}
											onChange={handleFileChange}
										/>
									</div>
								</div>
							</div>
							<FormControl>
								<Input
									type="file"
									accept=".jpg, .jpeg, .png"
									className="hidden"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="originPrice"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-lg">Original Price</FormLabel>
							<FormControl>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lg text-gray-500">
										$
									</span>
									<Input
										type="number"
										className="h-14 text-lg pl-8"
										placeholder="Enter original price"
										value={field.value ?? ''}
										onChange={(e) =>
											handleNumberChange('originPrice', e.target.value)
										}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="salePrice"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-lg">Sale Price</FormLabel>
							<FormControl>
								<div className="relative">
									<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lg text-gray-500">
										$
									</span>
									<Input
										type="number"
										className="h-14 text-lg pl-8"
										placeholder="Enter sale price"
										value={field.value ?? ''}
										onChange={(e) =>
											handleNumberChange('salePrice', e.target.value)
										}
									/>
								</div>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="public"
					render={({ field }) => (
						<FormItem>
							<FormLabel className="text-lg">Make Course Public</FormLabel>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
									className="text-lg ml-1"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-between">
					<Button
						variant="outline"
						type="button"
						className="text-lg h-14"
						onClick={onPreviousTab}
					>
						Previous
					</Button>
					<Button
						type="submit"
						variant="outline"
						className="text-lg h-14 bg-orange-500 text-white"
					>
						Create
					</Button>
				</div>
			</form>
		</div>
	);
};

export default FormAdvanceInfo;
