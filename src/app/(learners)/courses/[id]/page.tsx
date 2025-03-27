'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Loading from '@/components/commons/Loading';
import CourseDetailsPage from '@/components/learners/courses/course/course-detail/CourseDetail';
import { isCourseViewableByLearners } from '@/services/api/course';

export default function CoursePage() {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function checkCourseAccess() {
			if (!params?.id) {
				router.push('/not-found');
				return;
			}

			const isViewable = await isCourseViewableByLearners(params.id);
			if (!isViewable) {
				router.push('/not-found');
				return;
			}

			setIsLoading(false);
		}

		checkCourseAccess();
	}, [params?.id, router]);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loading />
			</div>
		);
	}

	return <CourseDetailsPage courseId={params.id} />;
}
