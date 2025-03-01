import axios from 'axios';

import { Lecture, LectureData, lectureSchema } from '@/schemas/lecture.schema';

export const createLecture = async (
	courseId: string,
	sectionId: string,
	data: LectureData,
): Promise<Lecture | null> => {
	try {
		lectureSchema.parse(data);

		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/sections/${sectionId}/lectures`,
			data,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		return response.data;
	} catch (error) {
		console.error('Failed to create lecture:', error);
		return null;
	}
};

export const getAllLecturesInsection = async (
	courseId: string,
	sectionId: string,
): Promise<Lecture[] | null> => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/sections/${sectionId}/lectures`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		return response.data;
	} catch (error) {
		console.error('Failed to fetch lectures:', error);
		return null;
	}
};

export const deleteLecture = async (
	courseId: string,
	sectionId: string,
	lectureId: string,
): Promise<boolean> => {
	try {
		await axios.delete(
			`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/sections/${sectionId}/lectures/${lectureId}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		return true;
	} catch (error) {
		console.error('Failed to delete lecture:', error);
		return false;
	}
};

export const getTopTeachers = async (): Promise<Lecture[] | null> => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/users/teachers/top/5`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		return response.data;
	} catch (error) {
		console.error('Failed to fetch top teachers:', error);
		return null;
	}
};
