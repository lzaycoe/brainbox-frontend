'use client';

import { useEffect, useState } from 'react';

import Loading from '@/components/commons/Loading';
import TeacherCard from '@/components/learners/home/TeacherCard';
import { User } from '@/schemas/user.schema';
import { getTopTeachers } from '@/services/api/user';
import { getTotalStudentsForTeacher } from '@/services/custom/user/getTotalStudentsForTeacher';

interface TeacherCardProps {
	id: number;
	imageUrl: string;
	title: string;
	major: string;
	rating: number;
	students: number;
}

const ListTeacherByCategory: React.FC = () => {
	const [teachers, setTeachers] = useState<User[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchTeachers = async () => {
			try {
				const data = await getTopTeachers(10);

				const teachersWithStudents = data
					? await Promise.all(
							data.map(async (teacher) => {
								const students = await getTotalStudentsForTeacher(teacher.id);
								return { ...teacher, students };
							}),
						)
					: [];

				setTeachers(teachersWithStudents);
			} catch (error) {
				console.error('Error fetching teachers:', error);
				setTeachers([]);
			} finally {
				setLoading(false);
			}
		};

		fetchTeachers();
	}, []);

	const transformLectureToCardProps = (teacher: User): TeacherCardProps => {
		const clerkUser = teacher.clerkUser ?? {};
		const firstName = clerkUser.firstName ?? teacher.firstName ?? '';
		const lastName = clerkUser.lastName ?? teacher.lastName ?? '';
		const fullName =
			firstName || lastName ? `${firstName} ${lastName}`.trim() : 'Unknown';
		const imageUrl =
			clerkUser.imageUrl ??
			teacher.imageUrl ??
			'/app/teacher-img-placeholder.png';

		return {
			id: teacher.id,
			imageUrl,
			title: fullName,
			major: 'Software Engineering',
			rating: 0.0,
			students: teacher.students ?? 0,
		};
	};

	const renderTeacherGridContent = () => {
		if (loading) {
			return (
				<div className="col-span-5 flex justify-center">
					<Loading />
				</div>
			);
		}

		if (!teachers || teachers.length === 0) {
			return (
				<p className="col-span-5 text-center text-red-500">No teachers found</p>
			);
		}

		return teachers.map((teacher) => {
			const cardProps = transformLectureToCardProps(teacher);
			return (
				<TeacherCard
					key={teacher.id}
					avatarUrl={cardProps.imageUrl}
					name={cardProps.title}
					major={cardProps.major}
					rating={cardProps.rating}
					students={cardProps.students}
				/>
			);
		});
	};

	return (
		<section className="flex flex-col items-center py-10">
			<div className="w-full max-w-7xl px-4">
				<div className="grid grid-cols-5 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
					{renderTeacherGridContent()}
				</div>
			</div>
		</section>
	);
};

export default ListTeacherByCategory;
