'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Section, SectionData } from '@/schemas/section.schema';
import { createSection } from '@/services/api/section';

import SectionForm from './SectionForm';

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

	const handleCreate = async (data: SectionData) => {
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
				<SectionForm onSubmit={handleCreate} buttonText="Save" />
			</DialogContent>
		</Dialog>
	);
}
