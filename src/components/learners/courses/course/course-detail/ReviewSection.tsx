import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa';

type Review = {
	user: {
		name: string;
		avatar: string;
	};
	rating: number;
	time: string;
	comment: string;
	id: string;
};

interface ReviewSectionProps {
	reviews: Review[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
	const renderStars = (rating: number, reviewId: string) => {
		return Array.from({ length: 5 }).map((_, index) => (
			<FaStar
				key={`star-${reviewId}-${index}`}
				className={`w-4 h-4 ${
					index < rating ? 'text-yellow-400' : 'text-gray-300'
				}`}
			/>
		));
	};

	return (
		<div className="space-y-6">
			{reviews.map((review) => (
				<div
					key={review.id}
					className="flex space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow"
				>
					<div className="shrink-0">
						<Image
							src={review.user.avatar}
							alt={review.user.name}
							width={40}
							height={40}
							className="w-10 h-10 rounded-full object-cover"
						/>
					</div>
					<div className="flex-1 space-y-2">
						<div className="flex justify-between items-center">
							<h4 className="font-semibold text-gray-900">
								{review.user.name}
							</h4>
							<span className="text-sm text-gray-500">{review.time}</span>
						</div>
						<div className="flex items-center gap-0.5">
							{renderStars(review.rating, review.id)}
						</div>
						<p className="text-gray-700 text-sm leading-relaxed">
							{review.comment}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default ReviewSection;
