'use client';

import React, { useState } from 'react';
import { ImCool } from 'react-icons/im';
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';

import ContentCard from './ContentCard';
import CourseItem from './CourseItem';

const orderDataList = [
	{
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
				title: 'Mega Digital Marketing Course A-Z',
				rating: 4.7,
				reviews: 451444,
				instructors: ['Esther Howard'],
				price: 49.0,
				originalPrice: 99.0,
				image: '/app/course/course02.png',
			},
		],
	},
	{
		date: '5th February, 2025 at 09:15 AM',
		courses: 1,
		totalPrice: '$19.99',
		paymentMethod: 'PayPal',
		user: 'Alice Johnson',
		cardNumber: 'PayPal Account',
		expiryDate: '',
		items: [
			{
				id: 3,
				title: 'Mastering React for Web Development',
				rating: 4.8,
				reviews: 321000,
				instructors: ['Jacob Smith'],
				price: 19.99,
				image: '/app/course/course03.png',
			},
		],
	},
	{
		date: '20th March, 2025 at 07:45 PM',
		courses: 3,
		totalPrice: '$89.99',
		paymentMethod: 'Credit Card',
		user: 'John Doe',
		cardNumber: '4142 **** **** ****',
		expiryDate: '12/26',
		items: [
			{
				id: 4,
				title: 'Full-Stack Web Development Bootcamp',
				rating: 4.9,
				reviews: 500000,
				instructors: ['Emily Davis'],
				price: 29.99,
				image: '/app/course/course04.png',
			},
			{
				id: 5,
				title: 'Advanced JavaScript Concepts',
				rating: 4.7,
				reviews: 210000,
				instructors: ['Michael Lee'],
				price: 30.0,
				image: '/app/course/course01.png',
			},
			{
				id: 6,
				title: 'UI/UX Design Masterclass',
				rating: 4.6,
				reviews: 180000,
				instructors: ['Sarah Wilson'],
				price: 30.0,
				image: '/app/course/course02.png',
			},
		],
	},
];

interface SummaryProps {
	user: string;
	cardNumber: string;
	expiryDate: string;
	order: {
		date: string;
		courses: number;
		totalPrice: string;
		paymentMethod: string;
	};
}

const Summary: React.FC<SummaryProps> = ({
	user,
	cardNumber,
	expiryDate,
	order,
}) => (
	<aside className="bg-white w-full max-w-[500px] p-6 text-black flex-shrink-0 flex flex-col relative">
		<div className="absolute top-0 left-0 w-[1px] h-[calc(100%+40px)] bg-gray-300"></div>
		<div className="text-left">
			<ContentCard
				date={order.date}
				courses={order.courses}
				totalPrice={order.totalPrice}
				paymentMethod={order.paymentMethod}
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
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleContent = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className="w-full mt-10">
			<h2 className="text-[#1D2026] text-2xl font-semibold leading-8 break-words mb-6 text-left">
				Purchase History
			</h2>

			{orderDataList.map((order, index) => (
				<article
					key={order.date} // Sửa key ở đây
					className="flex flex-col items-center py-6 bg-white border border-solid shadow-lg border-[#E9EAF0] relative mb-6"
				>
					<button
						className="flex items-center justify-between w-full relative text-left focus:outline-none p-0 m-0 bg-transparent border-0"
						onClick={() => toggleContent(index)}
						aria-expanded={openIndex === index}
					>
						<ContentCard
							date={order.date}
							courses={order.courses}
							totalPrice={order.totalPrice}
							paymentMethod={order.paymentMethod}
							isOpen={openIndex === index}
						/>

						<div
							className={`flex items-center justify-center w-12 h-12 rounded-md shadow-md mr-5 ${
								openIndex === index ? 'bg-orange-500' : 'bg-gray-100'
							}`}
						>
							{openIndex === index ? (
								<IoMdArrowUp className="text-white text-2xl" />
							) : (
								<IoMdArrowDown className="text-[#1D2026] text-2xl" />
							)}
						</div>
					</button>

					{openIndex === index && (
						<>
							<hr className="self-stretch mt-6 w-full bg-gray-200 border-0 h-px" />

							<section className="flex gap-10 justify-between items-center w-full max-w-[1272px]">
								<div className="w-full max-w-[calc(100%-350px-40px)]">
									{order.items.map((course) => (
										<CourseItem key={course.id} course={course} />
									))}
								</div>

								<Summary
									user={order.user}
									cardNumber={order.cardNumber}
									expiryDate={order.expiryDate}
									order={order}
								/>
							</section>
						</>
					)}
				</article>
			))}

			<div className="text-center text-[#1D2026] text-base font-normal leading-6 break-words mt-10 flex items-center justify-center gap-2">
				<span>Yay! You have seen all your purchase history.</span>
				<ImCool size={22} />
			</div>
		</section>
	);
};

export default Content;
