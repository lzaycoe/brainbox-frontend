import Image from 'next/image';
import React from 'react';
import { IoStar } from 'react-icons/io5';

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
		<article className="grid grid-cols-[70%_30%] items-center mt-4 max-w-full w-full px-4 gap-x-4">
			<section className="flex gap-4 items-start">
				<Image
					src={course.image}
					alt={course.title}
					className="object-contain w-36"
					width={144}
					height={81}
				/>
				<div className="flex flex-col justify-between w-full">
					<div>
						<div className="flex gap-1 items-center text-sm">
							<IoStar size={20} className="text-orange-500" />
							<span className="font-bold text-black">{course.rating}</span>
							<span className="text-gray-500">
								({course.reviews.toLocaleString()} Reviews)
							</span>
						</div>
						<h3 className="mt-1 text-base text-black">{course.title}</h3>
					</div>
					<p className="flex gap-1 text-sm text-gray-800 mt-2">
						<span className="text-gray-500">Course by:</span>
						{course.instructors.join(' • ')}
					</p>
				</div>
			</section>

			{/* Điều chỉnh cột giá tiền để chiếm ít không gian hơn */}
			<div className="text-left">
				<span className="text-orange-500 text-lg font-medium">
					${course.price.toFixed(2)}
				</span>
				{course.originalPrice && (
					<span className="text-sm line-through text-gray-400 ml-1">
						${course.originalPrice.toFixed(2)}
					</span>
				)}
			</div>
		</article>
	);
};

export default CourseItem;
