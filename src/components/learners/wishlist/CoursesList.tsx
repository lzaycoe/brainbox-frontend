'use client';

import React from 'react';

import CourseItem from './CourseItem';

const courses = [
	{
		id: 1,
		title: 'The Ultimate Drawing Course - Beginner to Advanced',
		rating: 4.6,
		reviews: 451444,
		instructors: ['Harry Potter', 'John Wick'],
		price: 37.0,
		originalPrice: 49.0,
		image: '/app/card-img-template.png',
	},
	{
		id: 2,
		title: 'Digital Marketing Masterclass - 23 Courses in 1',
		rating: 4.8,
		reviews: 451444,
		instructors: ['Nobody'],
		price: 24.0,
		image: '/app/card-img-template.png',
	},
	{
		id: 3,
		title: 'Angular - The Complete Guide (2025 Edition)',
		rating: 4.7,
		reviews: 451444,
		instructors: ['Kevin Gilbert'],
		price: 13.0,
		image: '/app/card-img-template.png',
	},
];

const WishlistHeader = () => (
	<header className="grid grid-cols-[45%_5%_20%_30%] items-center px-6 py-5 bg-white border-b border-gray-200 text-sm font-medium text-black uppercase w-full">
		<h2 className="text-left">Course</h2>
		<div></div>
		<h2 className="text-left">Prices</h2>
		<h2 className="text-left">Action</h2>
	</header>
);

const CoursesList = () => {
	return (
		<div>
			<h1 className="text-2xl font-semibold mt-8">
				Wishlist <span className="font-normal">({courses.length})</span>
			</h1>
			<section className="flex flex-col justify-center items-center pb-6 mt-6 bg-white border border-gray-100">
				<WishlistHeader />

				{courses.map((course, index) => (
					<div key={course.id} className="w-full">
						<CourseItem course={course} />
						{index < courses.length - 1 && (
							<hr className="mt-6 mx-auto w-[1220px] border-gray-200" />
						)}
					</div>
				))}
			</section>
		</div>
	);
};

export default CoursesList;
