import { Metadata } from 'next';

import CourseComponent from '@/components/learners/course-list/Course';
import { Course as BaseCourse } from '@/schemas/course.schema';
import { getCourses } from '@/services/api/course';

export const metadata: Metadata = {
	title: 'BrainBox | Courses List',
};
interface Course extends BaseCourse {
	status: string;
	createdAt: string;
	updatedAt: string;
	rating?: string;
}

export default async function CourseListPage() {
	let initialCourses: Course[] = [];
	try {
		const allCourses = (await getCourses()) as unknown as Course[];
		initialCourses = allCourses.filter(
			(course) => course.status === 'approved' && course.public,
		);
	} catch (error) {
		console.error('Error fetching courses:', error);
		initialCourses = [];
	}

	return (
		<div>
			<CourseComponent initialCourses={initialCourses} />
		</div>
	);
}
