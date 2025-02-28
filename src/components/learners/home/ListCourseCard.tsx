'use client';

import React, { useEffect, useState } from 'react';

import CourseCard from '@/components/commons/CourseCard';
import { Course } from '@/schemas/course.schema';
import { getCourses } from '@/services/api/course';

const ListCourseCard: React.FC = () => {
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const data = await getCourses();

				const formattedData: Course[] = data.map((course, index) => ({
					...course,
					id: course.id || index + 1,
				}));

				const sortedCourses = [...formattedData].sort(
					(a, b) => b.salePrice - a.salePrice,
				);
				setCourses(sortedCourses.slice(0, 10));
			} catch (err) {
				setError('Failed to fetch courses');
			} finally {
				setLoading(false);
			}
		};

		fetchCourses();
	}, []);

	if (loading) return <p>Loading...</p>;
	if (error) return <p className="text-red-500">{error}</p>;

	return (
		<section className="flex flex-col items-center bg-[#F5F7FA] py-10">
			<h2 className="text-3xl font-semibold text-center mb-8">
				Best Selling Courses
			</h2>
			<div className="grid grid-cols-5 gap-6 max-md:grid-cols-1">
				{courses.map((course) => (
					<CourseCard
						key={course.id}
						imageUrl={course.thumbnail}
						category={course.tag}
						categoryBgColor="bg-blue-100"
						categoryTextColor="text-blue-800"
						price={`$${course.salePrice}`}
						title={course.title}
						rating="4.8"
						students="150K"
					/>
				))}
			</div>
		</section>
	);
};

export default ListCourseCard;
