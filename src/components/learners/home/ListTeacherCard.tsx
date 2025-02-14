import { Button } from '../../ui/button';
import React from 'react';
import { PiArrowRight } from 'react-icons/pi';

import TeacherCard from './TeacherCard';

const ListTeacherCard: React.FC = () => {
	const teachers = [
		{
			id: 1,
			avatarUrl: '/app/teacher-img-placeholder.png',
			name: 'Alice Johnson',
			major: 'Senior Developer',
			rating: '4.8',
			students: '1,200',
		},
		{
			id: 2,
			avatarUrl: '/app/teacher-img-placeholder.png',
			name: 'Bob Smith',
			major: 'Data Scientist',
			rating: '4.7',
			students: '950',
		},
		{
			id: 3,
			avatarUrl: '/app/teacher-img-placeholder.png',
			name: 'Charlie Brown',
			major: 'UX Designer',
			rating: '4.9',
			students: '1,500',
		},
		{
			id: 4,
			avatarUrl: '/app/teacher-img-placeholder.png',
			name: 'Diana Prince',
			major: 'Marketing Expert',
			rating: '4.6',
			students: '800',
		},
		{
			id: 5,
			avatarUrl: '/app/teacher-img-placeholder.png',
			name: 'Evan Wright',
			major: 'Project Manager',
			rating: '4.7',
			students: '1,100',
		},
	];

	return (
		<section className="flex flex-col items-center py-10">
			<h2 className="text-3xl font-semibold text-center mb-8">
				Top instructor of the month
			</h2>
			<div className="grid grid-cols-5 gap-6 max-md:grid-cols-1">
				{teachers.map((teacher) => (
					<TeacherCard key={teacher.id} {...teacher} />
				))}
			</div>
			<div className="flex gap-3 items-center mt-10 text-sm tracking-normal text-center">
				<p className="self-stretch my-auto leading-loose text-gray-600">
					Thousands of students waiting for a instructor. Start teaching &
					earning now!.
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
