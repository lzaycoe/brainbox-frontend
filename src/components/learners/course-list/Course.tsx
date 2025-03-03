'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import PaginationCustom from '@/components/commons/PaginationCustom';
import SearchAndFilter from '@/components/commons/SearchAndFilter';
import FilterSelects from '@/components/teachers/courses/FilterSelects';
import TeacherCourseCard from '@/components/teachers/courses/TeacherCourseCard';
import { type Course as BaseCourse } from '@/schemas/course.schema';
import { getCourses } from '@/services/api/course';

interface Course extends BaseCourse {
	id: number;
	status: string;
	teacherId: number;
	createdAt: string;
	updatedAt: string;
	rating?: string;
}

interface TeacherCourseCardProps {
	id: number;
	teacherId: number;
	title: string;
	subtitle: string;
	tag: string;
	description: string;
	thumbnail: string;
	category: string;
	categoryBgColor: string;
	categoryTextColor: string;
	rating: string;
	students: string;
	originPrice: number; // Giữ là number
	salePrice: number; // Giữ là number
	public: boolean;
}

interface CourseComponentProps {
	initialCourses: Course[] | null;
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
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const coursesPerPage = 12;

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				setLoading(true);
				const fetchedCourses = (await getCourses()) as unknown as Course[];
				setCourses(fetchedCourses || []);
			} catch {
				setError('Failed to load courses. Please try again later.');
				setCourses([]);
			} finally {
				setLoading(false);
			}
		};

		if (!initialCourses || initialCourses.length === 0) {
			fetchCourses();
		}
	}, [initialCourses]);

	const mapToCardProps = (course: Course): TeacherCourseCardProps => ({
		id: course.id,
		teacherId: course.teacherId,
		title: course.title,
		subtitle: course.subtitle || 'No subtitle available',
		tag: course.tag,
		description: course.description || 'No description available',
		thumbnail: course.thumbnail,
		category: course.tag,
		categoryBgColor: getCategoryBgColor(course.tag),
		categoryTextColor: getCategoryTextColor(course.tag),
		rating: course.rating ?? 'N/A',
		students: 'N/A',
		originPrice: Number(course.originPrice), // Trả về number
		salePrice: Number(course.salePrice), // Trả về number
		public: course.public,
	});

	const getCategoryBgColor = (tag: string): string => {
		switch (tag.toLowerCase()) {
			case 'it & software':
				return 'bg-rose-50';
			case 'business':
				return 'bg-green-100';
			case 'personal development':
				return 'bg-rose-100';
			case 'office-productivity':
				return 'bg-slate-100';
			default:
				return 'bg-gray-100';
		}
	};

	const getCategoryTextColor = (tag: string): string => {
		switch (tag.toLowerCase()) {
			case 'it & software':
				return 'text-[#E34444]';
			case 'business':
				return 'text-[#22C55E]';
			case 'personal development':
				return 'text-[#E34444]';
			case 'office-productivity':
				return 'text-[#000000]';
			default:
				return 'text-gray-800';
		}
	};

	const handleCourseClick = (id: number) => {
		router.push(`/courses/${id}`);
	};

	const indexOfLastCourse = currentPage * coursesPerPage;
	const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;

	const filteredCourses = (courses || []).filter((course) => {
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
		const matchesPricing = (() => {
			const price = Number(course.originPrice); // Đã đúng với originPrice
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

	const handleKeyDown = (
		event: React.KeyboardEvent<HTMLButtonElement>,
		id: number,
	) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleCourseClick(id);
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-xl text-gray-500">Loading courses...</div>
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
		<div className="flex flex-col items-center">
			<SearchAndFilter onSearch={setSearchQuery}>
				<FilterSelects
					onCategoryChange={setSelectedCategory}
					onRatingChange={setSelectedRating}
					onPriceChange={setSelectedPricing}
				/>
			</SearchAndFilter>
			<div>
				<div className="grid grid-cols-4 gap-6 max-md:grid-cols-1 mb-5">
					{filteredCourses.length === 0 ? (
						<div className="col-span-4 mt-10 text-xl text-gray-500">
							No courses found for your search.
						</div>
					) : (
						currentCourses.map((course) => (
							<button
								key={course.id}
								onClick={() => handleCourseClick(course.id)}
								onKeyDown={(e) => handleKeyDown(e, course.id)}
								className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
							>
								<TeacherCourseCard {...mapToCardProps(course)} />
							</button>
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
		</div>
	);
};

export default CourseComponent;
