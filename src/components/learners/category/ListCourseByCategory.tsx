'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import CourseCard from '@/components/commons/CourseCard';
import Loading from '@/components/commons/Loading';
import { getCategoryColors } from '@/config/categoryColors';
import { Course } from '@/schemas/course.schema';
import { getCourses } from '@/services/api/course';
import { fetchPaidStudentsCount } from '@/services/api/payment';

const ListCourseByCategory: React.FC = () => {
	const router = useRouter();
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

	const handleCourseClick = (id: number) => {
		router.push(`/courses/${id}`);
	};

	if (error) return <p className="text-red-500">{error}</p>;

	return (
		<section className="flex flex-col items-center py-10">
			<div className="w-full max-w-7xl px-4">
				{loading ? (
					<Loading />
				) : (
					<div className="grid grid-cols-4 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
						{courses.map((course) => {
							const { bgColor, textColor } = getCategoryColors(course.tag);
							return (
								<CourseCard
									key={course.id}
									imageUrl={course.thumbnail}
									category={course.tag}
									categoryBgColor={bgColor}
									categoryTextColor={textColor}
									price={`${course.salePrice}`}
									title={course.title}
									rating={0.0}
									students={course.students ?? 0}
									onClick={() => handleCourseClick(course.id)}
								/>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
};

export default ListCourseByCategory;
