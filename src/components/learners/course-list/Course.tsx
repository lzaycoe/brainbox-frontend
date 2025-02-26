'use client';

import React, { useState } from 'react';

import PaginationCustom from '@/components/commons/PaginationCustom';
import SearchAndFilter from '@/components/commons/SearchAndFilter';
import FilterSelects from '@/components/teachers/courses/FilterSelects';
import TeacherCourseCard from '@/components/teachers/courses/TeacherCourseCard';

const coursesData = [
	{
		id: 1,
		title: 'Reiki Level I, II and Master/Teacher Program',
		imageUrl: '/app/course/course01.png',
		category: 'Business',
		categoryBgColor: 'bg-green-100',
		categoryTextColor: 'text-[#22C55E]',
		rating: '4.9',
		students: '52,822',
		originalPrice: '$97.00',
	},
	{
		id: 2,
		title: 'Introduction to Python Programming',
		imageUrl: '/app/course/course01.png',
		category: 'Finance & Accounting',
		categoryBgColor: 'bg-orange-50',
		categoryTextColor: 'text-[#F59E0B]',
		rating: '4.8',
		students: '33,841',
		originalPrice: '$87.00',
	},
	{
		id: 3,
		title: 'Advanced JavaScript Concepts',
		imageUrl: '/app/course/course01.png',
		category: 'IT & Software',
		categoryBgColor: 'bg-rose-50',
		categoryTextColor: 'text-[#E34444]',
		rating: '4.7',
		students: '22,649',
		originalPrice: '$107.00',
	},
];

const Course: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [selectedRating, setSelectedRating] = useState('all');
	const [selectedPricing, setSelectedPricing] = useState('all');
	const coursesPerPage = 12;

	const indexOfLastCourse = currentPage * coursesPerPage;
	const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

	const filteredCourses = coursesData.filter((course) => {
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
			const price = parseFloat(course.originalPrice.replace('$', ''));
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

	return (
		<div className="flex flex-col items-center">
			<SearchAndFilter onSearch={setSearchQuery}>
				<FilterSelects
					onCategoryChange={setSelectedCategory}
					onRatingChange={setSelectedRating}
					onPriceChange={setSelectedPricing}
				/>
			</SearchAndFilter>
			<>
				<div>
					<div className="grid grid-cols-4 gap-6 max-md:grid-cols-1 mb-5">
						{filteredCourses.length === 0 ? (
							<div className="col-span-4 mt-10 text-xl text-gray-500">
								No courses found for your search.
							</div>
						) : (
							currentCourses.map((course) => (
								<TeacherCourseCard key={course.id} {...course} />
							))
						)}
					</div>
				</div>
				{filteredCourses.length > 0 && (
					<PaginationCustom
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={paginate}
						activeClassName="bg-[#FF6636] text-white"
						hoverClassName="hover:bg-[#FFEEE8] hover:text-[#FF6636]"
					/>
				)}
			</>
		</div>
	);
};

export default Course;
