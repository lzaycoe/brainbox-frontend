'use client';

import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { PiList, PiPlusBold, PiTrashBold } from 'react-icons/pi';

import DeleteConfirmationDialog from '@/components/commons/teachers/DeleteConfirmationDialog';
import LectureTab from '@/components/teachers/create-lecture/LectureTab';
import UpdateSectionDialog from '@/components/teachers/create-section/UpdateSectionDialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Lecture } from '@/schemas/lecture.schema';
import { Section } from '@/schemas/section.schema';
import { getAllLecturesInsection } from '@/services/api/lecture';
import { deleteSection } from '@/services/api/section';

interface SectionTabProps {
	section: Section;
	index: number;
	courseId: string;
	onSectionDeleted: (deletedSectionId: string) => void;
	onSectionUpdated: (updatedSection: Section) => void;
}

const SectionTab: FC<SectionTabProps> = ({
	section,
	index,
	courseId,
	onSectionDeleted,
	onSectionUpdated,
}) => {
	const router = useRouter();
	const { toast } = useToast();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [lectures, setLectures] = useState<Lecture[]>([]);

	const handleDelete = async () => {
		try {
			await deleteSection(courseId, section.id.toString());
			onSectionDeleted(section.id.toString());
			toast({
				title: 'Success',
				description: 'Section deleted successfully!',
				variant: 'success',
			});
			router.refresh();
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Failed to delete section.',
				variant: 'destructive',
			});
			console.error('Failed to delete section:', error);
		} finally {
			setIsDialogOpen(false);
		}
	};

	const handleExpand = async () => {
		setIsExpanded(!isExpanded);
		if (!isExpanded) {
			const fetchedLectures = await getAllLecturesInsection(
				courseId,
				section.id.toString(),
			);
			if (fetchedLectures) {
				setLectures(fetchedLectures);
			}
		}
	};

	const handleLectureDeleted = (deletedLectureId: string) => {
		setLectures((prevLectures) =>
			prevLectures.filter((lec) => lec.id.toString() !== deletedLectureId),
		);
	};

	const handleCreateLectureClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		router.push(
			`/teachers/courses/${courseId}/sections/${section.id}/create-lecture`,
		);
	};

	return (
		<div>
			<div
				className="w-[1240px] h-[72px] p-6 flex justify-between items-center bg-slate-100 border border-gray-300 cursor-pointer"
				onClick={handleExpand}
				role="button"
			>
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
					<Button variant="ghost" onClick={handleCreateLectureClick}>
						<PiPlusBold className="w-6 h-6 text-[#8C94A3]" />
					</Button>
					<UpdateSectionDialog
						courseId={courseId}
						sectionId={section.id.toString()}
						initialTitle={section.title}
						onSectionUpdated={onSectionUpdated}
					/>
					<DeleteConfirmationDialog
						isOpen={isDialogOpen}
						onOpenChange={setIsDialogOpen}
						onConfirm={handleDelete}
						trigger={
							<Button variant="ghost" onClick={(e) => e.stopPropagation()}>
								<PiTrashBold className="w-6 h-6 text-[#8C94A3]" />
							</Button>
						}
					/>
				</div>
			</div>
			{isExpanded && (
				<div className="bg-slate-100 px-8 pb-5 border border-gray-300">
					{lectures.map((lecture, idx) => (
						<LectureTab
							key={lecture.id}
							lecture={lecture}
							index={idx + 1}
							courseId={courseId}
							sectionId={section.id.toString()}
							onLectureDeleted={handleLectureDeleted}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default SectionTab;
