import axios from 'axios';

import { Progress } from '@/schemas/progress.schema';

export const getProgressInCourse = async (
	courseId: string,
	userId: number,
): Promise<Progress> => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/user/${userId}/progress`,
		);
		return response.data;
	} catch (error) {
		console.error('Failed to fetch progress:', error);
		throw new Error('Failed to fetch progress');
	}
};

export const updateProgress = async (
	courseId: string,
	lectureId: string,
	userId: number,
): Promise<Progress> => {
	try {
		const response = await axios.put(
			`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/lecture/${lectureId}/user/${userId}/progress`,
		);
		return response.data;
	} catch (error) {
		console.error('Failed to update progress:', error);
		throw new Error('Failed to update progress');
	}
};
