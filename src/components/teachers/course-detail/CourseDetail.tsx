'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Loading from '@/components/commons/Loading';
import CourseMenu from '@/components/learners/watch-course/CourseMenu';
import CourseNavigation from '@/components/learners/watch-course/CourseNavigation';
import CourseVideo from '@/components/learners/watch-course/CourseVideo';
import { useUserContext } from '@/contexts/UserContext';
import { Course } from '@/schemas/course.schema';
import { fetchCourseData } from '@/services/custom/course/fetchCourseData';
import {
	createSectionsForMenuWithoutProgress,
	updateLectureActive,
} from '@/services/custom/course/watchCourseServices';
import { formatDate } from '@/utils/date';

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

export default function CourseDetail() {
	const { id } = useParams<{ id: string }>();
	const [course, setCourse] = useState<Course | null>(null);
	const [sectionsMenu, setSectionsMenu] = useState<Section[]>([]);

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
			try {
				const {
					course: courseData,
					sections: sectionsData,
					lectures: lecturesData,
				} = await fetchCourseData(id);
				if (!courseData) {
					throw new Error('Course not found');
				}

				const sectionsForMenu = createSectionsForMenuWithoutProgress(
					sectionsData,
					lecturesData,
				);

				setCourse(courseData);
				setSectionsMenu(sectionsForMenu);
			} catch (error) {
				console.error('Failed to load course page:', error);
				setError(error instanceof Error ? error.message : 'Unknown error');
				setCourse(null);
				setSectionsMenu([]);
			} finally {
				setLoading(false);
			}
		};

		loadCoursePage();
	}, [id, user, userLoading, router]);

	const updateSectionsMenu = (
		updateFn: (prevSections: Section[]) => Section[],
	) => {
		setSectionsMenu((prevSections) => updateFn(prevSections));
	};

	const toggleSection = (sectionId: number) => {
		updateSectionsMenu((prevSections) =>
			prevSections.map((section) => ({
				...section,
				isExpanded: section.id === sectionId ? !section.isExpanded : false,
			})),
		);
	};

	const toggleLectureActive = (sectionId: number, lectureId: number) => {
		updateSectionsMenu((prevSections) =>
			updateLectureActive(prevSections, sectionId, lectureId),
		);
	};

	if (loading || userLoading) {
		return <Loading />;
	}

	if (error) {
		return <div>{error}</div>;
	}

	if (!course || sectionsMenu.length === 0) {
		return (
			<div className="flex justify-center w-full mt-10">
				Course, sections not found
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
		<div className="flex flex-wrap lg:flex-nowrap mt-4 px-4 bg-white pt-8 lg:w-[1332px] mx-auto">
			<div className="w-full lg:w-8/12 mb-10">
				<CourseVideo
					videoURL={videoURL}
					title={lectureTitle}
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
					sections={sectionsMenu}
					onToggleSection={toggleSection}
					onToggleLectureActive={toggleLectureActive}
				/>
			</div>
		</div>
	);
}
