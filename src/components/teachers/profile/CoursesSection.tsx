import Image from 'next/image';
import React from 'react';

import Comment from './Comment';

const courses = [
	{
		id: 1,
		title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science',
		price: 57,
		category: 'Developments',
		rating: 5.0,
		students: '265.7K',
		imageSrc: '/app/teacher/course01.png',
	},
	{
		id: 2,
		title: 'Selenium WebDriver with Java -Basics to Advanced+Frameworks',
		price: 57,
		category: 'Business',
		rating: 5.0,
		students: '265.7K',
		imageSrc: '/app/teacher/course02.png',
	},
	{
		id: 3,
		title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science',
		price: 57,
		category: 'Developments',
		rating: 5.0,
		students: '265.7K',
		imageSrc: '/app/teacher/course01.png',
	},
	{
		id: 4,
		title: 'Selenium WebDriver with Java -Basics to Advanced+Frameworks',
		price: 57,
		category: 'Business',
		rating: 5.0,
		students: '265.7K',
		imageSrc: '/app/teacher/course02.png',
	},
	{
		id: 5,
		title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science',
		price: 57,
		category: 'Developments',
		rating: 5.0,
		students: '265.7K',
		imageSrc: '/app/teacher/course01.png',
	},
	{
		id: 6,
		title: 'Selenium WebDriver with Java -Basics to Advanced+Frameworks',
		price: 57,
		category: 'Business',
		rating: 5.0,
		students: '265.7K',
		imageSrc: '/app/teacher/course02.png',
	},
	{
		id: 7,
		title: 'Machine Learning A-Z™: Hands-On Python & R In Data Science',
		price: 57,
		category: 'Developments',
		rating: 5.0,
		students: '265.7K',
		imageSrc: '/app/teacher/course01.png',
	},
];

const comments = [
	{
		name: 'Guy Hawkins',
		profileImage: '/app/teacher/avt1.png',
		timeAgo: '1 week ago',
		content:
			'I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako.',
		rating: 5,
	},
	{
		name: 'Dianne Russell',
		profileImage: '/app/teacher/avt2.png',
		timeAgo: '51 mins ago',
		content:
			'This course is just amazing! Great course content, best practices, and a lot of real-world knowledge. Highly recommend this course!',
		rating: 5,
	},
	// Other comments here...
];

const CourseSection: React.FC = () => {
	return (
		<div
			className="flex flex-col max-w-[872px]"
			role="region"
			aria-label="Course and Student Feedback Section"
		>
			<div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
				<h2 className="self-stretch my-auto text-2xl font-semibold tracking-tight leading-none text-neutral-800">
					Courses
				</h2>
				<div
					className="overflow-hidden self-stretch px-5 py-3 my-auto text-base text-gray-600 bg-white border border-gray-200 border-solid w-[200px] max-md:pr-5"
					role="status"
					aria-label="Overall Rating"
				>
					5 Star Rating
				</div>
			</div>

			<div className="flex flex-wrap gap-6 items-start">
				{courses.map((course) => (
					<div
						key={course.id}
						className="flex flex-col justify-center pb-5 bg-white border border-gray-200 border-solid min-w-[240px] w-[424px] max-md:max-w-full"
						role="article"
					>
						<Image
							loading="lazy"
							src={course.imageSrc}
							alt={`${course.title} Cover Image`}
							width={424}
							height={312}
							className="object-contain max-w-full shadow-sm"
						/>
						<div className="flex flex-col justify-center items-center mt-4 w-full max-w-[424px] max-md:max-w-full">
							<div className="flex gap-10 justify-between items-center px-5 w-full whitespace-nowrap max-md:max-w-full">
								<div
									className="gap-2.5 self-stretch px-2 py-1.5 my-auto text-xs font-medium leading-none text-indigo-800 uppercase bg-violet-100"
									role="badge"
								>
									{course.category}
								</div>
								<div className="self-stretch my-auto text-2xl font-semibold tracking-tight leading-none text-orange-500">
									${course.price}
								</div>
							</div>
							<h2 className="mt-2 text-lg font-medium leading-6 text-neutral-800">
								{course.title}
							</h2>
						</div>
						<div
							className="mt-4 max-w-full bg-gray-200 border border-gray-200 border-solid min-h-[1px] w-[424px]"
							role="separator"
							aria-hidden="true"
						></div>
						<div className="flex gap-10 justify-between items-center px-5 mt-4 w-full text-base max-w-[424px] max-md:max-w-full">
							<div
								className="flex gap-1.5 items-center self-stretch my-auto font-medium leading-none text-gray-600 whitespace-nowrap"
								role="status"
								aria-label="Course rating"
							>
								<svg
									className="w-6 h-6 text-yellow-400"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
								</svg>
								<span>{course.rating}</span>
							</div>
							<div
								className="flex gap-1.5 items-center self-stretch my-auto"
								role="status"
								aria-label="Number of students"
							>
								<svg
									className="w-6 h-6 text-gray-400"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
								</svg>
								<span className="font-medium text-gray-600">
									{course.students}
								</span>
								<span className="text-gray-400">students</span>
							</div>
						</div>
					</div>
				))}
			</div>

			<div
				className="flex flex-col max-w-[872px]"
				role="region"
				aria-label="Student Feedback Section"
			>
				<h2 className="self-stretch my-auto text-2xl font-semibold tracking-tight leading-none text-neutral-800">
					Students Feedback
				</h2>
				{comments.map((comment, index) => (
					<React.Fragment key={index}>
						<Comment
							name={comment.name}
							profileImage={comment.profileImage}
							timeAgo={comment.timeAgo}
							content={comment.content}
							rating={comment.rating}
						/>
						<hr className="mt-6 w-full bg-gray-200 border border-gray-200 border-solid min-h-[1px]" />
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default CourseSection;
