/*
 *  ======================================================================
 *  Copyright (C) 2025 - lzaycoe (Lazy Code)
 *  ======================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  ======================================================================
 */
'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { TbLoader } from 'react-icons/tb';

import CourseCard from '@/components/learners/home/CourseCard';

/*
 *  ======================================================================
 *  Copyright (C) 2025 - lzaycoe (Lazy Code)
 *  ======================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  ======================================================================
 */

/*
 *  ======================================================================
 *  Copyright (C) 2025 - lzaycoe (Lazy Code)
 *  ======================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  ======================================================================
 */

/*
 *  ======================================================================
 *  Copyright (C) 2025 - lzaycoe (Lazy Code)
 *  ======================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  ======================================================================
 */

/*
 *  ======================================================================
 *  Copyright (C) 2025 - lzaycoe (Lazy Code)
 *  ======================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  ======================================================================
 */

/*
 *  ======================================================================
 *  Copyright (C) 2025 - lzaycoe (Lazy Code)
 *  ======================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  ======================================================================
 */

interface CommentProps {
	name: string;
	profileImage: string;
	timeAgo: string;
	content: string;
	rating: number;
}

const Comment: React.FC<CommentProps> = ({
	name,
	profileImage,
	timeAgo,
	content,
	rating,
}) => {
	return (
		<div>
			<div className="flex flex-col gap-6 mt-6">
				<div className="flex gap-4 items-start max-md:max-w-full">
					<Image
						loading="lazy"
						src={profileImage}
						alt={`Profile picture of ${name}`}
						width={40}
						height={40}
						className="object-contain shrink-0 w-10 rounded-full aspect-square"
					/>
					<div className="flex flex-col min-w-[240px] w-[808px] max-md:max-w-full">
						<div className="flex flex-col self-start">
							<div className="flex gap-2 items-center text-xs leading-none text-gray-500">
								<span className="self-stretch my-auto text-sm font-medium tracking-normal leading-none text-right text-neutral-800">
									{name}
								</span>
								<span
									className="self-stretch my-auto text-right"
									aria-hidden="true"
								>
									•
								</span>
								<time className="self-stretch my-auto">{timeAgo}</time>
							</div>
							<div
								className="flex items-center mt-2"
								role="img"
								aria-label={`${rating} out of 5 stars rating`}
							>
								{Array.from({ length: 5 }, (_, index) => (
									<Star
										key={index}
										size={16}
										className={
											index < rating
												? 'text-yellow-500 fill-yellow-500'
												: 'text-gray-300'
										}
									/>
								))}
							</div>
						</div>
						<p className="mt-3 text-sm tracking-normal leading-6 text-gray-600 max-md:max-w-full">
							{content}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

const CourseSection: React.FC = () => {
	const courses = [
		{
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
			imageUrl: '/app/card-img-template.png',
			category: 'Lifestyle',
			price: '$35',
			title: 'Complete Lifestyle Guide',
			rating: '4.6',
			students: '120.7K',
			categoryBgColor: 'bg-indigo-100',
			categoryTextColor: 'text-indigo-800',
		},
		{
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

	const comments = [
		{
			name: 'Guy Hawkins',
			profileImage: '/app/teacher/avt1.png',
			timeAgo: '1 week ago',
			content:
				'I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako.',
			rating: 5.0,
		},
		{
			name: 'Dianne Russell',
			profileImage: '/app/teacher/avt2.png',
			timeAgo: '51 mins ago',
			content:
				'This course is just amazing! Great course content, best practices, and a lot of real-world knowledge. Highly recommend this course!',
			rating: 4.0,
		},
		{
			name: 'Guy Hawkins',
			profileImage: '/app/teacher/avt1.png',
			timeAgo: '1 week ago',
			content:
				'I appreciate the precise short videos (10 mins or less each) because overly long videos tend to make me lose focus. The instructor is very knowledgeable in Web Design and it shows as he shares his knowledge. These were my best 6 months of training. Thanks, Vako.',
			rating: 3.0,
		},
	];

	const [selectedRating, setSelectedRating] = useState<string>('All Ratings');
	const [visibleCommentsCount, setVisibleCommentsCount] = useState(2);
	const [activeTab, setActiveTab] = useState<'courses' | 'reviews'>('courses');

	const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedRating(event.target.value);
	};

	const handleLoadMore = () => {
		setVisibleCommentsCount((prevCount) => prevCount + 2);
	};

	const filteredComments = comments.filter((comment) => {
		if (selectedRating === 'All Ratings') {
			return true;
		}

		const commentRating = comment.rating;

		if (selectedRating === '5 Star Rating') {
			return commentRating === 5.0;
		} else if (selectedRating === '4 Star Rating') {
			return commentRating === 4.0;
		} else if (selectedRating === '3 Star Rating') {
			return commentRating === 3.0;
		} else if (selectedRating === '2 Star Rating') {
			return commentRating === 2.0;
		} else if (selectedRating === '1 Star Rating') {
			return commentRating === 1.0;
		}

		return true;
	});

	const visibleComments = filteredComments.slice(0, visibleCommentsCount);

	return (
		<div
			className="flex flex-col max-w-[872px]"
			role="region"
			aria-label="Course and Student Feedback Section"
		>
			<nav className="flex pr-20 text-base font-medium leading-none text-center whitespace-nowrap max-w-[872px] max-md:pr-5">
				<button
					className={`gap-2.5 self-stretch py-5 bg-white shadow-sm text-neutral-800 w-[200px] ${activeTab === 'courses' ? 'border-b-2 border-orange-500' : ''}`}
					onClick={() => setActiveTab('courses')}
				>
					Courses
				</button>
				<hr className="self-start mt-16 mr-0 w-full bg-gray-200 border border-gray-200 border-solid min-h-px max-md:mt-10 max-md:max-w-full" />
				<button
					className={`gap-2.5 self-stretch py-5 text-gray-600 w-[200px] ${activeTab === 'reviews' ? 'border-b-2 border-orange-500' : ''}`}
					onClick={() => setActiveTab('reviews')}
				>
					Review
				</button>
			</nav>

			{activeTab === 'courses' && (
				<h1 className="text-2xl font-bold text-neutral-800 mt-6 mb-6">
					Voka Courses (02)
				</h1>
			)}

			{activeTab === 'courses' && (
				<div className="grid grid-cols-4 gap-4 w-full max-md:grid-cols-1">
					{courses.map((course, index) => (
						<CourseCard key={index} {...course} />
					))}
				</div>
			)}

			{activeTab === 'reviews' && (
				<div
					className="flex flex-col max-w-[872px] mt-6"
					role="region"
					aria-label="Student Feedback Section"
				>
					<div className="flex items-center space-x-4">
						<header className="flex flex-wrap gap-10 justify-between items-center max-w-[872px] w-full">
							<h2 className="text-2xl font-semibold tracking-tight leading-none text-neutral-800">
								Students Feedback
							</h2>
							<select
								className="ml-auto overflow-hidden px-5 py-3 text-base text-gray-600 bg-white border border-solid border-[#E9EAF0] w-[200px] max-md:pr-5"
								value={selectedRating}
								onChange={handleRatingChange}
							>
								<option value="All Ratings">All Ratings</option>
								<option value="5 Star Rating">5 Star Rating</option>
								<option value="4 Star Rating">4 Star Rating</option>
								<option value="3 Star Rating">3 Star Rating</option>
								<option value="2 Star Rating">2 Star Rating</option>
								<option value="1 Star Rating">1 Star Rating</option>
							</select>
						</header>
					</div>

					{visibleComments.map((comment, index) => (
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

					{visibleCommentsCount < filteredComments.length && (
						<button
							className="flex flex-col self-start pt-3 mt-6 text-base font-semibold tracking-normal leading-10 text-orange-500 capitalize"
							aria-label="Load more reviews"
							onClick={handleLoadMore}
						>
							<div className="flex gap-3 justify-center items-center px-6 bg-rose-100 max-md:px-5">
								<span className="self-stretch my-auto">Load more</span>
								<TbLoader className="w-6 h-6 animate-spin text-orange-500" />
							</div>
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default CourseSection;
