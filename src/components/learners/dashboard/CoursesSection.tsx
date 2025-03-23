'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Loading from '@/components/commons/Loading';
import {
	CourseProgressCardData,
	fetchPaidCoursesProgress,
} from '@/services/custom/course/checkProgress';

import CourseCard from './CourseCard';

const CoursesSection = ({ userId }: { userId: number }) => {
	const [courses, setCourses] = useState<CourseProgressCardData[]>([]);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const loadCourses = async () => {
			setLoading(true);
			try {
				const fetchedCourses = await fetchPaidCoursesProgress(userId);
				if (fetchedCourses) {
					const nearCompletedCourses = fetchedCourses
						.filter((course) => parseFloat(course.completed) < 100)
						.sort((a, b) => parseFloat(a.completed) - parseFloat(b.completed)) // Sắp xếp từ thấp đến cao
						.slice(0, 4);
					setCourses(nearCompletedCourses);
				} else {
					setCourses([]);
				}
			} catch (error) {
				console.error('Failed to load courses:', error);
			} finally {
				setLoading(false);
			}
		};

		loadCourses();
	}, [userId]);

	const handleViewAll = () => {
		router.push('/courses');
	};

	const handleCourseClick = (courseId: number) => {
		router.push(`/watch-course/${courseId}`);
	};

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="bg-white p-6 rounded-lg shadow-md max-w-7xl mt-10">
			<div className="flex justify-between items-center">
				<h2 className="text-2xl font-semibold">Lets start learning</h2>
				<button
					onClick={handleViewAll}
					className="text-orange-500 hover:text-orange-600 font-medium"
				>
					View All
				</button>
			</div>
			<div className="grid grid-cols-4 gap-6 mt-4">
				{courses.map((course) => (
					<button
						key={course.id}
						onClick={() => handleCourseClick(course.id)}
						className="cursor-pointer bg-transparent border-none p-0"
						type="button"
					>
						<CourseCard {...course} />
					</button>
				))}
			</div>
		</div>
	);
};

export default CoursesSection;
