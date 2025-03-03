import axios from 'axios';

import { toast } from '@/hooks/use-toast';
import { Course } from '@/schemas/course.schema';
import { Payment } from '@/schemas/payment.schema';
import { getPaidPaymentsForUser } from '@/services/custom/course/checkPayment';

export interface CourseProgress {
	id: number;
	userId: number;
	courseId: number;
	completedLectures: number[];
	sectionProgress: string;
	courseProgress: number;
	createdAt: string;
	updatedAt: string;
}

export interface CourseData {
	id: number;
	title: string;
	thumbnail: string;
	completed: string;
}

const getCourseProgress = async (
	courseId: number,
	userId: number,
): Promise<CourseProgress | null> => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/user/${userId}/progress`,
		);
		return response.data;
	} catch (error) {
		console.error(`Failed to fetch progress for course ${courseId}:`, error);
		return null;
	}
};

const getCourse = async (id: number): Promise<Course | null> => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`,
		);
		return response.data;
	} catch (error) {
		console.error(`Failed to fetch course ${id}:`, error);
		return null;
	}
};

export const fetchPaidCoursesProgress = async (
	userId: number,
): Promise<CourseData[] | null> => {
	try {
		const paidPayments = await getPaidPaymentsForUser(userId);
		if (!paidPayments || paidPayments.length === 0) {
			toast({
				title: 'Info',
				description: 'No paid courses found.',
				variant: 'default',
			});
			return [];
		}

		const courseDataPromises = paidPayments.map(async (payment: Payment) => {
			const progress = await getCourseProgress(payment.courseId, userId);
			const course = await getCourse(payment.courseId);
			if (progress && course) {
				return {
					id: course.id,
					title: course.title,
					thumbnail: course.thumbnail,
					completed: `${progress.courseProgress.toFixed(1)}%`,
				};
			}
			return null;
		});

		const courseData = (await Promise.all(courseDataPromises)).filter(
			(item): item is CourseData => item !== null,
		);
		return courseData;
	} catch (error) {
		console.error('Failed to fetch course progress:', error);
		toast({
			title: 'Error',
			description: 'Failed to load course progress.',
			variant: 'destructive',
		});
		return null;
	}
};
