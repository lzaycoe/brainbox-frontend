import React from 'react';

import CourseCard from '@/components/commons/CourseCard';

const ListCourseCard: React.FC = () => {
	const courses = [
		{
			id: 1,
			imageUrl: '/app/card-img-template.png',
			category: 'Design',
			price: '$57',
			title: 'Machine Learning A-Z™: Hands-On Python & R In Data',
			rating: '5.0',
			students: '265.7K',
			categoryBgColor: 'bg-rose-100',
			categoryTextColor: 'text-orange-800',
		},
		{
			id: 2,
			imageUrl: '/app/card-img-template.png',
			category: 'Business',
			price: '$45',
			title: 'The Complete Business Plan Course',
			rating: '4.8',
			students: '150.3K',
			categoryBgColor: 'bg-green-100',
			categoryTextColor: 'text-green-800',
		},
		{
			id: 3,
			imageUrl: '/app/card-img-template.png',
			category: 'Finance',
			price: '$65',
			title: 'Financial Analysis and Modeling',
			rating: '4.9',
			students: '200.5K',
			categoryBgColor: 'bg-blue-100',
			categoryTextColor: 'text-blue-800',
		},
		{
			id: 4,
			imageUrl: '/app/card-img-template.png',
			category: 'Marketing',
			price: '$50',
			title: 'Digital Marketing Masterclass',
			rating: '4.7',
			students: '180.2K',
			categoryBgColor: 'bg-yellow-100',
			categoryTextColor: 'text-yellow-800',
		},
		{
			id: 5,
			imageUrl: '/app/card-img-template.png',
			category: 'IT & Software',
			price: '$70',
			title: 'Complete IT & Software Course',
			rating: '4.6',
			students: '220.1K',
			categoryBgColor: 'bg-purple-100',
			categoryTextColor: 'text-purple-800',
		},
		{
			id: 6,
			imageUrl: '/app/card-img-template.png',
			category: 'Personal Development',
			price: '$40',
			title: 'Personal Development Mastery',
			rating: '4.5',
			students: '130.4K',
			categoryBgColor: 'bg-pink-100',
			categoryTextColor: 'text-pink-800',
		},
		{
			id: 7,
			imageUrl: '/app/card-img-template.png',
			category: 'Health & Fitness',
			price: '$55',
			title: 'Complete Health & Fitness Guide',
			rating: '4.8',
			students: '170.6K',
			categoryBgColor: 'bg-red-100',
			categoryTextColor: 'text-red-800',
		},
		{
			id: 8,
			imageUrl: '/app/card-img-template.png',
			category: 'Music',
			price: '$60',
			title: 'Music Production Masterclass',
			rating: '4.9',
			students: '140.9K',
			categoryBgColor: 'bg-orange-100',
			categoryTextColor: 'text-orange-800',
		},
		{
			id: 9,
			imageUrl: '/app/card-img-template.png',
			category: 'Photography',
			price: '$75',
			title: 'Photography & Video Mastery',
			rating: '4.7',
			students: '160.8K',
			categoryBgColor: 'bg-teal-100',
			categoryTextColor: 'text-teal-800',
		},
		{
			id: 10,
			imageUrl: '/app/card-img-template.png',
			category: 'Lifestyle',
			price: '$35',
			title: 'Complete Lifestyle Guide',
			rating: '4.6',
			students: '120.7K',
			categoryBgColor: 'bg-indigo-100',
			categoryTextColor: 'text-indigo-800',
		},
	];

	return (
		<section className="flex flex-col items-center bg-[#F5F7FA] py-10">
			<h2 className="text-3xl font-semibold text-center mb-8">
				Best selling courses
			</h2>
			<div className="grid grid-cols-5 gap-6 max-md:grid-cols-1">
				{courses.map((course) => (
					<CourseCard key={course.id} {...course} />
				))}
			</div>
		</section>
	);
};

export default ListCourseCard;
