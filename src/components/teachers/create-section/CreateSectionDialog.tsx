'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Section, SectionData, sectionSchema } from '@/schemas/section.schema';
import { createSection } from '@/services/api/section';

export default function CreateSectionDialog({
	courseId,
	onSectionCreated,
}: {
	courseId: string;
	onSectionCreated: (newSection: Section) => void;
}) {
	const router = useRouter();
	const { toast } = useToast();
	const [isOpen, setIsOpen] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SectionData>({
		resolver: zodResolver(sectionSchema),
	});

	const onSubmit = async (data: SectionData) => {
		try {
			const newSection = await createSection(courseId, data);
			toast({
				title: 'Success',
				description: 'Section created successfully!',
				variant: 'success',
			});
			onSectionCreated(newSection);
			setIsOpen(false);
			router.refresh();
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Failed to create section.',
				variant: 'destructive',
			});
			console.error('Failed to create section:', error);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button className="bg-[#ffeee8] text-[#ff6636] text-base font-semibold capitalize leading-[48px] hover:bg-[#ff6636] hover:text-white">
					Add Sections
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Section Name</DialogTitle>
				</DialogHeader>
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
							Save
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}
