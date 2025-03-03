'use client';

import { useParams } from 'next/navigation';

import CourseForm from '@/components/commons/teachers/CourseForm';

const EditCourse = () => {
	const { id } = useParams<{ id: string }>();

	return <CourseForm courseId={id} isEdit={true} />;
};

export default EditCourse;
