import React from 'react';
import { PiArrowLeftBold, PiFolderOpen, PiPlayCircle } from 'react-icons/pi';

interface HeaderProps {
	courseTitle: string;
	sectionsCount: number;
	lecturesCount: number;
	onNextLecture: () => void;
	onGoBack: () => void;
}

export default function Header({
	courseTitle,
	sectionsCount,
	lecturesCount,
	onNextLecture,
	onGoBack,
}: HeaderProps) {
	return (
		<div className="flex justify-between items-center px-8 py-5 bg-slate-100 max-md:px-5">
			<div className="flex items-center gap-4">
				<button
					className="flex items-center justify-center w-10 h-10 rounded-full bg-white cursor-pointer"
					aria-label="Go back"
					onClick={onGoBack}
				>
					<PiArrowLeftBold className="object-contain w-6 h-8" />
				</button>

				{/* Course Details */}
				<div>
					<h2 className="text-lg font-medium text-neutral-800">
						{courseTitle}
					</h2>
					<div className="flex gap-4 mt-2 text-sm text-gray-600">
						{/* Sections */}
						<div className="flex items-center gap-1">
							<div
								className="rounded-full flex items-center justify-center"
								aria-label="Sections icon"
							>
								<PiFolderOpen
									className="object-contain w-4 h-4"
									color="#FF6636"
								/>
							</div>
							<span>{sectionsCount} Sections</span>
						</div>

						{/* Lectures */}
						<div className="flex items-center gap-1">
							<div
								className="rounded-full flex items-center justify-center"
								aria-label="Lectures icon"
							>
								<PiPlayCircle
									className="object-contain w-4 h-4"
									color="#564FFD"
								/>
							</div>
							<span>{lecturesCount} Lectures</span>
						</div>
					</div>
				</div>
			</div>

			{/* Buttons */}
			<div className="flex gap-3">
				<button className="px-6 py-2 text-orange-500 bg-white border border-orange-500">
					Write a Review
				</button>
				<button
					className="px-6 py-2 text-white bg-orange-500"
					onClick={onNextLecture}
				>
					Next Lecture
				</button>
			</div>
		</div>
	);
}
