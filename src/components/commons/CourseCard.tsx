import Image from 'next/image';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { PiUser } from 'react-icons/pi';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

interface CourseCardProps {
	imageUrl: string;
	category: string;
	categoryBgColor: string;
	categoryTextColor: string;
	price?: string;
	title: string;
	rating: string;
	students: string;
	maxWidth?: string;
	hideAddToCartButton?: boolean;
	children?: React.ReactNode;
}

const CourseCard: React.FC<CourseCardProps> = ({
	imageUrl,
	category,
	categoryBgColor,
	categoryTextColor,
	price,
	title,
	rating,
	students,
	maxWidth = 'max-w-[244px]',
	hideAddToCartButton = false,
	children,
}) => {
	return (
		<Card
			className={`flex flex-col justify-between bg-white ${maxWidth} min-h-[300px] max-h-[450px] transition-transform transform hover:scale-105 cursor-pointer group hover:shadow-2xl`}
		>
			<Image
				loading="lazy"
				src={imageUrl}
				className="object-cover w-full shadow-sm aspect-[1.33] rounded-t-lg"
				alt="Course thumbnail image"
				width={244}
				height={183}
			/>
			<CardContent className="flex flex-col justify-center mt-1 w-full p-3 overflow-hidden">
				<div className="flex gap-10 justify-between items-center w-full whitespace-nowrap">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<div
									className={`gap-2.5 self-stretch px-1.5 py-1 my-auto text-xs font-medium leading-tight uppercase ${categoryBgColor} ${categoryTextColor} truncate min-w-[50px] max-w-[300px]`}
								>
									{category}
								</div>
							</TooltipTrigger>
							<TooltipContent>{category}</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<div className="flex items-center gap-2">
						{price && (
							<div className="self-stretch my-auto text-base font-semibold leading-none text-orange-500">
								{price}
							</div>
						)}
						{!hideAddToCartButton && (
							<Button
								aria-label="Shopping cart"
								className="focus:outline-none"
								variant={'ghost'}
							>
								<FiShoppingCart />
							</Button>
						)}
					</div>
				</div>
				<CardTitle className="mt-2.5 text-sm font-bold tracking-normal leading-5 text-neutral-800 group-hover:text-orange-500 line-clamp-2 min-h-[2.5rem]">
					{title}
				</CardTitle>
			</CardContent>
			<Separator />
			<CardContent className="flex gap-10 justify-between px-3.5 w-full text-sm tracking-normal p-3">
				<div className="flex gap-1 items-center self-stretch my-auto font-medium leading-none text-gray-600 whitespace-nowrap">
					<FaStar
						className="flex shrink-0 self-stretch my-auto w-4 h-4 text-yellow-400"
						aria-hidden="true"
					/>
					<div className="self-stretch my-auto">{rating}</div>
				</div>
				<div className="flex justify-center self-stretch my-auto">
					<PiUser className="self-stretch my-auto leading-none text-[#564FFD]" />
					<div className="self-stretch my-auto leading-none text-gray-600 font-medium">
						{students}
					</div>
					<div className="self-stretch my-auto leading-loose text-gray-400 ml-1">
						students
					</div>
				</div>
			</CardContent>
			{children && (
				<>
					<Separator />
					<CardContent className="w-full p-3">{children}</CardContent>
				</>
			)}
		</Card>
	);
};

export default CourseCard;
