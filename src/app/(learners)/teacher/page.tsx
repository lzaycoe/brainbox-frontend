'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

import Loading from '@/components/commons/Loading';
import PaginationCustom from '@/components/commons/PaginationCustom';
import SearchAndFilter from '@/components/commons/SearchAndFilter';
import NavigationBar from '@/components/commons/learners/NavigationBar';
import Profile from '@/components/commons/learners/Profile';
import TeacherCard from '@/components/learners/home/TeacherCard';
import { getCourse } from '@/services/api/course';
import { getProgressByUserId } from '@/services/api/progress';
import { getUserByClerkId, getUserClerk } from '@/services/api/user';
import { getTotalStudentsForTeacher } from '@/services/custom/user/getTotalStudentsForTeacher';

interface TeacherCardProps {
	id: number;
	imageUrl: string;
	title: string;
	major: string;
	rating: number;
	students: number;
}

const ListTeacherCard: React.FC = () => {
	const [teachersData, setTeachersData] = useState<TeacherCardProps[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState('');
	const teachersPerPage = 15;
	const [loading, setLoading] = useState(true);

	const [userId, setUserId] = useState<number | null>(null);
	const { user } = useUser();

	const fetchUser = async () => {
		try {
			if (!user) {
				throw new Error('User is undefined');
			}

			const response = await getUserByClerkId(user?.id);
			setUserId(response.id);
		} catch (error) {
			console.error('Failed to fetch user metadata:', error);
			setUserId(null);
		}
	};

	const fetchTeachersData = async () => {
		setLoading(true);
		try {
			if (!userId) {
				return;
			}

			const progressData = await getProgressByUserId(userId);

			if (progressData.length > 0) {
				const uniqueTeacherIds = new Set<number>();

				const teacherPromises = progressData.map(
					async (progress: { courseId: number }) => {
						const courseData = await getCourse(progress.courseId);

						const teacherId = courseData.teacherId;

						if (uniqueTeacherIds.has(teacherId)) return null;

						uniqueTeacherIds.add(teacherId);

						const teacherResponse = await getUserClerk(teacherId);
						const teacherInfo = teacherResponse;

						const totalStudents = await getTotalStudentsForTeacher(teacherId);

						return {
							id: teacherInfo.id,
							imageUrl: teacherInfo.imageUrl ?? '',
							title: teacherInfo.firstName + ' ' + teacherInfo.lastName,
							major: 'BrainBox Teacher',
							rating: 0,
							students: totalStudents,
						};
					},
				);

				const teachers = (await Promise.all(teacherPromises)).filter(
					(teacher) => teacher !== null,
				) as TeacherCardProps[];

				setTeachersData(teachers);
			}
		} catch (error) {
			console.error('Error fetching teachers data:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!userId) {
			fetchUser();
		} else {
			fetchTeachersData();
		}
	}, [userId]);

	const indexOfLastTeacher = currentPage * teachersPerPage;
	const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;

	const filteredTeacher = teachersData.filter((teachers) => {
		const matchesSearchQuery = teachers.title
			.toLowerCase()
			.includes(searchQuery.toLowerCase());

		return matchesSearchQuery;
	});

	const currentTeacher = filteredTeacher.slice(
		indexOfFirstTeacher,
		indexOfLastTeacher,
	);
	const totalPages = Math.ceil(filteredTeacher.length / teachersPerPage);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

	if (loading) {
		return <Loading />;
	}

	return (
		<>
			<Profile />
			<NavigationBar />
			<div className="flex flex-col justify-center items-center w-full px-6">
				<div className="w-full max-w-[1245px] mb-6 mt-10">
					<SearchAndFilter
						totalItems={filteredTeacher.length}
						onSearch={setSearchQuery}
						totalLabel="Teachers"
						inputPlaceholder="Search for teachers..."
					></SearchAndFilter>
					{filteredTeacher.length === 0 ? (
						<div className="mt-10 text-xl text-gray-500">
							No teachers found for your search.
						</div>
					) : (
						<>
							<div className="w-full max-w-[1245px] mb-6 grid grid-cols-5 gap-6 max-md:grid-cols-1 mt-10">
								{currentTeacher.map((teacherData) => (
									<TeacherCard
										key={teacherData.id}
										avatarUrl={teacherData.imageUrl}
										name={teacherData.title}
										major={teacherData.major}
										rating={teacherData.rating}
										students={teacherData.students}
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
			</div>
		</>
	);
};

export default ListTeacherCard;
