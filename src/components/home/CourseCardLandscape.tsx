import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import { PiClockLight, PiUserDuotone } from 'react-icons/pi';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

interface CourseCardLandscapeProps {
	imageUrl: string;
	category: string;
	categoryBgColor: string;
	categoryTextColor: string;
	price: string;
	discountedPrice: string;
	title: string;
	teacherAvatar: string;
	teacherName: string;
	rating: string;
	students: string;
	duration: string;
}

const CourseCardLandscape: React.FC<CourseCardLandscapeProps> = ({
	imageUrl,
	category,
	categoryBgColor,
	categoryTextColor,
	price,
	discountedPrice,
	title,
	teacherAvatar,
	teacherName,
	rating,
	students,
	duration,
}) => {
	return (
		<Card className="flex flex-wrap justify-center items-center bg-white hover:shadow-2xl hover:scale-105 transition-transform group cursor-pointer">
			<Image
				loading="lazy"
				src={imageUrl}
				className="object-cover self-stretch my-auto shadow-sm aspect-[1.17] w-[220px] rounded-l-lg"
				alt="Product image"
				width={220}
				height={188}
			/>
			<CardContent className="flex flex-col justify-center self-stretch py-4 my-auto min-w-[240px] w-[428px] max-md:max-w-full">
				<div className="flex flex-col justify-start items-start w-full max-w-[428px] max-md:max-w-full">
					<div className="flex gap-10 justify-between items-center px-6 w-full whitespace-nowrap max-md:px-5 max-md:max-w-full">
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger asChild>
									<div
										className={`gap-2.5 self-stretch px-1.5 py-1 my-auto text-xs font-medium leading-tight uppercase ${categoryBgColor} ${categoryTextColor} truncate min-w-[50px] max-w-[150px]`}
									>
										{category}
									</div>
								</TooltipTrigger>
								<TooltipContent>{category}</TooltipContent>
							</Tooltip>
						</TooltipProvider>
						<div className="flex gap-1.5 items-center self-stretch my-auto">
							<div className="self-stretch my-auto text-lg tracking-tight leading-none text-neutral-800">
								{price}
							</div>
							<div className="self-stretch my-auto text-sm leading-6 text-gray-400 line-through">
								{discountedPrice}
							</div>
						</div>
					</div>
					<CardTitle className="mt-2 text-base leading-none px-6 line-clamp-1 group-hover:text-orange-500">
						{title}
					</CardTitle>
				</div>
				<div className="flex gap-10 justify-between items-center px-5 mt-4 w-full max-w-[424px] max-md:max-w-full">
					<div className="flex gap-3 justify-center items-center self-stretch my-auto text-sm tracking-normal leading-loose text-gray-600">
						<Avatar className="w-7 h-7">
							<AvatarImage src={teacherAvatar} alt="Teacher avatar" />
						</Avatar>
						<div className="self-stretch my-auto">{teacherName}</div>
					</div>
					<div className="flex gap-1.5 items-center self-stretch my-auto text-base font-medium tracking-normal leading-6 text-gray-400">
						<FaStar
							className="flex shrink-0 self-stretch my-auto w-5 h-5 text-yellow-400"
							aria-hidden="true"
						/>
						<div className="self-stretch my-auto">
							<span className="text-sm tracking-normal leading-5">
								{rating}
							</span>
							<span className="text-sm tracking-normal leading-6 text-gray-400">
								{' '}
								({students})
							</span>
						</div>
					</div>
				</div>
				<Separator className="mt-4 max-w-full bg-gray-200 border border-gray-200 border-solid min-h-[1px] w-[428px]" />
				<div className="flex gap-10 justify-between items-center px-5 mt-4 w-full text-sm tracking-normal max-w-[424px] max-md:max-w-full">
					<div className="flex gap-1.5 items-center self-stretch my-auto">
						<PiUserDuotone
							className="flex shrink-0 self-stretch my-auto w-5 h-5 text-[#564FFD]"
							aria-hidden="true"
						/>
						<div className="flex justify-center items-center self-stretch my-auto">
							<div className="self-stretch my-auto font-medium leading-none text-gray-600">
								{students}
							</div>
							<div className="self-stretch my-auto leading-loose text-gray-400 ml-1">
								students
							</div>
						</div>
					</div>
					<div className="flex gap-1.5 items-center self-stretch my-auto leading-loose text-gray-600">
						<PiClockLight
							className="flex shrink-0 w-5 h-5 text-[#23BD33]"
							aria-hidden="true"
						/>
						<div className="self-stretch my-auto">{duration}</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default CourseCardLandscape;
