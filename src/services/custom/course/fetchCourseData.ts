import axios from 'axios';

import { Course } from '@/schemas/course.schema';
import { Lecture } from '@/schemas/lecture.schema';
import { Section } from '@/schemas/section.schema';
import { getCourse } from '@/services/api/course';
import { getAllLecturesInCourse } from '@/services/api/lecture';
import { getAllSections } from '@/services/api/section';

interface CourseDataResponse {
	course: Course;
	sections: Section[];
	lectures: Lecture[];
}

/**
 * Fetches course data including sections and lectures
 * @param courseId - The ID of the course to fetch
 * @param token - Optional authentication token for admin access
 */
export const fetchCourseData = async (
	courseId: string,
	token?: string | null,
): Promise<CourseDataResponse> => {
	try {
		const config = token
			? {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			: undefined;

		if (token) {
			const apiUrl = process.env.NEXT_PUBLIC_API_URL;
			const [courseResponse, sectionsResponse, lecturesResponse] =
				await Promise.all([
					axios.get(`${apiUrl}/courses/${courseId}`, config),
					axios.get(`${apiUrl}/courses/${courseId}/sections`, config),
					axios.get(`${apiUrl}/courses/${courseId}/lectures`, config),
				]);

			return {
				course: courseResponse.data,
				sections: sectionsResponse.data,
				lectures: lecturesResponse.data,
			};
		}

		const [courseData, sectionsData, lecturesData] = await Promise.all([
			getCourse(Number(courseId)),
			getAllSections(courseId),
			getAllLecturesInCourse(courseId),
		]);

		return {
			course: courseData,
			sections: sectionsData,
			lectures: lecturesData,
		};
	} catch (error) {
		console.error('Failed to fetch course data:', error);
		throw error;
	}
};
