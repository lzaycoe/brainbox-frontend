'use client';

import { Metadata } from 'next';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Loading from '@/components/commons/Loading';
import CourseMenu from '@/components/learners/watch-course/CourseMenu';
import CourseNavigation from '@/components/learners/watch-course/CourseNavigation';
import CourseVideo from '@/components/learners/watch-course/CourseVideo';
import Header from '@/components/learners/watch-course/Header';
import { useUserContext } from '@/contexts/UserContext';
import { Course } from '@/schemas/course.schema';
import { Progress } from '@/schemas/progress.schema';
import { getProgressInCourse, updateProgress } from '@/services/api/progress';
import { getUserClerk } from '@/services/api/user';
import { checkPaymentForCourse } from '@/services/custom/course/checkPayment';
import { fetchCourseData } from '@/services/custom/course/fetchCourseData';
import {
	createSectionsForMenu,
	resetToFirstLecture,
	updateLectureActive,
	updateLectureDone,
	updateNextLecture,
} from '@/services/custom/course/watchCourseServices';
import { formatDate } from '@/utils/date';

export const metadata: Metadata = {
	title: 'BrainBox | Watch Course',
};

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

export default function WatchCourse() {
	const { id } = useParams<{ id: string }>();
	const [course, setCourse] = useState<Course | null>(null);
	const [sectionsMenu, setSectionsMenu] = useState<Section[]>([]);
	const [progress, setProgress] = useState<Progress | null>(null);
	const [teacherAvatarUrl, setTeacherAvatarUrl] = useState<string | undefined>(
		undefined,
	);
	const [teacherName, setTeacherName] = useState<string | undefined>(undefined);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { user, loading: userLoading } = useUserContext();
	const router = useRouter();

	useEffect(() => {
		if (!id || !user || userLoading) {
			setLoading(false);
			return;
		}

		const loadCoursePage = async () => {
			const courseId = Number(id);

			const hasPaid = await checkPaymentForCourse(
				courseId,
				user.id,
				router.push,
			);
			if (!hasPaid) {
				return;
			}

			try {
				const progressData = await getProgressInCourse(id, user.id);
				if (!progressData) {
					throw new Error('Progress not found');
				}

				const {
					course: courseData,
					sections: sectionsData,
					lectures: lecturesData,
				} = await fetchCourseData(id);
				if (!courseData) {
					throw new Error('Course not found');
				}

				const teacherData = await getUserClerk(courseData.teacherId);
				const fullName = [teacherData.firstName, teacherData.lastName]
					.filter((name) => name != null)
					.join(' ')
					.trim();

				const sectionsForMenu = createSectionsForMenu(
					sectionsData,
					lecturesData,
					progressData,
				);

				setProgress(progressData);
				setCourse(courseData);
				setTeacherAvatarUrl(teacherData.imageUrl);
				setTeacherName(fullName);
				setSectionsMenu(sectionsForMenu);
			} catch (error) {
				console.error('Failed to load course page:', error);
				setError(error instanceof Error ? error.message : 'Unknown error');
				setCourse(null);
				setProgress(null);
				setSectionsMenu([]);
			} finally {
				setLoading(false);
			}
		};

		loadCoursePage();
	}, [id, user, userLoading, router]);

	const toggleSection = (sectionId: number) => {
		setSectionsMenu((prevSections) =>
			prevSections.map((section) => ({
				...section,
				isExpanded: section.id === sectionId ? !section.isExpanded : false,
			})),
		);
	};

	const toggleLectureActive = (sectionId: number, lectureId: number) => {
		setSectionsMenu((prevSections) =>
			updateLectureActive(prevSections, sectionId, lectureId),
		);
	};

	const handleCheckboxChange = async (sectionId: number, lectureId: number) => {
		setSectionsMenu((prevSections) =>
			updateLectureDone(prevSections, sectionId, lectureId),
		);

		try {
			const updatedProgress = await updateProgress(
				id as string,
				lectureId.toString(),
				user!.id,
			);
			setProgress(updatedProgress);

			const sectionProgressMap: Record<number, number> = JSON.parse(
				typeof updatedProgress.sectionProgress === 'string'
					? updatedProgress.sectionProgress
					: '{}',
			);
			setSectionsMenu((prevSections) =>
				prevSections.map((section) =>
					section.id === sectionId
						? {
								...section,
								progress: sectionProgressMap[sectionId] || section.progress,
							}
						: section,
				),
			);
		} catch (error) {
			console.error(
				'Failed to update progress in handleCheckboxChange:',
				error,
			);
		}
	};

	const handleNextLecture = () => {
		let activeLectureIndex = -1;
		let activeSectionId = -1;

		sectionsMenu.forEach((section) => {
			const index = section.lecturesDetails.findIndex(
				(lecture) => lecture.isActive,
			);
			if (index !== -1) {
				activeLectureIndex = index;
				activeSectionId = section.id;
			}
		});

		if (activeLectureIndex === -1) {
			setSectionsMenu((prevSections) => resetToFirstLecture(prevSections));
		} else {
			setSectionsMenu((prevSections) =>
				updateNextLecture(prevSections, activeSectionId, activeLectureIndex),
			);
		}
	};

	const handleGoBack = () => {
		router.back();
	};

	if (loading || userLoading) {
		return <Loading />;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (!course || !progress || sectionsMenu.length === 0) {
		return (
			<div className="flex justify-center w-full mt-10">
				Course, progress, or sections not found
			</div>
		);
	}

	const activeLecture = sectionsMenu
		.flatMap((section) => section.lecturesDetails)
		.find((lecture) => lecture.isActive);

	const videoURL =
		activeLecture?.type === 'video' &&
		activeLecture.attachments &&
		activeLecture.attachments.length > 0
			? activeLecture.attachments[0]
			: undefined;
	const lectureTitle = activeLecture?.title;
	const lastUpdated = activeLecture?.updateAt
		? formatDate(activeLecture.updateAt)
		: undefined;

	return (
		<div>
			<Header
				courseTitle={course.title}
				sectionsCount={sectionsMenu.length}
				lecturesCount={sectionsMenu.reduce(
					(acc, section) => acc + section.lecturesCount,
					0,
				)}
				onNextLecture={handleNextLecture}
				onGoBack={handleGoBack}
			/>
			<div className="flex flex-wrap lg:flex-nowrap mt-8 px-10">
				<div className="w-full lg:w-8/12 mb-10">
					<CourseVideo
						videoURL={videoURL}
						title={lectureTitle}
						teacherAvatarUrl={teacherAvatarUrl}
						teacherName={teacherName}
						lastUpdated={lastUpdated}
						comments={0}
					/>
					<CourseNavigation
						description={activeLecture?.description}
						content={activeLecture?.content}
						note={activeLecture?.note}
						attachments={activeLecture?.attachments}
					/>
				</div>
				<div className="w-full lg:w-4/12 px-4">
					<CourseMenu
						progress={progress.courseProgress}
						sections={sectionsMenu}
						onToggleSection={toggleSection}
						onToggleLectureActive={toggleLectureActive}
						onCheckboxChange={handleCheckboxChange}
					/>
				</div>
			</div>
		</div>
	);
}
