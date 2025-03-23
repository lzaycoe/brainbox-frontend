'use client';

import React, { useEffect, useState } from 'react';

import Loading from '@/components/commons/Loading';
import PaginationCustom from '@/components/commons/PaginationCustom';
import SearchAndFilter from '@/components/commons/SearchAndFilter';
import FilterSelects from '@/components/teachers/courses/FilterSelects';
import TeacherCourseCard from '@/components/teachers/courses/TeacherCourseCard';
import { useUserContext } from '@/contexts/UserContext';
import { Course } from '@/schemas/course.schema';
import { getTeacherCourses } from '@/services/api/course';
import { fetchPaidStudentsCount } from '@/services/api/payment';

const TeacherCourseList: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const coursesPerPage = 12;
	const { user, loading: userLoading } = useUserContext();
	const [courses, setCourses] = useState<Course[]>([]);
	const [fetchLoading, setFetchLoading] = useState(true);
	const [paidPaymentsCount, setPaidPaymentsCount] = useState<{
		[key: number]: number;
	}>({});

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

	useEffect(() => {
		const fetchPaymentsForCourses = async () => {
			if (courses.length === 0) return;

			const paymentsCountMap: { [key: number]: number } = {};

			await Promise.all(
				courses.map(async (course) => {
					paymentsCountMap[course.id] = await fetchPaidStudentsCount(course.id);
				}),
			);

			setPaidPaymentsCount(paymentsCountMap);
		};

		fetchPaymentsForCourses();
	}, [courses]);

	const indexOfLastCourse = currentPage * coursesPerPage;
	const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

	const filteredCourses = courses.filter((course) => {
		const matchesSearchQuery = course.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesCategory =
			selectedCategory === 'all' || course.tag === selectedCategory;
		return matchesSearchQuery && matchesCategory;
	});

	const currentCourses = filteredCourses.slice(
		indexOfFirstCourse,
		indexOfLastCourse,
	);

	const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	if (userLoading || fetchLoading) {
		return <Loading />;
	}

	if (!user) {
		return <div>Please sign in to view your courses.</div>;
	}

	return (
		<div className="flex flex-col items-center">
			<SearchAndFilter
				onSearch={setSearchQuery}
				inputPlaceholder="Search for your courses..."
			>
				<FilterSelects
					onCategoryChange={setSelectedCategory}
					onRatingChange={() => {}}
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
							<TeacherCourseCard
								key={course.id}
								{...course}
								rating={5.0}
								students={paidPaymentsCount[course.id] || 0}
							/>
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
