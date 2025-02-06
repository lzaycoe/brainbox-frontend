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
	const stars = Array.from({ length: 5 }, (_, index) => index < rating);

	return (
		<div className="flex flex-wrap gap-4 justify-center items-start mt-6 max-md:max-w-full">
			<Image
				loading="lazy"
				src={profileImage}
				alt={`Profile picture of ${name}`}
				width={40} // Adjust the width as needed
				height={40} // Adjust the height as needed
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
						className="flex items-start self-start mt-2"
						role="img"
						aria-label={`${rating} out of 5 stars rating`}
					>
						{stars.map((filled, index) => (
							<span
								key={index}
								className={`flex shrink-0 w-4 h-4 ${filled ? 'bg-yellow-500' : 'bg-gray-300'}`}
								aria-hidden="true"
							></span>
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
