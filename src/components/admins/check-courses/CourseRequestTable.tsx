import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsFilter } from 'react-icons/bs';

import PaginationCustom from '@/components/commons/PaginationCustom';
import { Course as ApiCourse } from '@/schemas/course.schema';
import { getCourses } from '@/services/api/course';
import { getUserClerk } from '@/services/api/user';

import CourseActionsDropdown from './CourseActionsDropdown';
import StatusBadge from './StatusBadge';

interface Teacher {
	id: number;
	firstName?: string;
	lastName?: string;
	name?: string;
}

interface Course extends ApiCourse {
	teacher?: Teacher;
	createAt?: string;
	updateAt?: string;
}

export default function CourseRequestTable() {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(1);
	const [courses, setCourses] = useState<Course[]>([]);
	const [loading, setLoading] = useState(true);
	const [statusFilter, setStatusFilter] = useState<string>('all');
	const itemsPerPage = 5;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const coursesData = await getCourses();
				console.log('Raw courses data:', coursesData);

				const coursesWithTeacherDetails = await Promise.all(
					coursesData.map(async (course) => {
						try {
							if (course.teacherId) {
								const teacherDetails = await getUserClerk(course.teacherId);
								return {
									...course,
									teacher: {
										id: course.teacherId,
										firstName: teacherDetails.firstName,
										lastName: teacherDetails.lastName,
										name: `${teacherDetails.firstName} ${teacherDetails.lastName}`,
									},
								} as Course;
							}
							return course as Course;
						} catch (error) {
							console.error(
								`Failed to fetch teacher details for course ${course.id}:`,
								error,
							);
							return course as Course;
						}
					}),
				);

				setCourses(coursesWithTeacherDetails);
			} catch (error) {
				console.error('Failed to fetch courses:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const filteredCourses = courses
		.filter((course) =>
			statusFilter === 'all' ? true : course.status === statusFilter,
		)
		.sort((a, b) => {
			// Helper function to get timestamp value for sorting
			const getTimestampValue = (course: Course) => {
				if (course.createAt) return new Date(course.createAt).getTime();
				if (course.updateAt) return new Date(course.updateAt).getTime();
				return course.id;
			};

			return getTimestampValue(b) - getTimestampValue(a); // Sort in descending order
		});

	const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const currentItems = filteredCourses.slice(
		startIndex,
		startIndex + itemsPerPage,
	);

	const handleStatusUpdate = async (courseId: number, newStatus: string) => {
		try {
			const courseToUpdate = courses.find((c) => c.id === courseId);
			if (!courseToUpdate) return;

			await axios.put(
				`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`,
				{ status: newStatus },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);

			setCourses((prevCourses) =>
				prevCourses.map((course) =>
					course.id === courseId ? { ...course, status: newStatus } : course,
				),
			);
		} catch (error) {
			console.error('Failed to update course status:', error);
		}
	};

	const handleViewDetails = (courseId: number) => {
		router.push(`/admins/check-courses/course/${courseId}`);
	};

	const getDropdownPosition = (index: number) => {
		if (index >= currentItems.length - 2) {
			return 'bottom';
		}
		return 'top';
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center py-8">Loading...</div>
		);
	}

	return (
		<div>
			<div className="px-6 py-4 bg-white border-b border-gray-200">
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2">
						<BsFilter className="w-5 h-5 text-gray-500" />
						<span className="text-sm text-gray-600">Filter by status:</span>
					</div>
					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
						className="px-3 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					>
						<option value="all">All Status</option>
						<option value="pending">Pending</option>
						<option value="approved">Approved</option>
						<option value="rejected">Rejected</option>
					</select>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-gray-50 border-b border-gray-200">
						<tr>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
								Teacher
							</th>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
								Course Name
							</th>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
								Description
							</th>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
								Status
							</th>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
								Created At
							</th>
							<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="bg-white">
						{currentItems.map((course, index) => (
							<tr key={course.id} className="border-b border-gray-100">
								<td className="px-6 py-4 text-sm text-gray-900">
									{course.teacher?.firstName || course.teacher?.lastName
										? [course.teacher.firstName, course.teacher.lastName]
												.filter(Boolean)
												.join(' ')
										: (course.teacher?.name ?? 'Unknown Teacher')}
								</td>
								<td className="px-6 py-4 text-sm text-gray-900">
									{course.title}
								</td>
								<td className="px-6 py-4 text-sm text-gray-500 max-w-[300px] truncate">
									{course.description}
								</td>
								<td className="px-6 py-4">
									<StatusBadge status={course.status} />
								</td>
								<td className="px-6 py-4 text-sm text-gray-500">
									{(() => {
										if (course.createAt)
											return new Date(course.createAt).toLocaleDateString();
										if (course.updateAt)
											return (
												new Date(course.updateAt).toLocaleDateString() +
												' (updated)'
											);
										return '-';
									})()}
								</td>
								<td className="px-6 py-4">
									<CourseActionsDropdown
										courseId={course.id}
										status={course.status}
										onStatusUpdate={handleStatusUpdate}
										onViewDetails={handleViewDetails}
										position={getDropdownPosition(index)}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
				<div className="text-sm text-gray-500">
					Showing {startIndex + 1} to{' '}
					{Math.min(startIndex + itemsPerPage, filteredCourses.length)} of{' '}
					{filteredCourses.length} entries
				</div>
				<PaginationCustom
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={setCurrentPage}
					activeClassName="bg-blue-50 text-blue-600"
					hoverClassName="hover:bg-gray-100"
				/>
			</div>
		</div>
	);
}
