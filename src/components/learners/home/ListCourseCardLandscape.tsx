'use client';

import { Button } from '../../ui/button';
import React, { useEffect, useState } from 'react';
import { PiArrowRight } from 'react-icons/pi';

import { Course } from '@/schemas/course.schema';
import { getCourses } from '@/services/api/course';

import CourseCardLandscape from './CourseCardLandscape';

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
	rating: string;
	students: string;
	duration: string;
}

const ListCourseCardLandscape: React.FC = () => {
	const [courses, setCourses] = useState<CourseCardLandscapeProps[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const fetchedCourses: Course[] = await getCourses();

				const formattedCourses: CourseCardLandscapeProps[] = fetchedCourses.map(
					(course, index) => ({
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
						categoryBgColor: 'bg-gray-100',
						categoryTextColor: 'text-gray-800',
						price: `$${course.salePrice || course.originPrice}`,
						discountedPrice: `$${course.originPrice || course.salePrice}`,
						teacherAvatar: '/app/default-teacher.png',
						teacherName: 'Unknown Instructor',
						rating: '4.5',
						students: '0',
						duration: 'Unknown',
					}),
				);

				setCourses(formattedCourses.slice(0, 4));
			} catch (err) {
				setError('Failed to fetch courses');
			} finally {
				setLoading(false);
			}
		};

		fetchCourses();
	}, []);

	return (
		<section className="flex flex-col items-center py-10">
			<h2 className="text-3xl font-semibold text-center mb-8">
				Our Feature Courses
			</h2>

			{loading && <p>Loading courses...</p>}
			{error && <p className="text-red-500">{error}</p>}

			{!loading && !error && (
				<div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
					{courses.map((course) => (
						<CourseCardLandscape key={course.id} {...course} />
					))}
				</div>
			)}

			<Button className="flex gap-3 justify-center items-center px-6 text-base font-semibold tracking-normal leading-none text-orange-500 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 mt-8 capitalize">
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
