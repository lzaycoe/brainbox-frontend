import CourseComponent from '@/components/learners/course-list/Course';
import { Course as BaseCourse } from '@/schemas/course.schema';
import { getCourses } from '@/services/api/course';

// Extend Course to match the expected type
interface Course extends BaseCourse {
	status: string;
	createdAt: string;
	updatedAt: string;
	rating?: string;
}

export default async function CourseListPage() {
	let initialCourses: Course[] = [];
	try {
		initialCourses = (await getCourses()) as unknown as Course[];
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
