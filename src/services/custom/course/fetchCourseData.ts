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

export const fetchCourseData = async (
	courseId: string,
): Promise<CourseDataResponse> => {
	try {
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
