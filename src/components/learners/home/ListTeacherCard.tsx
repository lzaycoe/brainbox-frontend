'use client';

import { Button } from '../../ui/button';
import { useEffect, useState } from 'react';
import { PiArrowRight } from 'react-icons/pi';

import TeacherCourseCard from '@/components/teachers/courses/TeacherCourseCard';
import { Lecture } from '@/schemas/lecture.schema';
import { getTopTeachers } from '@/services/api/lecture';

interface TeacherCourseCardProps {
	id: number;
	imageUrl: string;
	title: string;
	category: string;
	categoryBgColor: string;
	categoryTextColor: string;
	description: string;
	rating: string;
	students: string;
	originalPrice: string;
}

const ListTeacherCard: React.FC = () => {
	const [teachers, setTeachers] = useState<Lecture[] | null>(null);

	useEffect(() => {
		const fetchTeachers = async () => {
			const data = await getTopTeachers();
			setTeachers(data);
		};
		fetchTeachers();
	}, []);

	const transformLectureToCardProps = (
		teacher: Lecture,
	): TeacherCourseCardProps => {
		const clerkUser = teacher.clerkUser;
		let fullName = 'Unknown';

		if (clerkUser) {
			if (clerkUser.firstName) {
				fullName = clerkUser.lastName
					? `${clerkUser.firstName} ${clerkUser.lastName}`
					: clerkUser.firstName;
			}
		}

		const imageUrl = clerkUser?.imageUrl ?? '/app/teacher-img-placeholder.png';

		return {
			id: teacher.id,
			imageUrl: imageUrl.startsWith('http') ? imageUrl : `/${imageUrl}`,
			title: fullName,
			category: 'Default Category',
			categoryBgColor: '#ffffff',
			categoryTextColor: '#000000',
			description: 'Default description',
			rating: '4.5',
			students: '1,000',
			originalPrice: '0',
		};
	};

	return (
		<section className="flex flex-col items-center py-10">
			<h2 className="text-3xl font-semibold text-center mb-8">
				Top instructor of the month
			</h2>
			<div className="grid grid-cols-5 gap-6 max-md:grid-cols-1">
				{teachers ? (
					teachers.map((teacher) => (
						<TeacherCourseCard
							key={teacher.id}
							{...transformLectureToCardProps(teacher)}
						/>
					))
				) : (
					<p>Loading...</p>
				)}
			</div>
			<div className="flex gap-3 items-center mt-10 text-sm tracking-normal text-center">
				<p className="self-stretch my-auto leading-loose text-gray-600">
					Thousands of students waiting for a instructor. Start teaching &
					earning now!
				</p>
				<Button
					className="flex gap-2 justify-center items-center self-stretch py-1 my-auto font-medium leading-none text-orange-500 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
					aria-label="Browse all categories"
				>
					<span className="self-stretch my-auto">Become Instructor</span>
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
