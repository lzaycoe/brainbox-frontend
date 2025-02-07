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

import classNames from 'clsx';
import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

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

// Tách phần đánh giá sao ra thành một component riêng biệt
const Rating: React.FC<{ rating: number }> = ({ rating }) => (
	<div
		className="flex items-center"
		role="img"
		aria-label={`${rating} out of 5 stars rating`}
	>
		{Array.from({ length: 5 }, (_, index) => (
			<Star
				key={index}
				size={16}
				className={classNames(
					index < rating ? 'text-yellow-500' : 'text-gray-300',
				)}
			/>
		))}
	</div>
);

const Comment: React.FC<CommentProps> = ({
	name,
	profileImage,
	timeAgo,
	content,
	rating,
}) => {
	return (
		<div className="mt-6">
			<div className="flex gap-4 items-start max-md:max-w-full">
				{/* Avatar */}
				<Image
					loading="lazy"
					src={profileImage}
					alt={`Profile picture of ${name}`}
					width={40}
					height={40}
					className="object-cover rounded-full w-10 h-10"
				/>
				<div className="flex flex-col min-w-[240px] w-full max-md:max-w-full">
					{/* Header: Name, Time, Rating */}
					<div className="flex flex-col self-start">
						<div className="flex gap-2 items-center text-xs text-gray-500">
							<span className="text-sm font-medium text-neutral-800">
								{name}
							</span>
							<span aria-hidden="true">•</span>
							<time>{timeAgo}</time>
						</div>
						<Rating rating={rating} />
					</div>
					{/* Content */}
					<p className="mt-3 text-sm text-gray-600">{content}</p>
				</div>
			</div>
		</div>
	);
};

export default Comment;
