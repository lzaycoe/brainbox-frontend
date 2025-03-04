import { getTeacherCourses } from '@/services/api/course';
import { fetchPaidStudentsCount } from '@/services/api/payment';

export const getTotalStudentsForTeacher = async (
	teacherId: number,
): Promise<number> => {
	try {
		const courses = await getTeacherCourses(teacherId);
		const studentCounts = await Promise.all(
			courses.map((course) => fetchPaidStudentsCount(course.id)),
		);
		return studentCounts.reduce((total, count) => total + count, 0);
	} catch (error) {
		console.error('Failed to fetch total students for teacher:', error);
		return 0;
	}
};
