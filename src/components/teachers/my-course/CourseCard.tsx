import Image from 'next/image';
import React from 'react';
import { PiStarFill, PiUser } from 'react-icons/pi';

export default function CourseCard() {
	const courses = [
		{
			id: 1,
			imgSrc: '/app/course/course01.png',
			altText:
				'Course thumbnail for Complete Blender Creator: Learn 3D Modelling for Beginners',
			category: 'Developments',
			title: 'Complete Blender Creator: Learn 3D Modelling for Beginners',
			rating: 3.5,
			students: '435,671',
			price: 16.0,
		},
		{
			id: 2,
			imgSrc: '/app/course/course01.png',
			altText: 'Course thumbnail for SQL for NEWBS: Weekender Crash Course',
			category: 'Developments',
			title: 'SQL for NEWBS: Weekender Crash Course',
			rating: 4.7,
			students: '154,817',
			price: 13.0,
		},
		{
			id: 3,
			imgSrc: '/app/course/course01.png',
			altText:
				'Course thumbnail for SEO 2025: Complete SEO Training + SEO for WordPress Websites',
			category: 'Developments',
			title: 'SEO 2025: Complete SEO Training + SEO for WordPress Websites',
			rating: 4.9,
			students: '181,811',
			price: 57.0,
			originalPrice: 57.0,
		},
		{
			id: 4,
			imgSrc: '/app/course/course01.png',
			altText:
				'Course thumbnail for Angular - The Complete Guide (2025 Edition)',
			category: 'Developments',
			title: 'Angular - The Complete Guide (2025 Edition)',
			rating: 4.6,
			students: '236,568',
			price: 32.0,
		},
		{
			id: 5,
			imgSrc: '/app/course/course01.png',
			altText:
				'Course thumbnail for Angular - The Complete Guide (2025 Edition)',
			category: 'Developments',
			title: 'Angular - The Complete Guide (2025 Edition)',
			rating: 4.6,
			students: '236,568',
			price: 32.0,
		},
	];

	return (
		<div className="flex flex-col gap-6 justify-center items-center mb-6 mt-10">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				{courses.map((course) => (
					<div
						className="flex flex-col justify-center items-center pb-3.5 bg-white min-w-[240px] w-[312px]"
						key={course.id}
					>
						<Image
							src={course.imgSrc}
							alt={course.altText}
							width={312} // Width of the image
							height={234} // Height of the image (aspect ratio 4:3)
							className="object-contain shadow-sm"
						/>
						<div className="flex flex-col justify-center mt-4 max-w-full font-medium w-[276px]">
							<div className="gap-2.5 self-start px-1.5 py-1 text-xs leading-tight text-black uppercase whitespace-nowrap bg-violet-100">
								{course.category}
							</div>
							<div className="mt-2 text-base leading-6 text-black">
								{course.title}
							</div>
						</div>
						<div className="mt-4 max-w-full bg-gray-200 border border-gray-200 border-solid min-h-[1px] w-[312px]"></div>
						<div className="flex gap-10 justify-between items-center px-5 mt-4 w-full text-sm tracking-normal max-w-[312px]">
							<div className="flex gap-1.5 items-center self-stretch my-auto font-medium leading-none text-black whitespace-nowrap">
								<div
									className="flex shrink-0 self-stretch my-auto"
									aria-label="Rating star icon"
								>
									<PiStarFill
										className="object-contain w-6 h-6 "
										color="#FD8E1F"
									/>
								</div>
								<div className="self-stretch my-auto">{course.rating}</div>
							</div>
							<div className="flex gap-1.5 items-center self-stretch my-auto">
								<div
									className="flex shrink-0 self-stretch my-auto"
									aria-label="Students icon"
								>
									<PiUser className="object-contain w-6 h-6 " color="#564FFD" />
								</div>
								<div className="flex justify-center items-center self-stretch my-auto">
									<div className="self-stretch my-auto font-medium leading-none text-black">
										{course.students}
									</div>
									<div className="self-stretch my-auto leading-loose text-black">
										students
									</div>
								</div>
							</div>
						</div>
						<div className="mt-4 max-w-full bg-gray-200 border border-gray-200 border-solid min-h-[1px] w-[312px]"></div>
						<div className="flex gap-10 justify-between items-center mt-4 max-w-full whitespace-nowrap w-[280px]">
							<div className="flex gap-1 items-center self-stretch my-auto">
								<div className="self-stretch my-auto text-lg font-semibold leading-none text-black">
									${course.price}
								</div>
								{course.originalPrice && (
									<div className="self-stretch my-auto text-sm tracking-normal leading-loose text-black line-through">
										${course.originalPrice}
									</div>
								)}
							</div>
							<div
								className="flex shrink-0 self-stretch my-auto w-6 h-6"
								aria-label="Add to cart icon"
							></div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
