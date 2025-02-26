'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { SectionData, sectionSchema } from '@/schemas/section.schema';

interface SectionFormProps {
	initialTitle?: string;
	onSubmit: (data: SectionData) => Promise<void>;
	buttonText: string;
}

const SectionForm: React.FC<SectionFormProps> = ({
	initialTitle,
	onSubmit,
	buttonText,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SectionData>({
		resolver: zodResolver(sectionSchema),
		defaultValues: { title: initialTitle || '' },
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			<div className="flex flex-col space-y-1">
				<label
					htmlFor="sectionName"
					className="text-sm font-medium text-[#1d1f26]"
				>
					Section
				</label>
				<input
					id="title"
					{...register('title')}
					className="w-full pl-4 pr-4 pt-3 pb-3 bg-white border border-[#e8eaef] text-base font-normal text-[#8c93a3]"
					placeholder="Write your section name here.."
				/>
				{errors.title && (
					<p className="text-red-500 text-sm">{errors.title.message}</p>
				)}
			</div>
			<div className="flex justify-between">
				<DialogClose asChild>
					<Button
						type="button"
						variant="outline"
						className="bg-[#f4f7f9] text-[#1d1f26]"
					>
						Cancel
					</Button>
				</DialogClose>
				<Button type="submit" className="bg-[#ff6636] text-white">
					{buttonText}
				</Button>
			</div>
		</form>
	);
};

export default SectionForm;
