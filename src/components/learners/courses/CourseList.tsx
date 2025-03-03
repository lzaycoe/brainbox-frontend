'use client';

import React, { useEffect, useState } from 'react';

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
import {
	CourseData,
	fetchPaidCoursesProgress,
} from '@/services/custom/course/checkProgress';

const CourseList: React.FC<{ userId: number }> = ({ userId }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [courses, setCourses] = useState<CourseData[]>([]);
	const coursesPerPage = 12;

	useEffect(() => {
		const loadCourses = async () => {
			const fetchedCourses = await fetchPaidCoursesProgress(userId);
			if (fetchedCourses) {
				setCourses(fetchedCourses);
			} else {
				setCourses([]);
			}
		};

		loadCourses();
	}, [userId]);

	const indexOfLastCourse = currentPage * coursesPerPage;
	const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

	const filteredCourses = courses.filter((course) => {
		const matchesSearchQuery = course.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesStatusFilter =
			statusFilter === 'all' ||
			(statusFilter === 'completed' && course.completed === '100.0%') ||
			(statusFilter === 'in-progress' && course.completed !== '100.0%');
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
