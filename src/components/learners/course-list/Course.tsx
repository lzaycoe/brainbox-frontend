'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import CourseCard from '@/components/commons/CourseCard';
import Loading from '@/components/commons/Loading';
import PaginationCustom from '@/components/commons/PaginationCustom';
import SearchAndFilter from '@/components/commons/SearchAndFilter';
import FilterSelects from '@/components/teachers/courses/FilterSelects';
import { getCategoryColors } from '@/config/categoryColors';
import { Course as BaseCourse } from '@/schemas/course.schema';
import { getCourses } from '@/services/api/course';
import { fetchPaidStudentsCount } from '@/services/api/payment';

interface Course extends BaseCourse {
	id: number;
	status: string;
	teacherId: number;
	createdAt: string;
	updatedAt: string;
	students?: number;
	rating?: string;
}

interface CourseComponentProps {
	initialCourses?: Course[] | null;
}

const CourseComponent: React.FC<CourseComponentProps> = ({
	initialCourses,
}) => {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [selectedRating, setSelectedRating] = useState('all');
	const [selectedPricing, setSelectedPricing] = useState('all');
	const [courses, setCourses] = useState<Course[]>(initialCourses || []);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const coursesPerPage = 12;

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				setLoading(true);
				const data = await getCourses();

				const approvedCourses = data.filter(
					(course) => course.status === 'approved',
				);

				const formattedData: Course[] = await Promise.all(
					approvedCourses.map(async (course) => {
						const students = await fetchPaidStudentsCount(course.id);
						return {
							...course,
							students: students ?? 0,
							createdAt: course.createdAt ?? '',
							updatedAt: course.updatedAt ?? '',
						};
					}),
				);

				setCourses(formattedData);
			} catch {
				setError('Failed to load courses. Please try again later.');
				setCourses([]);
			} finally {
				setLoading(false);
			}
		};

		if (!initialCourses || initialCourses.length === 0) {
			fetchCourses();
		} else {
			const updateCoursesWithStudents = async () => {
				setLoading(true);
				const updatedCourses = await Promise.all(
					initialCourses.map(async (course) => {
						if (course.students === undefined) {
							const students = await fetchPaidStudentsCount(course.id);
							return { ...course, students: students ?? 0 };
						}
						return course;
					}),
				);
				setCourses(updatedCourses);
				setLoading(false);
			};
			updateCoursesWithStudents();
		}
	}, [initialCourses]);

	const handleCourseClick = (id: number) => {
		router.push(`/courses/${id}`);
	};

	const indexOfLastCourse = currentPage * coursesPerPage;
	const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

	const filteredCourses = courses.filter((course) => {
		const matchesSearchQuery = course.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesCategory =
			selectedCategory === 'all' || course.tag === selectedCategory;
		const matchesRating =
			selectedRating === 'all' ||
			(course.rating &&
				parseFloat(course.rating) >= parseFloat(selectedRating));
		const matchesPricing = (() => {
			const price = Number(course.salePrice);
			switch (selectedPricing) {
				case 'under-500k':
					return price >= 0 && price <= 500000;
				case '500k-1m':
					return price > 500000 && price <= 1000000;
				case '1m-2m':
					return price > 1000000 && price <= 2000000;
				case '2m-5m':
					return price > 2000000 && price <= 5000000;
				case 'over-5m':
					return price > 5000000;
				case 'all':
					return true;
				default:
					return true;
			}
		})();

		return (
			matchesSearchQuery && matchesCategory && matchesRating && matchesPricing
		);
	});

	const currentCourses = filteredCourses.slice(
		indexOfFirstCourse,
		indexOfLastCourse,
	);
	const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loading />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-xl text-red-500">{error}</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center py-5 px-32">
			<SearchAndFilter onSearch={setSearchQuery}>
				<FilterSelects
					onCategoryChange={setSelectedCategory}
					onRatingChange={setSelectedRating}
					onPriceChange={setSelectedPricing}
				/>
			</SearchAndFilter>
			{filteredCourses.length === 0 ? (
				<div className="mt-10 text-xl text-gray-500">
					No courses found for your search.
				</div>
			) : (
				<>
					<div className="grid grid-cols-4 gap-6 mt-10 mb-5 max-md:grid-cols-1">
						{currentCourses.map((course) => {
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
									rating={course.rating ? parseFloat(course.rating) : 0.0}
									students={course.students ?? 0}
									onClick={() => handleCourseClick(course.id)}
									maxWidth="max-w-[300px]"
								/>
							);
						})}
					</div>
					<PaginationCustom
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={paginate}
						activeClassName="bg-[#FF6636] text-white"
						hoverClassName="hover:bg-[#FFEEE8] hover:text-[#FF6636]"
					/>
				</>
			)}
		</div>
	);
};

export default CourseComponent;
