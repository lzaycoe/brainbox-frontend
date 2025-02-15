import React from 'react';

import CourseCard from './CourseCard';

const courses = [
	{
		id: 1,
		title: 'Reiki Level I, II and Master/Teacher Program',
		thumbnail: '/app/course/course01.png',
		completed: '0%',
	},
	{
		id: 2,
		title: 'The Complete 2021 Web Development Bootcamp',
		thumbnail: '/app/course/course02.png',
		completed: '61%',
	},
	{
		id: 3,
		title: 'Copywriting - Become a Freelance Copywriter',
		thumbnail: '/app/course/course03.png',
		completed: '0%',
	},
	{
		id: 4,
		title: '2021 Complete Python Bootcamp From Zero to Mastery',
		thumbnail: '/app/course/course04.png',
		completed: '12%',
	},
];

const CoursesSection = () => (
	<div className="bg-white p-6 rounded-lg shadow-md max-w-7xl mt-10">
		<h2 className="text-2xl font-semibold">Lets start learning</h2>
		<div className="grid grid-cols-4 gap-6 mt-4">
			{courses.map((course) => (
				<CourseCard key={course.id} {...course} />
			))}
		</div>
	</div>
);

export default CoursesSection;
