'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { PiArrowRight } from 'react-icons/pi';

import Loading from '@/components/commons/Loading';
import CourseCardLandscape from '@/components/learners/home/CourseCardLandscape';
import { Button } from '@/components/ui/button';
import { getCategoryColors } from '@/config/categoryColors';
import { Course } from '@/schemas/course.schema';
import { getCourses } from '@/services/api/course';
import { fetchPaidStudentsCount } from '@/services/api/payment';
import { getUserClerk } from '@/services/api/user';
import { formatCurrency } from '@/utils/currency';

interface CourseCardLandscapeProps {
	id: number;
	title: string;
	subtitle: string;
	tag: string;
	description: string;
	thumbnail: string;
	originPrice: number;
	salePrice: number;
	public: boolean;
	imageUrl: string;
	category: string;
	categoryBgColor: string;
	categoryTextColor: string;
	price: string;
	discountedPrice: string;
	teacherAvatar: string;
	teacherName: string;
	rating: number | string;
	students: number | string;
	duration: string;
}

const ListCourseCardLandscape: React.FC = () => {
	const router = useRouter();
	const [courses, setCourses] = useState<CourseCardLandscapeProps[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const fetchedCourses: Course[] = await getCourses();

				const approvedCourses = fetchedCourses.filter(
					(course) => course.status === 'approved',
				);

				const formattedCourses: CourseCardLandscapeProps[] = await Promise.all(
					approvedCourses.map(async (course) => {
						let teacherAvatar = '/app/default-teacher.png';
						let teacherName = 'Unknown Instructor';

						if (course.teacherId) {
							try {
								const teacher = await getUserClerk(course.teacherId);
								teacherAvatar = teacher.imageUrl || teacherAvatar;
								teacherName =
									`${teacher.firstName || ''} ${teacher.lastName || ''}`.trim() ||
									teacherName;
							} catch (error) {
								console.error(
									`Failed to fetch teacher data for course ${course.id}:`,
									error,
								);
							}
						}

						const { bgColor, textColor } = getCategoryColors(
							course.tag || 'Uncategorized',
						);

						const students = await fetchPaidStudentsCount(course.id);

						return {
							id: course.id,
							title: course.title,
							subtitle: course.subtitle || 'No subtitle available',
							tag: course.tag || 'General',
							description: course.description || 'No description available',
							thumbnail: course.thumbnail || '/app/default-thumbnail.png',
							originPrice: course.originPrice,
							salePrice: course.salePrice,
							public: course.public,
							imageUrl: course.thumbnail || '/app/default-thumbnail.png',
							category: course.tag || 'Uncategorized',
							categoryBgColor: bgColor,
							categoryTextColor: textColor,
							price: `${formatCurrency(course.salePrice) || formatCurrency(course.originPrice)}`,
							discountedPrice: `${formatCurrency(course.originPrice) || formatCurrency(course.salePrice)}`,
							teacherAvatar,
							teacherName,
							rating: '0.0',
							students: students,
							duration: 'Life-time',
						};
					}),
				);

				setCourses(formattedCourses.slice(0, 4));
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

	const handleBrowseAll = () => {
		router.push('/course-list');
	};

	const handleKeyDown = (
		event: React.KeyboardEvent<HTMLButtonElement>,
		id: number,
	) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleCourseClick(id);
		}
	};

	return (
		<section className="flex flex-col items-center py-10">
			<h2 className="text-3xl font-semibold text-center mb-8">
				Our Feature Courses
			</h2>

			{loading && <Loading />}
			{error && <p className="text-red-500">{error}</p>}

			{!loading && !error && (
				<div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
					{courses.map((course) => (
						<button
							key={course.id}
							onClick={() => handleCourseClick(course.id)}
							onKeyDown={(e) => handleKeyDown(e, course.id)}
							className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
						>
							<CourseCardLandscape {...course} />
						</button>
					))}
				</div>
			)}

			<Button
				onClick={handleBrowseAll}
				className="flex gap-3 justify-center items-center px-6 text-base font-semibold tracking-normal leading-none text-orange-500 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 mt-8 capitalize"
			>
				<div className="self-stretch my-auto">Browse all Courses</div>
				<PiArrowRight
					className="flex shrink-0 self-stretch my-auto w-6 h-6"
					aria-hidden="true"
				/>
			</Button>
		</section>
	);
};

export default ListCourseCardLandscape;
