import { Button } from '../../ui/button';
import React from 'react';
import { PiArrowRight } from 'react-icons/pi';

import CourseCardLandscape from './CourseCardLandscape';

const ListCourseCardLandscape: React.FC = () => {
	const courses = [
		{
			imageUrl: '/app/card-img-template.png',
			category: 'Productivity',
			categoryBgColor: 'bg-slate-100',
			categoryTextColor: 'text-neutral-800',
			price: '$14.00',
			discountedPrice: '$26.00',
			title: 'Adobe XD for Web Design: Essential Principles',
			teacherAvatar: '/app/teacher-avatar-template.png',
			teacherName: 'Kevin Gilbert',
			rating: '5.0',
			students: '357,914',
			duration: '6 hours',
		},
		{
			imageUrl: '/app/card-img-template.png',
			category: 'Design',
			categoryBgColor: 'bg-blue-100',
			categoryTextColor: 'text-blue-800',
			price: '$20.00',
			discountedPrice: '$40.00',
			title: 'Mastering Photoshop for Beginners',
			teacherAvatar: '/app/teacher-avatar-template.png',
			teacherName: 'Jane Doe',
			rating: '4.8',
			students: '200,000',
			duration: '8 hours',
		},
		{
			imageUrl: '/app/card-img-template.png',
			category: 'Marketing',
			categoryBgColor: 'bg-green-100',
			categoryTextColor: 'text-green-800',
			price: '$30.00',
			discountedPrice: '$60.00',
			title: 'Digital Marketing Strategies',
			teacherAvatar: '/app/teacher-avatar-template.png',
			teacherName: 'John Smith',
			rating: '4.9',
			students: '150,000',
			duration: '10 hours',
		},
		{
			imageUrl: '/app/card-img-template.png',
			category: 'Development',
			categoryBgColor: 'bg-red-100',
			categoryTextColor: 'text-red-800',
			price: '$25.00',
			discountedPrice: '$50.00',
			title: 'JavaScript Essentials',
			teacherAvatar: '/app/teacher-avatar-template.png',
			teacherName: 'Alice Johnson',
			rating: '4.7',
			students: '300,000',
			duration: '12 hours',
		},
	];

	return (
		<section className="flex flex-col items-center py-10">
			<h2 className="text-3xl font-semibold text-center mb-8">
				Our feature courses
			</h2>
			<div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
				{courses.map((course, index) => (
					<CourseCardLandscape key={index} {...course} />
				))}
			</div>
			<Button className="flex gap-3 justify-center items-center px-6 text-base font-semibold tracking-normal leading-none text-orange-500 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500 mt-8 capitalize">
				<div className="self-stretch my-auto">Browse all Courses</div>
				<PiArrowRight
					className="flex shrink-0 self-stretch my-auto w-6 h-6"
					aria-hidden="true"
				/>
			</Button>
		</section>
	);
};

export default ListCourseCardLandscape;
