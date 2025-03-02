import debounce from 'lodash/debounce';
import React, { useCallback, useMemo, useState } from 'react';
import {
	PiArrowDownBold,
	PiArrowUpBold,
	PiChecks,
	PiPlayCircle,
} from 'react-icons/pi';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

interface LectureDetail {
	id: number;
	title: string;
	isDone: boolean;
	isActive?: boolean;
}

interface Section {
	id: number;
	title: string;
	lecturesCount: number;
	progress: number;
	isExpanded: boolean;
	lecturesDetails: LectureDetail[];
}

interface CourseMenuProps {
	progress: number;
	sections: Section[];
	onToggleSection: (sectionId: number) => void;
	onToggleLectureActive: (sectionId: number, lectureId: number) => void;
	onCheckboxChange: (sectionId: number, lectureId: number) => Promise<void>;
}

const CourseMenu: React.FC<CourseMenuProps> = ({
	progress,
	sections,
	onToggleSection,
	onToggleLectureActive,
	onCheckboxChange,
}) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	const debouncedCheckboxChange = useMemo(
		() =>
			debounce((sectionId: number, lectureId: number) => {
				onCheckboxChange(sectionId, lectureId);
			}, 500),
		[onCheckboxChange],
	);

	const isCourseCompleted = (updatedSections: Section[]): boolean => {
		return updatedSections.every((section) =>
			section.lecturesDetails.every((lecture) => lecture.isDone),
		);
	};

	const handleCheckboxChangeWrapper = useCallback(
		(sectionId: number, lectureId: number) => {
			const updatedSections = sections.map((section) =>
				section.id === sectionId
					? {
							...section,
							lecturesDetails: section.lecturesDetails.map((lecture) =>
								lecture.id === lectureId && !lecture.isDone
									? { ...lecture, isDone: true }
									: lecture,
							),
						}
					: section,
			);

			if (isCourseCompleted(updatedSections)) {
				setIsDialogOpen(true);
			}

			debouncedCheckboxChange(sectionId, lectureId);
		},
		[sections, debouncedCheckboxChange],
	);

	return (
		<div className="flex flex-col max-w-[603px]">
			<div className="flex flex-wrap gap-10 justify-between items-center w-full font-semibold max-md:max-w-full">
				<h2 className="self-stretch my-auto text-2xl tracking-tight leading-none text-neutral-800">
					Course Contents
				</h2>
				<div
					className="self-stretch my-auto text-base leading-none text-right text-green-600"
					aria-live="polite"
				>
					{progress.toFixed(1)}% Completed
				</div>
			</div>
			<div className="flex flex-col mt-4 w-full max-md:max-w-full">
				<div className="relative w-full h-2 bg-gray-200 rounded-md overflow-hidden">
					<progress
						className="absolute top-0 left-0 w-full h-4 appearance-none"
						value={progress}
						max={100}
					>
						{progress}%
					</progress>
					<div
						className="absolute top-0 left-0 h-4 bg-green-600"
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>
			<div className="flex flex-col bg-white border border-gray-200 max-w-[603px] mt-4">
				{sections.map((section) => (
					<div
						key={section.id}
						className={`${section.isExpanded ? 'bg-slate-100' : 'bg-white'}`}
					>
						<button
							className="flex flex-wrap gap-10 justify-between items-center p-4 w-full max-md:max-w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
							onClick={() => onToggleSection(section.id)}
							aria-expanded={section.isExpanded}
							aria-controls={`section-${section.id}`}
						>
							<span className="flex gap-2 items-center my-auto text-base leading-none text-neutral-800 flex-1 min-w-0">
								<span
									className="flex shrink-0 items-center w-5 h-5"
									aria-hidden="true"
								>
									{section.isExpanded ? (
										<PiArrowUpBold className="object-contain w-5 h-4 text-orange-500" />
									) : (
										<PiArrowDownBold className="object-contain w-5 h-4 text-neutral-800" />
									)}
								</span>
								<span
									className={`ml-1 ${
										section.isExpanded ? 'text-orange-500' : 'text-neutral-800'
									} truncate text-base font-medium leading-none max-w-[300px]`}
									title={section.title}
								>
									{section.title}
								</span>
							</span>
							<span className="flex gap-2 items-center text-sm tracking-normal leading-loose text-gray-600">
								<span className="flex gap-1 items-center">
									<PiPlayCircle
										className="object-contain w-4 h-4"
										color="#564FFD"
									/>
									<span>{section.lecturesCount} lectures</span>
								</span>
								<span className="flex gap-1 items-center text-gray-400">
									<PiChecks
										className="object-contain w-4 h-4"
										color="#23BD33"
									/>
									<span>{section.progress.toFixed(1)}%</span>
								</span>
							</span>
						</button>
						<div className="w-full bg-white border border-gray-200 min-h-[1px] max-md:max-w-full" />
						{section.isExpanded && (
							<div id={`section-${section.id}`}>
								{section.lecturesDetails.map((lecture) => (
									<button
										key={lecture.id}
										className={`flex flex-wrap gap-10 justify-between items-center px-5 py-3 w-full ${
											lecture.isActive ? 'bg-rose-100 text-neutral-800' : ''
										} max-md:max-w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500`}
										onClick={() =>
											onToggleLectureActive(section.id, lecture.id)
										}
										aria-pressed={lecture.isActive}
									>
										<span
											className={`flex gap-3 items-center self-stretch my-auto ${
												lecture.isActive
													? 'font-medium leading-none'
													: 'text-gray-600'
											}`}
										>
											<input
												type="checkbox"
												checked={lecture.isDone}
												disabled={lecture.isDone}
												onChange={() =>
													handleCheckboxChangeWrapper(section.id, lecture.id)
												}
												onClick={(e) => e.stopPropagation()}
												className="flex shrink-0 self-stretch my-auto h-[18px] w-[18px] accent-green-500"
											/>
											<span className="self-stretch my-auto">
												{lecture.title}
											</span>
										</span>
									</button>
								))}
							</div>
						)}
					</div>
				))}
			</div>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Congratulation!</DialogTitle>
						<DialogDescription>
							You have completed 100% of the course! This is a great
							achievement. Keep learning and exploring!
						</DialogDescription>
					</DialogHeader>
					<button
						className="mt-4 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
						onClick={() => setIsDialogOpen(false)}
					>
						Close
					</button>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default CourseMenu;
