'use client';

import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { PiList, PiPencilSimpleLineBold, PiTrashBold } from 'react-icons/pi';

import DeleteConfirmationDialog from '@/components/commons/teachers/DeleteConfirmationDialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Lecture } from '@/schemas/lecture.schema';
import { deleteLecture } from '@/services/api/lecture';

interface LectureTabProps {
	lecture: Lecture;
	index: number;
	courseId: string;
	sectionId: string;
	onLectureDeleted: (deletedLectureId: string) => void;
}

const LectureTab: FC<LectureTabProps> = ({
	lecture,
	index,
	courseId,
	sectionId,
	onLectureDeleted,
}) => {
	const router = useRouter();
	const { toast } = useToast();
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const handleDelete = async () => {
		try {
			await deleteLecture(courseId, sectionId, lecture.id.toString());
			onLectureDeleted(lecture.id.toString());
			toast({
				title: 'Success',
				description: 'Lecture deleted successfully!',
				variant: 'success',
			});
			router.refresh();
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Failed to delete lecture.',
				variant: 'destructive',
			});
			console.error('Failed to delete lecture:', error);
		} finally {
			setIsDialogOpen(false);
		}
	};

	return (
		<div className="w-full h-[72px] p-6 flex justify-between items-center bg-white border border-gray-300 cursor-pointer my-5">
			<div className="flex items-center gap-3">
				<div className="flex items-center gap-2">
					<PiList className="w-5 h-5 text-[#1D2026]" />
					<div className="text-[#1d1f26] text-base font-medium leading-snug">
						Lecture {index}:
					</div>
				</div>
				<div className="text-[#1d1f26] text-base font-normal leading-normal">
					{lecture.title}
				</div>
			</div>
			<div className="flex items-center gap-2">
				<Button
					variant="ghost"
					onClick={() =>
						router.push(
							`/teachers/courses/${courseId}/sections/${sectionId}/lectures/${lecture.id}/update-lecture`,
						)
					}
				>
					<PiPencilSimpleLineBold className="w-6 h-6 text-[#8C94A3]" />
				</Button>
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

export default LectureTab;
