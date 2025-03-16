'use client';

import React, { useEffect, useState } from 'react';

import CourseComponent from '@/components/learners/course-list/Course';
import { type Course as BaseCourse } from '@/schemas/course.schema';
import { getCourses } from '@/services/api/course';
import { fetchPaidStudentsCount } from '@/services/api/payment';

// Tạo interface Course phù hợp với CourseComponent
interface Course extends BaseCourse {
	id: number;
	status: string;
	teacherId: number;
	createdAt: string;
	updatedAt: string;
	rating?: string;
}

const ListCourseByCategory: React.FC = () => {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const data = await getCourses();

				const approvedCourses = data.filter(
					(course) => course.status === 'approved',
				);

				const formattedData: Course[] = await Promise.all(
					approvedCourses.map(async (course, index) => {
						const students = await fetchPaidStudentsCount(course.id);
						return {
							...course,
							id: course.id || index + 1,
							students,
							createdAt: course.createdAt || new Date().toISOString(),
							updatedAt: course.updatedAt || new Date().toISOString(),
							rating: '0.0',
						};
					}),
				);

				setCourses(formattedData);
			} catch {
				setError('Failed to fetch courses');
			} finally {
				setLoading(false);
			}
		};

		fetchCourses();
	}, []);

	if (error) return <p className="text-red-500">{error}</p>;

	return (
		<section className="flex flex-col items-center py-10">
			<div className="w-full max-w-7xl px-4">
				<CourseComponent initialCourses={loading ? null : courses} />
			</div>
		</section>
	);
};

export default ListCourseByCategory;
