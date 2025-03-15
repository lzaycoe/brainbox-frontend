'use client';

import { Metadata } from 'next';

import CourseForm from '@/components/commons/teachers/CourseForm';

export const metadata: Metadata = {
	title: 'BrainBox | Teacher | Create Course',
};

const CreateCourse = () => {
	return <CourseForm />;
};

export default CreateCourse;
