import { Metadata } from 'next';

import CourseComponent from '@/components/learners/course-list/Course';

export const metadata: Metadata = {
	title: 'BrainBox | Courses List',
};

export default async function CourseListPage() {
	return (
		<div>
			<CourseComponent />
		</div>
	);
}
