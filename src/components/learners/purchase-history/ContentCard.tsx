import React from 'react';
import { FaIdCard } from 'react-icons/fa6';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

interface ContentCardProps {
	date: string;
	courses: number;
	totalPrice: string;
	paymentMethod: string;
}

const ContentCard = ({
	date,
	courses,
	totalPrice,
	paymentMethod,
}: ContentCardProps) => (
	<header className="pl-6">
		<h2 className="text-lg tracking-tight leading-none text-black">{date}</h2>
		<div className="flex gap-4 items-start mt-3 text-sm tracking-normal leading-loose text-black">
			<span className="flex items-center gap-1">
				<MdOutlineVideoLibrary className="text-xl text-blue-900" />
				{courses} Courses
			</span>
			<span className="flex items-center gap-1">
				<RiMoneyDollarCircleLine className="text-xl text-orange-500" />
				{totalPrice}
				{' USD'}
			</span>
			<span className="flex items-center gap-1">
				<FaIdCard className="text-xl text-green-500" />
				{paymentMethod}
			</span>
		</div>
	</header>
);

export default ContentCard;
