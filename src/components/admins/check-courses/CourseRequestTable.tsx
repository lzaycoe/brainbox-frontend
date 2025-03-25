import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsFilter } from 'react-icons/bs';
import { IoReload } from 'react-icons/io5';

import Loading from '@/components/commons/Loading';
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
	const [refreshing, setRefreshing] = useState(false);
	const [statusFilter, setStatusFilter] = useState<string>('all');
	const [showColumnsDropdown, setShowColumnsDropdown] = useState(false);
	const [visibleColumns, setVisibleColumns] = useState({
		teacher: true,
		courseName: true,
		description: true,
		status: true,
		createdAt: true,
		actions: true,
	});
	const itemsPerPage = 10;

	const fetchData = async () => {
		try {
			setRefreshing(true);
			const coursesData = await getCourses();

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
					} catch {
						return course as Course;
					}
				}),
			);

			setCourses(coursesWithTeacherDetails);
		} catch (error) {
			console.error('Failed to fetch courses:', error);
		} finally {
			setLoading(false);
			setRefreshing(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const filteredCourses = courses
		.filter((course) =>
			statusFilter === 'all' ? true : course.status === statusFilter,
		)
		.sort((a, b) => {
			const getTimestampValue = (course: Course) => {
				if (course.createAt) return new Date(course.createAt).getTime();
				if (course.updateAt) return new Date(course.updateAt).getTime();
				return course.id;
			};

			return getTimestampValue(b) - getTimestampValue(a);
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
		} catch {
			console.error('Failed to update course status');
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

	const toggleColumnsDropdown = () => {
		setShowColumnsDropdown(!showColumnsDropdown);
	};

	const toggleColumnVisibility = (column: keyof typeof visibleColumns) => {
		setVisibleColumns({
			...visibleColumns,
			[column]: !visibleColumns[column],
		});
	};

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest('.columns-dropdown-container')) {
				setShowColumnsDropdown(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	if (loading) {
		return <Loading />;
	}

	return (
		<div>
			<div className="px-6 py-4 bg-white border-b border-gray-200">
				<div className="flex items-center justify-between">
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

					<div className="flex items-center gap-2">
						<button
							onClick={fetchData}
							disabled={refreshing}
							className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded focus:outline-none hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
						>
							<IoReload
								className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`}
							/>
							Refresh
						</button>

						<div className="relative inline-block text-left columns-dropdown-container">
							<button
								type="button"
								onClick={toggleColumnsDropdown}
								className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded focus:outline-none hover:bg-gray-50 transition-colors duration-200"
							>
								Columns
								<svg
									className="w-5 h-5"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fillRule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clipRule="evenodd"
									/>
								</svg>
							</button>

							{showColumnsDropdown && (
								<div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
									<div className="py-1">
										<div className="px-4 py-2 text-xs font-medium text-gray-700 border-b">
											Toggle Columns
										</div>
										<div className="px-2 py-2 space-y-1">
											<label className="flex items-center px-2 py-1 text-sm hover:bg-gray-100 rounded cursor-pointer">
												<input
													type="checkbox"
													checked={visibleColumns.teacher}
													onChange={() => toggleColumnVisibility('teacher')}
													className="mr-2"
												/>
												Teacher
											</label>
											<label className="flex items-center px-2 py-1 text-sm hover:bg-gray-100 rounded cursor-pointer">
												<input
													type="checkbox"
													checked={visibleColumns.courseName}
													onChange={() => toggleColumnVisibility('courseName')}
													className="mr-2"
												/>
												Course Name
											</label>
											<label className="flex items-center px-2 py-1 text-sm hover:bg-gray-100 rounded cursor-pointer">
												<input
													type="checkbox"
													checked={visibleColumns.description}
													onChange={() => toggleColumnVisibility('description')}
													className="mr-2"
												/>
												Description
											</label>
											<label className="flex items-center px-2 py-1 text-sm hover:bg-gray-100 rounded cursor-pointer">
												<input
													type="checkbox"
													checked={visibleColumns.status}
													onChange={() => toggleColumnVisibility('status')}
													className="mr-2"
												/>
												Status
											</label>
											<label className="flex items-center px-2 py-1 text-sm hover:bg-gray-100 rounded cursor-pointer">
												<input
													type="checkbox"
													checked={visibleColumns.createdAt}
													onChange={() => toggleColumnVisibility('createdAt')}
													className="mr-2"
												/>
												Created At
											</label>
											<label className="flex items-center px-2 py-1 text-sm hover:bg-gray-100 rounded cursor-pointer">
												<input
													type="checkbox"
													checked={visibleColumns.actions}
													onChange={() => toggleColumnVisibility('actions')}
													className="mr-2"
												/>
												Actions
											</label>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="w-full">
					<thead className="bg-gray-50 border-b border-gray-200">
						<tr>
							{visibleColumns.teacher && (
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
									Teacher
								</th>
							)}
							{visibleColumns.courseName && (
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
									Course Name
								</th>
							)}
							{visibleColumns.description && (
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
									Description
								</th>
							)}
							{visibleColumns.status && (
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
									Status
								</th>
							)}
							{visibleColumns.createdAt && (
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
									Created At
								</th>
							)}
							{visibleColumns.actions && (
								<th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
									Actions
								</th>
							)}
						</tr>
					</thead>
					<tbody className="bg-white">
						{currentItems.map((course, index) => (
							<tr key={course.id} className="border-b border-gray-100">
								{visibleColumns.teacher && (
									<td className="px-6 py-4 text-sm text-gray-900">
										{course.teacher?.firstName || course.teacher?.lastName
											? [course.teacher.firstName, course.teacher.lastName]
													.filter(Boolean)
													.join(' ')
											: (course.teacher?.name ?? 'Unknown Teacher')}
									</td>
								)}
								{visibleColumns.courseName && (
									<td className="px-6 py-4 text-sm text-gray-900">
										{course.title}
									</td>
								)}
								{visibleColumns.description && (
									<td className="px-6 py-4 text-sm text-gray-500 max-w-[300px] truncate">
										{course.description}
									</td>
								)}
								{visibleColumns.status && (
									<td className="px-6 py-4">
										<StatusBadge status={course.status} />
									</td>
								)}
								{visibleColumns.createdAt && (
									<td className="px-6 py-4 text-sm text-gray-500">
										{(() => {
											if (course.createAt) {
												return new Date(course.createAt).toLocaleDateString();
											}
											if (course.updateAt) {
												return (
													new Date(course.updateAt).toLocaleDateString() +
													' (updated)'
												);
											}
											return '-';
										})()}
									</td>
								)}
								{visibleColumns.actions && (
									<td className="px-6 py-4">
										<CourseActionsDropdown
											courseId={course.id}
											status={course.status}
											onStatusUpdate={handleStatusUpdate}
											onViewDetails={handleViewDetails}
											position={getDropdownPosition(index)}
										/>
									</td>
								)}
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
