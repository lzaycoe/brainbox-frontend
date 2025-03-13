'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
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
import { Spinner } from '@/components/ui/spinner';
import { CourseData } from '@/schemas/course.schema';
import { formatCurrency } from '@/utils/currency';

interface FormAdvanceInfoProps {
	onPreviousTab: () => void;
	onSubmit: (data: CourseData, file: File | null) => Promise<void>;
	isLoading?: boolean;
	isEdit?: boolean;
	initialThumbnail?: string | null;
}

const FormAdvanceInfo: React.FC<FormAdvanceInfoProps> = ({
	onPreviousTab,
	onSubmit,
	isLoading = false,
	isEdit = false,
	initialThumbnail,
}) => {
	const { handleSubmit, control, setValue, trigger } =
		useFormContext<CourseData>();

	const fileInputRef = useRef<HTMLInputElement>(null);
	const [thumbnail, setThumbnail] = useState<string | null>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [displayOriginPrice, setDisplayOriginPrice] = useState<string>('');
	const [displaySalePrice, setDisplaySalePrice] = useState<string>('');

	useEffect(() => {
		const originPrice = control._formValues.originPrice;
		const salePrice = control._formValues.salePrice;

		if (isEdit) {
			if (originPrice !== undefined && displayOriginPrice === '') {
				setValue('originPrice', Number(originPrice), { shouldValidate: true });
				setDisplayOriginPrice(formatCurrency(originPrice));
			}
			if (salePrice !== undefined && displaySalePrice === '') {
				setValue('salePrice', Number(salePrice), { shouldValidate: true });
				setDisplaySalePrice(formatCurrency(salePrice));
			}
		}
	}, [
		control._formValues.originPrice,
		control._formValues.salePrice,
		displayOriginPrice,
		displaySalePrice,
		isEdit,
		setValue,
	]);

	useEffect(() => {
		if (initialThumbnail && !thumbnail) {
			setThumbnail(initialThumbnail);
		}
	}, [initialThumbnail, thumbnail]);

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

	const handleNumberChange = (
		field: keyof CourseData,
		value: string,
		setDisplay: (val: string) => void,
	) => {
		const numericValue = value.replace(/\D/g, '');
		const parsedValue =
			numericValue === '' ? undefined : parseFloat(numericValue);

		setValue(field, parsedValue ?? 0, { shouldValidate: true });
		setDisplay(numericValue);
		trigger(field);
	};

	const handleBlur = (
		field: keyof CourseData,
		value: string,
		setDisplay: (val: string) => void,
	) => {
		const numericValue = value.replace(/\D/g, '');
		const parsedValue =
			numericValue === '' ? undefined : parseFloat(numericValue);
		setDisplay(formatCurrency(parsedValue));
	};

	const handleFormSubmit = (data: CourseData) => {
		onSubmit(data, selectedFile);
	};

	const submitButtonText = isEdit ? 'Update' : 'Create';

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
												fill
												sizes="(max-width: 450px) 100vw, 450px"
												style={{ objectFit: 'cover' }}
											/>
										) : (
											<Image
												src="/app/course-thumbnail-placeholder.png"
												alt="Course Thumbnail Placeholder"
												fill
												sizes="(max-width: 450px) 100vw, 450px"
												style={{ objectFit: 'cover' }}
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
										<button
											type="button"
											className="px-6 bg-[#ffeee8] justify-center items-center gap-3 inline-flex cursor-pointer"
											onClick={handleUploadClick}
										>
											<div className="text-[#ff6636] text-base font-semibold capitalize leading-[48px]">
												Upload image
											</div>
											<PiUploadSimpleBold className="text-[#ff6636]" />
										</button>
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
					rules={{
						validate: (value) =>
							(value !== undefined && value >= 2000) ||
							'Original price must be at least 2000 VND',
					}}
					render={() => (
						<FormItem>
							<FormLabel className="text-lg">Original Price</FormLabel>
							<FormControl>
								<Input
									type="text"
									className="h-14 text-lg"
									placeholder="Enter original price (VND)"
									value={displayOriginPrice}
									onChange={(e) =>
										handleNumberChange(
											'originPrice',
											e.target.value,
											setDisplayOriginPrice,
										)
									}
									onBlur={(e) =>
										handleBlur(
											'originPrice',
											e.target.value,
											setDisplayOriginPrice,
										)
									}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="salePrice"
					rules={{
						validate: (value) =>
							(value !== undefined && value >= 2000) ||
							'Sale price must be at least 2000 VND',
					}}
					render={() => (
						<FormItem>
							<FormLabel className="text-lg">Sale Price</FormLabel>
							<FormControl>
								<Input
									type="text"
									className="h-14 text-lg"
									placeholder="Enter sale price (VND)"
									value={displaySalePrice}
									onChange={(e) =>
										handleNumberChange(
											'salePrice',
											e.target.value,
											setDisplaySalePrice,
										)
									}
									onBlur={(e) =>
										handleBlur('salePrice', e.target.value, setDisplaySalePrice)
									}
								/>
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
						disabled={isLoading}
					>
						Previous
					</Button>
					<Button
						type="submit"
						variant="outline"
						className="text-lg h-14 bg-orange-500 text-white disabled:opacity-70"
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
		</div>
	);
};

export default FormAdvanceInfo;
