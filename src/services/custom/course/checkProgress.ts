import { toast } from '@/hooks/use-toast';
import { Payment } from '@/schemas/payment.schema';
import { getCourse } from '@/services/api/course';
import { getProgressInCourse } from '@/services/api/progress';
import { getPaidPaymentsForUser } from '@/services/custom/course/checkPayment';

export interface CourseProgressCardData {
	id: number;
	title: string;
	thumbnail: string;
	completed: string;
}

export const fetchPaidCoursesProgress = async (
	userId: number,
): Promise<CourseProgressCardData[] | null> => {
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
			const progress = await getProgressInCourse(
				payment.courseId.toString(),
				userId,
			);
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
			(item): item is CourseProgressCardData => item !== null,
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
