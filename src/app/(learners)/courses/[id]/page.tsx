'use client';

import { Metadata } from 'next';
import { useParams } from 'next/navigation';

import CourseDetailsPage from '@/components/learners/courses/course/course-detail/CourseDetail';

export const metadata: Metadata = {
	title: 'BrainBox | Course Details',
};

export default function CoursePage() {
	const params = useParams<{ id: string }>();

	if (!params?.id) {
		return <p className="text-red-500">Invalid course ID</p>;
	}

	return <CourseDetailsPage courseId={params.id} />;
}
