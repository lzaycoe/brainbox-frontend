import axios from 'axios';

import { Course, CourseData } from '@/schemas/course.schema';

export const createCourse = async (
	courseData: Record<string, unknown>,
	teacherId: number,
) => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/courses`,
			{ ...courseData, status: 'pending', teacherId: teacherId },
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

export const getCourse = async (id: number): Promise<Course> => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`,
		);
		return response.data;
	} catch (error) {
		console.error('Failed to fetch course:', error);
		throw new Error('Failed to fetch course');
	}
};

export const getTeacherCourses = async (
	teacherId: number,
): Promise<Course[]> => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/courses/teacher/${teacherId}`,
		);
		return response.data;
	} catch (error) {
		console.error('Failed to fetch teacher courses:', error);
		throw new Error('Failed to fetch teacher courses');
	}
};

export const getCourses = async (): Promise<Course[]> => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/courses`,
		);
		return response.data;
	} catch (error) {
		console.error('Failed to fetch courses:', error);
		throw error;
	}
};

export const updateCourse = async (
	courseId: string,
	courseData: CourseData,
	teacherId: number,
): Promise<Course> => {
	try {
		const response = await axios.put(
			`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`,
			{ ...courseData, teacherId },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Failed to update course:', error);
		throw new Error('Failed to update course');
	}
};
