'use client';

import CourseRequestTable from '@/components/admins/check-courses/CourseRequestTable';

export default function CheckCoursesPage() {
	return (
		<div className="px-8 py-10 ml-10">
			<h1 className="text-2xl font-bold mb-6">Course Creation Requests</h1>
			<div className="bg-white shadow rounded-lg">
				<CourseRequestTable />
			</div>
		</div>
	);
}
