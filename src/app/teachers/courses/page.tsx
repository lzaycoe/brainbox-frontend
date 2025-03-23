import { Metadata } from 'next';

import TeacherCourseList from '@/components/teachers/courses/TeacherCourseList';

export const metadata: Metadata = {
	title: 'BrainBox | Teacher | Courses',
};
export default function TeacherCourses() {
	return (
		<div className="flex flex-wrap justify-center py-6">
			<TeacherCourseList />
		</div>
	);
}
