'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import CommentSection from '@/components/learners/watch-course/CommentSection';
import CourseMenu from '@/components/learners/watch-course/CourseMenu';
import CourseNavigation from '@/components/learners/watch-course/CourseNavigation';
import CourseVideo from '@/components/learners/watch-course/CourseVideo';
import Header from '@/components/learners/watch-course/Header';
import { useUserContext } from '@/contexts/UserContext';
import { Course } from '@/schemas/course.schema';
import { Progress } from '@/schemas/progress.schema';
import { getProgressInCourse } from '@/services/api/progress';
import { getUserClerk } from '@/services/api/user';
import { checkPaymentForCourse } from '@/services/custom/course/checkPayment';
import { fetchCourseData } from '@/services/custom/course/fetchCourseData';
import { formatDate } from '@/utils/date';

export default function WatchCourse() {
	const { id } = useParams<{ id: string }>();
	const [course, setCourse] = useState<Course | null>(null);
	const [sectionsMenu, setSectionsMenu] = useState<
		{
			id: number;
			title: string;
			lecturesCount: number;
			progress: number;
			isExpanded: boolean;
			lecturesDetails: {
				id: number;
				title: string;
				type: string;
				attachments?: string[];
				updateAt: string;
				isDone: boolean;
				isActive: boolean;
			}[];
		}[]
	>([]);
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
				setLoading(false);
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

				const sectionProgressMap: Record<number, number> = JSON.parse(
					typeof progressData.sectionProgress === 'string'
						? progressData.sectionProgress
						: '{}',
				);
				const sectionsForMenu = sectionsData.map((section, sectionIndex) => {
					const sectionLectures = lecturesData.filter(
						(lecture) => lecture.sectionId === section.id,
					);
					return {
						id: section.id,
						title: section.title,
						lecturesCount: sectionLectures.length,
						progress: sectionProgressMap[section.id] || 0,
						isExpanded: sectionIndex === 0,
						lecturesDetails: sectionLectures.map((lecture, lectureIndex) => ({
							id: lecture.id,
							title: lecture.title,
							type: lecture.type,
							attachments: lecture.attachments || [],
							updateAt: lecture.updatedAt,
							isDone: progressData.completedLectures.includes(lecture.id),
							isActive: sectionIndex === 0 && lectureIndex === 0,
						})),
					};
				});

				setProgress(progressData);
				setCourse(courseData);
				setTeacherAvatarUrl(teacherData.imageUrl);
				setTeacherName(fullName);
				setSectionsMenu(sectionsForMenu);

				console.log('Progress:', progressData);
				console.log('Course Data:', courseData);
				console.log('Sections:', sectionsData);
				console.log('Lectures:', lecturesData);
				console.log('Teacher Data:', teacherData);
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
			prevSections.map((section) => ({
				...section,
				lecturesDetails: section.lecturesDetails.map((lecture) => ({
					...lecture,
					isActive:
						section.id === sectionId && lecture.id === lectureId
							? !lecture.isActive
							: false,
				})),
			})),
		);
	};

	const handleCheckboxChange = (sectionId: number, lectureId: number) => {
		setSectionsMenu((prevSections) =>
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
			),
		);
		console.log(
			`Checkbox toggled for lecture ${lectureId} in section ${sectionId}`,
		);
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
			setSectionsMenu((prevSections) =>
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
				),
			);
		} else {
			let nextSectionIndex = sectionsMenu.findIndex(
				(section) => section.id === activeSectionId,
			);
			let nextLectureIndex = activeLectureIndex + 1;

			if (
				nextLectureIndex >=
				sectionsMenu[nextSectionIndex].lecturesDetails.length
			) {
				nextSectionIndex += 1;
				nextLectureIndex = 0;
			}

			if (nextSectionIndex < sectionsMenu.length) {
				setSectionsMenu((prevSections) =>
					prevSections.map((section, sIndex) => ({
						...section,
						isExpanded: sIndex === nextSectionIndex,
						lecturesDetails: section.lecturesDetails.map((lecture, lIndex) => ({
							...lecture,
							isActive:
								sIndex === nextSectionIndex && lIndex === nextLectureIndex,
						})),
					})),
				);
			}
		}
	};

	const handleGoBack = () => {
		router.back();
	};

	if (loading || userLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (!course || !progress || sectionsMenu.length === 0) {
		return <div>Course, progress, or sections not found</div>;
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

	console.log('Active Lecture:', activeLecture);
	console.log('Video URL:', videoURL);
	console.log('Last Updated:', lastUpdated);

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
					<CourseNavigation />
					<CommentSection />
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
