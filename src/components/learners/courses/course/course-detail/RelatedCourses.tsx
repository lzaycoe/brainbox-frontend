'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

import CourseCard from '@/components/commons/CourseCard';
import { Course } from '@/schemas/course.schema';
import { getCourse, getCourses } from '@/services/api/course';

interface RelatedCoursesProps {
	readonly courseId: string;
}

export default function RelatedCourses({ courseId }: RelatedCoursesProps) {
	const router = useRouter();
	const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchRelatedCourses = async () => {
			try {
				setLoading(true);
				// Fetch the current course to get its tag
				const currentCourse = await getCourse(courseId);
				const currentTag = currentCourse.tag;

				// Fetch all courses and filter by tag
				const allCourses = await getCourses();
				const filteredCourses = allCourses
					.filter(
						(course) =>
							course.tag === currentTag && course.id !== parseInt(courseId),
					) // Exclude current course
					.slice(0, 5); // Limit to 5 related courses
				setRelatedCourses(filteredCourses);
			} catch (err) {
				console.error('Failed to fetch related courses:', err);
				setError('Failed to load related courses.');
			} finally {
				setLoading(false);
			}
		};

		fetchRelatedCourses();
	}, [courseId]);

	const handleViewAll = () => {
		router.push('/course-list');
	};

	const handleCourseClick = (id: number) => {
		router.push(`/courses/${id}`);
	};

	const handleKeyDown = (
		event: React.KeyboardEvent<HTMLButtonElement>,
		id: number,
	) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault(); // Prevent scrolling on Space
			handleCourseClick(id);
		}
	};

	if (loading) {
		return (
			<section className="mt-12 mb-8">
				<p className="text-gray-500">Loading related courses...</p>
			</section>
		);
	}

	if (error) {
		return (
			<section className="mt-12 mb-8">
				<p className="text-red-500">{error}</p>
			</section>
		);
	}

	return (
		<section className="mt-12 mb-8">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-medium">Related Courses</h2>
				<button
					onClick={handleViewAll}
					className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors"
				>
					View All
					<FaArrowRight className="w-4 h-4" />
				</button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
				{relatedCourses.length === 0 ? (
					<p className="text-gray-500">No related courses found.</p>
				) : (
					relatedCourses.map((course) => (
						<button
							key={course.id}
							onClick={() => handleCourseClick(course.id)}
							onKeyDown={(e) => handleKeyDown(e, course.id)}
							className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
						>
							<CourseCard
								imageUrl={course.thumbnail ?? ''}
								category={course.tag ?? ''}
								categoryBgColor="bg-gray-100"
								categoryTextColor="text-gray-800"
								price={course.originPrice ? course.originPrice.toString() : ''}
								title={course.title ?? ''}
								rating="4.8"
								students="N/A"
							/>
						</button>
					))
				)}
			</div>
		</section>
	);
}
