'use client';

import React, { useEffect, useState } from 'react';

import PaginationCustom from '@/components/commons/PaginationCustom';
import SearchAndFilter from '@/components/commons/SearchAndFilter';
import FilterSelects from '@/components/teachers/courses/FilterSelects';
import TeacherCourseCard from '@/components/teachers/courses/TeacherCourseCard';
import { useUserContext } from '@/contexts/UserContext';
import { Course as BaseCourse } from '@/schemas/course.schema';
import { getTeacherCourses } from '@/services/api/course';

// Extend schema Course để thêm các thuộc tính cần thiết
interface Course extends BaseCourse {
	id: number;
	teacherId: number;
	title: string;
	subtitle?: string;
	description?: string;
	originPrice: string; // API trả về string
	salePrice: string; // API trả về string
	thumbnail: string;
	tag: string; // Dùng tag thay cho category
	status: string;
	public: boolean;
	createdAt: string;
	updatedAt: string;
	rating?: string; // Thêm rating tùy chọn
}

const TeacherCourseList: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState('all');
	const [selectedRating, setSelectedRating] = useState('all');
	const [selectedPricing, setSelectedPricing] = useState('all');
	const coursesPerPage = 12;
	const { user, loading: userLoading } = useUserContext();
	const [courses, setCourses] = useState<Course[]>([]);
	const [fetchLoading, setFetchLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

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
				setError('Failed to load courses. Please try again.');
				setCourses([]);
			} finally {
				setFetchLoading(false);
			}
		};

		fetchCourses();
	}, [userLoading, user]);

	// Hàm lọc chung để giảm trùng lặp
	const filterCourses = (course: Course) => {
		const matchesSearchQuery = course.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase());

		const matchesCategory =
			selectedCategory === 'all' ||
			course.tag.toLowerCase().replace(/ /g, '-') === selectedCategory;

		const matchesRating =
			selectedRating === 'all' ||
			(course.rating &&
				parseFloat(course.rating) >= parseFloat(selectedRating.split('-')[0]));

		const matchesPricing = () => {
			const price =
				parseFloat(course.salePrice) || parseFloat(course.originPrice);
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
		};

		return (
			matchesSearchQuery && matchesCategory && matchesRating && matchesPricing()
		);
	};

	const filteredCourses = courses.filter(filterCourses);

	const indexOfLastCourse = currentPage * coursesPerPage;
	const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
	const currentCourses = filteredCourses.slice(
		indexOfFirstCourse,
		indexOfLastCourse,
	);

	const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	if (userLoading || fetchLoading) {
		return <div>Loading courses...</div>;
	}

	if (error) {
		return <div className="text-red-500">{error}</div>;
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
					onPriceChange={setSelectedPricing}
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
								id={course.id}
								teacherId={course.teacherId}
								title={course.title}
								subtitle={course.subtitle ?? 'No subtitle'}
								tag={course.tag}
								description={course.description ?? 'No description'}
								thumbnail={course.thumbnail}
								category={course.tag} // Dùng tag làm category
								categoryBgColor="bg-gray-100" // Có thể thêm logic nếu cần
								categoryTextColor="text-gray-800" // Có thể thêm logic nếu cần
								rating={course.rating ?? 'N/A'}
								students="N/A" // Thêm logic nếu có dữ liệu students
								originPrice={parseFloat(course.originPrice)}
								salePrice={parseFloat(course.salePrice)}
								public={course.public}
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
