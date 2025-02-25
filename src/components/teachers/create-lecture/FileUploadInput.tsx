'use client';

import { useState } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { Input } from '@/components/ui/input';

interface FileUploadInputProps<T extends FieldValues> {
	id: Path<T>;
	accept: string;
	label: string;
	register: UseFormRegister<T>;
	onFileChange: (file: File) => void;
}

export default function FileUploadInput<T extends FieldValues>({
	id,
	accept,
	label,
	register,
	onFileChange,
}: FileUploadInputProps<T>) {
	const [fileName, setFileName] = useState<string | null>(null);
	const [fileUrl, setFileUrl] = useState<string | null>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setFileName(file.name);
			onFileChange(file);

			if (file.type.startsWith('video/')) {
				const url = URL.createObjectURL(file);
				setFileUrl(url);
			} else {
				setFileUrl(null);
			}
		}
	};

	return (
		<div className="flex flex-col justify-start items-start gap-4 max-w-[800px]">
			<div className="w-full h-12 flex justify-between items-center bg-white border border-[#e8eaef] px-4">
				<div
					className="text-[#8c93a3] text-base font-normal leading-normal truncate max-w-[70%]"
					title={fileName || 'Upload Files'}
				>
					{fileName || 'Upload Files'}
				</div>
				<label
					htmlFor={id}
					className="text-[#1d1f26] text-base font-semibold capitalize leading-[48px] cursor-pointer"
				>
					{label}
				</label>
				<Input
					id={id}
					type="file"
					accept={accept}
					{...register(id)}
					className="hidden"
					onChange={handleFileChange}
				/>
			</div>
			{fileUrl && (
				<div className="w-full">
					<video src={fileUrl} controls className="w-full h-auto" />
				</div>
			)}
		</div>
	);
}
