'use client';

import React, { useEffect, useState } from 'react';

import PaginationCustom from '@/components/commons/PaginationCustom';
import SearchAndFilter from '@/components/commons/SearchAndFilter';
import FilterSelects from '@/components/teachers/courses/FilterSelects';
import TeacherCourseCard from '@/components/teachers/courses/TeacherCourseCard';
import { useUserContext } from '@/contexts/UserContext';
import { Course } from '@/schemas/course.schema';
import { getTeacherCourses } from '@/services/api/course';

const TeacherCourseList: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [selectedRating, setSelectedRating] = useState('all');
	const [selectedPricing, setSelectedPricing] = useState('all'); // Added for price filtering
	const coursesPerPage = 12;
	const { user, loading: userLoading } = useUserContext();
	const [courses, setCourses] = useState<Course[]>([]);
	const [fetchLoading, setFetchLoading] = useState(true);

	useEffect(() => {
		const fetchCourses = async () => {
			if (userLoading || !user) {
				setFetchLoading(false);
				return;
			}

			try {
				const teacherId = user.id;
				const fetchedCourses = await getTeacherCourses(teacherId);
				setCourses(fetchedCourses);
				console.log('Fetched teacher courses:', fetchedCourses);
			} catch (error) {
				console.error('Error fetching courses:', error);
				setCourses([]);
			} finally {
				setFetchLoading(false);
			}
		};

		fetchCourses();
	}, [userLoading, user]);

	const indexOfLastCourse = currentPage * coursesPerPage;
	const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

	const filteredCourses = courses.filter((course) => {
		const matchesSearchQuery = course.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesCategory =
			selectedCategory === 'all' ||
			course.category.toLowerCase().replace(/ /g, '-') === selectedCategory;
		const matchesRating =
			selectedRating === 'all' ||
			parseFloat(course.rating) >= parseFloat(selectedRating.split('-')[0]);
		const matchesPricing = (() => {
			const price =
				parseFloat(course.discountPrice.replace('$', '')) ||
				parseFloat(course.originalPrice.replace('$', ''));
			switch (selectedPricing) {
				case '1':
					return price >= 1 && price <= 20;
				case '2':
					return price >= 21 && price <= 40;
				case '3':
					return price >= 41 && price <= 60;
				case '4':
					return price >= 61 && price <= 80;
				case '5':
					return price > 80;
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

	if (userLoading || fetchLoading) {
		return <div>Loading courses...</div>;
	}

	if (!user) {
		return <div>Please sign in to view your courses.</div>;
	}

	return (
		<div className="flex flex-col items-center">
			<SearchAndFilter onSearch={setSearchQuery}>
				<FilterSelects
					onCategoryChange={setSelectedCategory}
					onRatingChange={setSelectedRating}
					onPriceChange={setSelectedPricing} // Added onPriceChange
				/>
			</SearchAndFilter>
			{filteredCourses.length === 0 ? (
				<div className="mt-10 text-xl text-gray-500">
					No courses found for your search.
				</div>
			) : (
				<>
					<div className="grid grid-cols-4 gap-6 max-md:grid-cols-1 mb-5">
						{currentCourses.map((course) => (
							<TeacherCourseCard key={course.id} {...course} />
						))}
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

export default TeacherCourseList;
