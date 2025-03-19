import { Lecture } from '@/schemas/lecture.schema';
import { Progress } from '@/schemas/progress.schema';
import { Section as RawSection } from '@/schemas/section.schema';

interface LectureDetail {
	id: number;
	title: string;
	type: string;
	attachments?: string[];
	description?: string;
	content?: string;
	note?: string;
	updateAt: string;
	isDone: boolean;
	isActive: boolean;
}

interface Section {
	id: number;
	title: string;
	lecturesCount: number;
	progress: number;
	isExpanded: boolean;
	lecturesDetails: LectureDetail[];
}

export const mapLecturesDetails = (
	lectures: Lecture[],
	progressData: Progress,
	sectionIndex: number,
): LectureDetail[] =>
	lectures.map((lecture, lectureIndex) => ({
		id: lecture.id,
		title: lecture.title,
		type: lecture.type,
		attachments: lecture.attachments || [],
		description: lecture.description,
		content: lecture.content,
		note: lecture.note,
		updateAt: lecture.updatedAt,
		isDone: progressData.completedLectures.includes(lecture.id),
		isActive: sectionIndex === 0 && lectureIndex === 0,
	}));

export const mapLecturesDetailsWithoutProgress = (
	lectures: Lecture[],
	// progressData: Progress,
	sectionIndex: number,
): LectureDetail[] =>
	lectures.map((lecture, lectureIndex) => ({
		id: lecture.id,
		title: lecture.title,
		type: lecture.type,
		attachments: lecture.attachments || [],
		description: lecture.description,
		content: lecture.content,
		note: lecture.note,
		updateAt: lecture.updatedAt,
		isDone: false,
		isActive: sectionIndex === 0 && lectureIndex === 0,
	}));

export const createSectionsForMenuWithoutProgress = (
	sectionsData: RawSection[],
	lecturesData: Lecture[],
	// progressData: Progress,
): Section[] => {
	// const sectionProgressMap: Record<number, number> = JSON.parse(
	// 	typeof progressData.sectionProgress === 'string'
	// 		? progressData.sectionProgress
	// 		: '{}',
	// );

	return sectionsData.map((section, sectionIndex) => {
		const sectionLectures = lecturesData.filter(
			(lecture) => lecture.sectionId === section.id,
		);
		return {
			id: section.id,
			title: section.title,
			lecturesCount: sectionLectures.length,
			progress: 0,
			isExpanded: sectionIndex === 0,
			lecturesDetails: mapLecturesDetailsWithoutProgress(
				sectionLectures,
				// progressData,
				sectionIndex,
			),
		};
	});
};

export const updateLectureActive = (
	prevSections: Section[],
	sectionId: number,
	lectureId: number,
): Section[] =>
	prevSections.map((section) => ({
		...section,
		lecturesDetails: section.lecturesDetails.map((lecture) => ({
			...lecture,
			isActive:
				section.id === sectionId && lecture.id === lectureId
					? !lecture.isActive
					: false,
		})),
	}));

export const updateLectureDone = (
	prevSections: Section[],
	sectionId: number,
	lectureId: number,
): Section[] =>
	prevSections.map((section) =>
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

export const updateNextLecture = (
	prevSections: Section[],
	activeSectionId: number,
	activeLectureIndex: number,
): Section[] => {
	let nextSectionIndex = prevSections.findIndex(
		(section) => section.id === activeSectionId,
	);
	let nextLectureIndex = activeLectureIndex + 1;

	if (
		nextLectureIndex >= prevSections[nextSectionIndex].lecturesDetails.length
	) {
		nextSectionIndex += 1;
		nextLectureIndex = 0;

		while (
			nextSectionIndex < prevSections.length &&
			prevSections[nextSectionIndex].lecturesDetails.length === 0
		) {
			nextSectionIndex += 1;
		}

		if (nextSectionIndex >= prevSections.length) {
			nextSectionIndex = 0;
			while (
				nextSectionIndex < prevSections.length &&
				prevSections[nextSectionIndex].lecturesDetails.length === 0
			) {
				nextSectionIndex += 1;
			}
			if (nextSectionIndex >= prevSections.length) {
				return prevSections;
			}
		}
	}

	return prevSections.map((section, sIndex) => ({
		...section,
		isExpanded: sIndex === nextSectionIndex,
		lecturesDetails: section.lecturesDetails.map((lecture, lIndex) => ({
			...lecture,
			isActive: sIndex === nextSectionIndex && lIndex === nextLectureIndex,
		})),
	}));
};

export const createSectionsForMenu = (
	sectionsData: RawSection[],
	lecturesData: Lecture[],
	progressData: Progress,
): Section[] => {
	const sectionProgressMap: Record<number, number> = JSON.parse(
		typeof progressData.sectionProgress === 'string'
			? progressData.sectionProgress
			: '{}',
	);

	return sectionsData.map((section, sectionIndex) => {
		const sectionLectures = lecturesData.filter(
			(lecture) => lecture.sectionId === section.id,
		);
		return {
			id: section.id,
			title: section.title,
			lecturesCount: sectionLectures.length,
			progress: sectionProgressMap[section.id] || 0,
			isExpanded: sectionIndex === 0,
			lecturesDetails: mapLecturesDetails(
				sectionLectures,
				progressData,
				sectionIndex,
			),
		};
	});
};

// export const createSectionsForMenuWithoutProgress = (
// 	sectionsData: RawSection[],
// 	lecturesData: Lecture[],
// ): Section[] => {
// 	return sectionsData.map((section, sectionIndex) => {
// 		const sectionLectures = lecturesData.filter(
// 			(lecture) => lecture.sectionId === section.id,
// 		);
// 		return {
// 			id: section.id,
// 			title: section.title,
// 			lecturesCount: sectionLectures.length,
// 			progress: 0, // Không tính toán progress
// 			isExpanded: sectionIndex === 0,
// 			lecturesDetails: sectionLectures.map((lecture) => ({
// 				id: lecture.id,
// 				title: lecture.title,
// 				type: lecture.type,
// 				updateAt: lecture.updatedAt,
// 				isDone: false, // Mặc định là chưa hoàn thành
// 				isActive: false, // Mặc định là không active
// 			})),
// 		};
// 	});
// };

export const resetToFirstLecture = (prevSections: Section[]): Section[] =>
	prevSections.map((section, index) =>
		index === 0
			? {
					...section,
					isExpanded: true,
					lecturesDetails: section.lecturesDetails.map((lecture, i) => ({
						...lecture,
						isActive: i === 0,
					})),
				}
			: section,
	);
