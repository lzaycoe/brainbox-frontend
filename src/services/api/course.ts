import axios from 'axios';

import { CourseData } from '@/schemas/course.schema';

export const createCourse = async (courseData: Record<string, unknown>) => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/courses`,
			{ ...courseData, status: 'pending', teacherId: 5 },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Failed to create course:', error);
		throw new Error('Failed to create course');
	}
};

export const getCourse = async (id: string): Promise<CourseData> => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`,
		);
		return response.data;
	} catch (error) {
		console.error('Failed to fetch course:', error);
		throw error;
	}
};
