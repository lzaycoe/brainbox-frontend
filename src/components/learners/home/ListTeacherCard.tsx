'use client';

import { useEffect, useState } from 'react';
import { PiArrowRight } from 'react-icons/pi';

import Loading from '@/components/commons/Loading';
import TeacherCard from '@/components/learners/home/TeacherCard';
import { Button } from '@/components/ui/button';
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

const ListTeacherCard: React.FC = () => {
	const [teachers, setTeachers] = useState<User[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchTeachers = async () => {
			try {
				const data = await getTopTeachers(5);

				const teachersWithStudents = data
					? await Promise.all(
							data.map(async (teacher) => {
								const students = await getTotalStudentsForTeacher(teacher.id);
								return { ...teacher, students };
							}),
						)
					: [];

				const sortedTeachers = [...teachersWithStudents].sort(
					(a, b) => (b.students || 0) - (a.students || 0),
				);

				setTeachers(sortedTeachers);
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
			<h2 className="text-3xl font-semibold text-center mb-8">
				Top teachers of the month
			</h2>
			<div className="grid grid-cols-5 gap-6 max-md:grid-cols-1">
				{renderTeacherGridContent()}
			</div>
			<div className="flex gap-3 items-center mt-10 text-sm tracking-normal text-center">
				<p className="self-stretch my-auto leading-loose text-gray-600">
					Thousands of students waiting for a teacher. Start teaching & earning
					now!
				</p>
				<Button
					className="flex gap-2 justify-center items-center self-stretch py-1 my-auto font-medium leading-none text-orange-500 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
					aria-label="Become Instructor"
				>
					<span className="self-stretch my-auto">Become a Teacher</span>
					<PiArrowRight
						className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
						width={24}
						height={24}
					/>
				</Button>
			</div>
		</section>
	);
};

export default ListTeacherCard;
