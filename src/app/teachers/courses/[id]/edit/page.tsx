'use client';

import { Metadata } from 'next';
import { useParams } from 'next/navigation';

import CourseForm from '@/components/commons/teachers/CourseForm';

export const metadata: Metadata = {
	title: 'BrainBox | Teacher | Edit Course',
};

const EditCourse = () => {
	const { id } = useParams<{ id: string }>();

	return <CourseForm courseId={id} isEdit={true} />;
};

export default EditCourse;
