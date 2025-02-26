import Image from 'next/image';
import React from 'react';
import { IoStar } from 'react-icons/io5';

import WishlistActions from '@/components/learners/wishlist/WishlistActions';

interface Course {
	id: number;
	title: string;
	rating: number;
	reviews: number;
	instructors: string[];
	price: number;
	originalPrice?: number;
	image: string;
}

const CourseItem = ({ course }: { course: Course }) => {
	return (
		<article className="grid grid-cols-[45%_5%_20%_30%] items-center mt-6 max-w-full w-[1272px] px-6">
			<section className="flex gap-5 items-start">
				<Image
					src={course.image}
					alt={course.title}
					className="object-contain w-40"
					width={160}
					height={90}
				/>
				<div className="flex flex-col justify-between min-h-[119px] w-full">
					<div>
						<div className="flex gap-1.5 justify-start items-center text-sm">
							<IoStar size={20} className="text-orange-500" />
							<div>
								<span className="font-bold text-black">{course.rating}</span>
								<span className="text-gray-500">
									{' '}
									({course.reviews.toLocaleString()} Reviews)
								</span>
							</div>
						</div>
						<h3 className="mt-2 text-lg text-black">{course.title}</h3>
					</div>
					<p className="flex gap-1.5 mt-5 text-sm text-gray-800">
						<span className="text-gray-500">Course by:</span>{' '}
						{course.instructors.join(' • ')}
					</p>
				</div>
			</section>

			<div></div>

			<div className="text-left">
				<span className="text-orange-500 text-xl font-medium">
					${course.price.toFixed(2)}
				</span>
				{course.originalPrice && (
					<span className="text-lg line-through text-gray-400 ml-2">
						${course.originalPrice.toFixed(2)}
					</span>
				)}
			</div>

			<WishlistActions />
		</article>
	);
};

export default CourseItem;
