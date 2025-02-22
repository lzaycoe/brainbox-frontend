import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { PiList, PiPlusBold, PiTrashBold } from 'react-icons/pi';

import DeleteConfirmationDialog from '@/components/commons/teachers/DeleteConfirmationDialog';
import UpdateSectionDialog from '@/components/teachers/create-section/UpdateSectionDialog';
import { Button } from '@/components/ui/button';
import { Section } from '@/schemas/section.schema';
import { deleteSection } from '@/services/api/section';

interface SectionTabProps {
	section: Section;
	index: number;
	courseId: string;
}

const SectionTab: FC<SectionTabProps> = ({ section, index, courseId }) => {
	const router = useRouter();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleDelete = async () => {
		try {
			await deleteSection(courseId, section.id.toString());
			router.refresh();
		} catch (error) {
			console.error('Failed to delete section:', error);
		} finally {
			setIsDialogOpen(false);
		}
	};

	return (
		<div className="w-[1240px] h-[72px] p-6 flex justify-between items-center bg-slate-100 border border-gray-300 cursor-pointer">
			<div className="flex items-center gap-3">
				<div className="flex items-center gap-2">
					<PiList className="w-5 h-5 text-[#1D2026]" />
					<div className="text-[#1d1f26] text-base font-medium leading-snug">
						Sections {index}:
					</div>
				</div>
				<div className="text-[#1d1f26] text-base font-normal leading-normal">
					{section.title}
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Button variant="ghost">
					<PiPlusBold className="w-6 h-6 text-[#8C94A3]" />
				</Button>
				<UpdateSectionDialog
					courseId={courseId}
					sectionId={section.id.toString()}
					initialTitle={section.title}
				/>
				<DeleteConfirmationDialog
					isOpen={isDialogOpen}
					onOpenChange={setIsDialogOpen}
					onConfirm={handleDelete}
					trigger={
						<Button variant="ghost">
							<PiTrashBold className="w-6 h-6 text-[#8C94A3]" />
						</Button>
					}
				/>
			</div>
		</div>
	);
};

export default SectionTab;
