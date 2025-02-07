'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

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
		<div className="flex gap-4 items-start mt-6 max-md:max-w-full">
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
	);
};

export default Comment;
