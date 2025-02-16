'use client';

import React, { useState } from 'react';

import PaginationCustom from '@/components/commons/PaginationCustom';
import SearchAndFilter from '@/components/commons/SearchAndFilter';
import CourseCard from '@/components/learners/dashboard/CourseCard';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const coursesData = [
	{
		id: 1,
		title: 'Reiki Level I, II and Master/Teacher Program',
		thumbnail: '/app/course/course01.png',
		completed: '0%',
	},
	{
		id: 2,
		title: 'Introduction to Python Programming',
		thumbnail: '/app/course/course01.png',
		completed: '20%',
	},
	{
		id: 3,
		title: 'Advanced JavaScript Concepts',
		thumbnail: '/app/course/course01.png',
		completed: '50%',
	},
	{
		id: 4,
		title: 'React for Beginners',
		thumbnail: '/app/course/course01.png',
		completed: '75%',
	},
	{
		id: 5,
		title: 'Mastering CSS Grid and Flexbox',
		thumbnail: '/app/course/course01.png',
		completed: '100%',
	},
	{
		id: 6,
		title: 'Node.js and Express.js Fundamentals',
		thumbnail: '/app/course/course01.png',
		completed: '30%',
	},
	{
		id: 7,
		title: 'Building RESTful APIs with Django',
		thumbnail: '/app/course/course01.png',
		completed: '60%',
	},
	{
		id: 8,
		title: 'Introduction to Machine Learning',
		thumbnail: '/app/course/course01.png',
		completed: '40%',
	},
	{
		id: 9,
		title: 'Data Structures and Algorithms',
		thumbnail: '/app/course/course01.png',
		completed: '90%',
	},
	{
		id: 10,
		title: 'Full-Stack Web Development',
		thumbnail: '/app/course/course01.png',
		completed: '10%',
	},
	{
		id: 11,
		title: 'Digital Marketing Strategies',
		thumbnail: '/app/course/course01.png',
		completed: '80%',
	},
	{
		id: 12,
		title: 'Graphic Design with Adobe Illustrator',
		thumbnail: '/app/course/course01.png',
		completed: '25%',
	},
	{
		id: 13,
		title: 'Photography Masterclass',
		thumbnail: '/app/course/course01.png',
		completed: '55%',
	},
	{
		id: 14,
		title: 'Music Production with Ableton Live',
		thumbnail: '/app/course/course01.png',
		completed: '70%',
	},
	{
		id: 15,
		title: 'Creative Writing Workshop',
		thumbnail: '/app/course/course01.png',
		completed: '35%',
	},
	{
		id: 16,
		title: 'Public Speaking and Presentation Skills',
		thumbnail: '/app/course/course01.png',
		completed: '45%',
	},
	{
		id: 17,
		title: 'Financial Analysis and Modeling',
		thumbnail: '/app/course/course01.png',
		completed: '65%',
	},
	{
		id: 18,
		title: 'Introduction to Blockchain Technology',
		thumbnail: '/app/course/course01.png',
		completed: '85%',
	},
	{
		id: 19,
		title: 'Cybersecurity Essentials',
		thumbnail: '/app/course/course01.png',
		completed: '95%',
	},
	{
		id: 20,
		title: 'Artificial Intelligence for Everyone',
		thumbnail: '/app/course/course01.png',
		completed: '50%',
	},
];

const CourseList: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const coursesPerPage = 12;

	const indexOfLastCourse = currentPage * coursesPerPage;
	const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

	const filteredCourses = coursesData.filter((course) => {
		const matchesSearchQuery = course.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesStatusFilter =
			statusFilter === 'all' ||
			(statusFilter === 'completed' && course.completed === '100%') ||
			(statusFilter === 'in-progress' && course.completed !== '100%');
		return matchesSearchQuery && matchesStatusFilter;
	});

	const currentCourses = filteredCourses.slice(
		indexOfFirstCourse,
		indexOfLastCourse,
	);

	const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	return (
		<div className="flex flex-col items-center py-5">
			<SearchAndFilter
				totalCourses={filteredCourses.length}
				onSearch={setSearchQuery}
			>
				<div className="w-60 flex flex-col justify-start items-start gap-2">
					<div className="text-[#6e7484] text-xs font-normal leading-none">
						Status:
					</div>
					<Select onValueChange={setStatusFilter}>
						<SelectTrigger className="h-12 pl-[18px] pr-4 py-3 bg-white border border-[#e8eaef] justify-center items-center gap-[104px] inline-flex overflow-hidden">
							<SelectValue placeholder="All Courses" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Courses</SelectItem>
							<SelectItem value="completed">Completed</SelectItem>
							<SelectItem value="in-progress">In Progress</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</SearchAndFilter>
			{filteredCourses.length === 0 ? (
				<div className="mt-10 text-xl text-gray-500">
					No courses found for your search.
				</div>
			) : (
				<>
					<div className="grid grid-cols-4 gap-6 max-md:grid-cols-1 mt-10 mb-5">
						{currentCourses.map((course) => (
							<CourseCard key={course.id} {...course} />
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

export default CourseList;
