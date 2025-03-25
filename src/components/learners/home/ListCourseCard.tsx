'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import CourseCard from '@/components/commons/CourseCard';
import Loading from '@/components/commons/Loading';
import { getCategoryColors } from '@/config/categoryColors';
import { Course } from '@/schemas/course.schema';
import { getCourses } from '@/services/api/course';
import { fetchPaidStudentsCount } from '@/services/api/payment';

const ListCourseCard: React.FC = () => {
	const router = useRouter();
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const data = await getCourses();

				const approvedCourses = data.filter(
					(course) => course.status === 'approved' && course.public,
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

				const sortedCourses = [...formattedData].sort(
					(a, b) => (b.students ?? 0) - (a.students ?? 0),
				);
				setCourses(sortedCourses.slice(0, 10));
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

	let content;

	if (loading) {
		content = <Loading />;
	} else if (error) {
		content = (
			<div className="flex justify-center">
				<p className="text-red-500">{error}</p>
			</div>
		);
	} else {
		content = (
			<div className="grid grid-cols-5 gap-6 max-md:grid-cols-1">
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
		);
	}

	return (
		<section className="flex flex-col items-center bg-[#F5F7FA] py-10">
			<h2 className="text-3xl font-semibold text-center mb-8">
				Best Selling Courses
			</h2>
			{content}
		</section>
	);
};

export default ListCourseCard;
