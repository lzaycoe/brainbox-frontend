'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PiPencilSimpleLineBold } from 'react-icons/pi';

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
import { updateSection } from '@/services/api/section';

import SectionForm from './SectionForm';

interface UpdateSectionDialogProps {
	courseId: string;
	sectionId: string;
	initialTitle: string;
	onSectionUpdated: (updatedSection: Section) => void;
}

const UpdateSectionDialog: React.FC<UpdateSectionDialogProps> = ({
	courseId,
	sectionId,
	initialTitle,
	onSectionUpdated,
}) => {
	const router = useRouter();
	const { toast } = useToast();
	const [isOpen, setIsOpen] = useState(false);

	const handleUpdate = async (data: SectionData) => {
		try {
			const updatedSection = await updateSection(courseId, sectionId, data);
			toast({
				title: 'Success',
				description: 'Section updated successfully!',
				variant: 'success',
			});
			onSectionUpdated(updatedSection);
			setIsOpen(false);
			router.refresh();
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Failed to update section.',
				variant: 'destructive',
			});
			console.error('Failed to update section:', error);
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost">
					<PiPencilSimpleLineBold className="w-6 h-6 text-[#8C94A3]" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update Section Name</DialogTitle>
				</DialogHeader>
				<SectionForm
					initialTitle={initialTitle}
					onSubmit={handleUpdate}
					buttonText="Save"
				/>
			</DialogContent>
		</Dialog>
	);
};

export default UpdateSectionDialog;
