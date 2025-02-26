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
	{
		id: 4,
		title: 'React for Beginners',
		imageUrl: '/app/course/course01.png',
		category: 'Personal Development',
		categoryBgColor: 'bg-rose-100',
		categoryTextColor: 'text-[#E34444]',
		rating: '4.6',
		students: '20,126',
		originalPrice: '$77.00',
	},
	{
		id: 5,
		title: 'Mastering CSS Grid and Flexbox',
		imageUrl: '/app/course/course01.png',
		category: 'Office Productivity',
		categoryBgColor: 'bg-slate-100',
		categoryTextColor: 'text-[#000000]',
		rating: '4.5',
		students: '13,932',
		originalPrice: '$67.00',
	},
	{
		id: 6,
		title: 'Node.js and Express.js Fundamentals',
		imageUrl: '/app/course/course01.png',
		category: 'Marketing',
		categoryBgColor: 'bg-violet-100',
		categoryTextColor: 'text-[#564FFD]',
		rating: '4.4',
		students: '12,068',
		originalPrice: '$117.00',
	},
	{
		id: 7,
		title: 'Building RESTful APIs with Django',
		imageUrl: '/app/course/course01.png',
		category: 'Photography & Video',
		categoryBgColor: 'bg-slate-100',
		categoryTextColor: 'text-[#000000]',
		rating: '4.3',
		students: '6,196',
		originalPrice: '$127.00',
	},
	{
		id: 8,
		title: 'Introduction to Machine Learning',
		imageUrl: '/app/course/course01.png',
		category: 'Lifestyle',
		categoryBgColor: 'bg-orange-50',
		categoryTextColor: 'text-[#FD8E1F]',
		rating: '4.2',
		students: '2,736',
		originalPrice: '$137.00',
	},
	{
		id: 9,
		title: 'Data Structures and Algorithms',
		imageUrl: '/app/course/course01.png',
		category: 'Design',
		categoryBgColor: 'bg-rose-100',
		categoryTextColor: 'text-[#FF6636]',
		rating: '4.1',
		students: '2,600',
		originalPrice: '$87.00',
	},
	{
		id: 10,
		title: 'Full-Stack Web Development',
		imageUrl: '/app/course/course01.png',
		category: 'Health & Fitness',
		categoryBgColor: 'bg-green-100',
		categoryTextColor: 'text-[#23BD33]',
		rating: '4.0',
		students: '1,678',
		originalPrice: '$97.00',
	},
	{
		id: 11,
		title: 'Digital Marketing Strategies',
		imageUrl: '/app/course/course01.png',
		category: 'Music',
		categoryBgColor: 'bg-orange-50',
		categoryTextColor: 'text-[#FD8E1F]',
		rating: '3.9',
		students: '959',
		originalPrice: '$107.00',
	},
	{
		id: 12,
		title: 'Graphic Design with Adobe Illustrator',
		imageUrl: '/app/course/course01.png',
		category: 'Business',
		categoryBgColor: 'bg-green-100',
		categoryTextColor: 'text-[#22C55E]',
		rating: '3.8',
		students: '52,822',
		originalPrice: '$117.00',
	},
	{
		id: 13,
		title: 'Photography Masterclass',
		imageUrl: '/app/course/course01.png',
		category: 'Finance & Accounting',
		categoryBgColor: 'bg-orange-50',
		categoryTextColor: 'text-[#F59E0B]',
		rating: '3.7',
		students: '33,841',
		originalPrice: '$127.00',
	},
	{
		id: 14,
		title: 'Music Production with Ableton Live',
		imageUrl: '/app/course/course01.png',
		category: 'IT & Software',
		categoryBgColor: 'bg-rose-50',
		categoryTextColor: 'text-[#E34444]',
		rating: '3.6',
		students: '22,649',
		originalPrice: '$137.00',
	},
	{
		id: 15,
		title: 'Creative Writing Workshop',
		imageUrl: '/app/course/course01.png',
		category: 'Personal Development',
		categoryBgColor: 'bg-rose-100',
		categoryTextColor: 'text-[#E34444]',
		rating: '3.5',
		students: '20,126',
		originalPrice: '$87.00',
	},
	{
		id: 16,
		title: 'Public Speaking and Presentation Skills',
		imageUrl: '/app/course/course01.png',
		category: 'Office Productivity',
		categoryBgColor: 'bg-slate-100',
		categoryTextColor: 'text-[#000000]',
		rating: '3.4',
		students: '13,932',
		originalPrice: '$97.00',
	},
	{
		id: 17,
		title: 'Financial Analysis and Modeling',
		imageUrl: '/app/course/course01.png',
		category: 'Marketing',
		categoryBgColor: 'bg-violet-100',
		categoryTextColor: 'text-[#564FFD]',
		rating: '3.3',
		students: '12,068',
		originalPrice: '$107.00',
	},
	{
		id: 18,
		title: 'Introduction to Blockchain Technology',
		imageUrl: '/app/course/course01.png',
		category: 'Photography & Video',
		categoryBgColor: 'bg-slate-100',
		categoryTextColor: 'text-[#000000]',
		rating: '3.2',
		students: '6,196',
		originalPrice: '$117.00',
	},
	{
		id: 19,
		title: 'Cybersecurity Essentials',
		imageUrl: '/app/course/course01.png',
		category: 'Lifestyle',
		categoryBgColor: 'bg-orange-50',
		categoryTextColor: 'text-[#FD8E1F]',
		rating: '3.1',
		students: '2,736',
		originalPrice: '$127.00',
	},
	{
		id: 20,
		title: 'Artificial Intelligence for Everyone',
		imageUrl: '/app/course/course01.png',
		category: 'Design',
		categoryBgColor: 'bg-rose-100',
		categoryTextColor: 'text-[#FF6636]',
		rating: '3.0',
		students: '2,600',
		originalPrice: '$137.00',
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
