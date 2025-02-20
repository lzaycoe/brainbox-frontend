'use client';

import React, { useState } from 'react';
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';

import ContentCard from './ContentCard';
import CourseItem from './CourseItem';

const orderData = {
	date: '12th January, 2025 at 11:30 PM',
	courses: 2,
	totalPrice: '$62.99',
	paymentMethod: 'Credit Card',
	user: 'Kevin Gilbert',
	cardNumber: '4142 **** **** ****',
	expiryDate: '04/24',
	items: [
		{
			id: 1,
			title: 'Learn Ethical Hacking From Scratch',
			rating: 4.7,
			reviews: 451444,
			instructors: ['Marvin McKinney'],
			price: 13.99,
			image: '/app/course/course01.png',
		},
		{
			id: 2,
			title: 'Mega Digital Marketing Course A-Z: 12 Courses in 1 + Updates',
			rating: 4.7,
			reviews: 451444,
			instructors: ['Esther Howard'],
			price: 49.0,
			originalPrice: 99.0,
			image: '/app/course/course02.png',
		},
	],
};

interface SummaryProps {
	user: string;
	cardNumber: string;
	expiryDate: string;
}

const Summary: React.FC<SummaryProps> = ({ user, cardNumber, expiryDate }) => (
	<aside className="bg-white w-full max-w-[500px] p-6 text-black flex-shrink-0 flex flex-col relative">
		<div className="absolute top-0 left-0 w-[1px] h-[calc(100%+40px)] bg-gray-300"></div>
		<div className="text-left">
			<ContentCard
				date={orderData.date}
				courses={orderData.courses}
				totalPrice={orderData.totalPrice}
				paymentMethod={orderData.paymentMethod}
			/>
		</div>

		<div className="mt-4 ml-7 flex items-center text-sm gap-7 text-left">
			<span>{user}</span>
			<span>{cardNumber}</span>
			<span className="ml-14">{expiryDate}</span>
		</div>
	</aside>
);

// Main Component
const Content = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleContent = () => {
		setIsOpen(!isOpen);
	};

	return (
		<section className="w-full mt-10">
			<h2 className="text-[#1D2026] text-2xl font-semibold leading-8 break-words mb-6 text-left">
				Purchase History
			</h2>

			<article className="flex flex-col items-center py-6 bg-white border border-solid shadow-lg border-[#E9EAF0] relative">
				<div
					className="flex items-center justify-between w-full relative cursor-pointer"
					onClick={toggleContent}
				>
					<ContentCard
						date={orderData.date}
						courses={orderData.courses}
						totalPrice={orderData.totalPrice}
						paymentMethod={orderData.paymentMethod}
					/>

					<div
						className={`flex items-center justify-center w-12 h-12 rounded-md shadow-md mr-5 ${
							isOpen ? 'bg-orange-500' : 'bg-gray-100'
						}`}
					>
						{isOpen ? (
							<IoMdArrowUp className="text-white text-2xl" />
						) : (
							<IoMdArrowDown className="text-[#1D2026] text-2xl" />
						)}
					</div>
				</div>

				{/* Nội dung này sẽ được ẩn/hiện dựa trên state isOpen */}
				{isOpen && (
					<>
						<hr className="self-stretch mt-6 w-full bg-gray-200 border-0 h-px" />

						<section className="flex gap-10 justify-between items-center w-full max-w-[1272px]">
							<div className="w-full max-w-[calc(100%-350px-40px)]">
								{orderData.items.map((course) => (
									<CourseItem key={course.id} course={course} />
								))}
							</div>

							<Summary
								user={orderData.user}
								cardNumber={orderData.cardNumber}
								expiryDate={orderData.expiryDate}
							/>
						</section>
					</>
				)}
			</article>
		</section>
	);
};

export default Content;
