import React from 'react';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';

import CourseCard from '@/components/commons/CourseCard';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TeacherCourseCardProps {
	imageUrl: string;
	category: string;
	categoryBgColor: string;
	categoryTextColor: string;
	title: string;
	rating: string;
	students: string;
	discountPrice?: string;
	originalPrice: string;
}

const TeacherCourseCard: React.FC<TeacherCourseCardProps> = ({
	imageUrl,
	category,
	categoryBgColor,
	categoryTextColor,
	title,
	rating,
	students,
	discountPrice,
	originalPrice,
}) => {
	return (
		<CourseCard
			imageUrl={imageUrl}
			category={category}
			categoryBgColor={categoryBgColor}
			categoryTextColor={categoryTextColor}
			title={title}
			rating={rating}
			students={students}
			hideAddToCartButton={true}
			maxWidth="w-[300px]"
		>
			<div className="w-full flex justify-between items-center">
				<div className="flex items-center gap-1">
					{discountPrice ? (
						<>
							<div className="text-[#ff6636] text-lg font-semibold leading-normal">
								{discountPrice}
							</div>
							<div className="text-[#a0a5b2] text-sm font-normal line-through leading-snug">
								{originalPrice}
							</div>
						</>
					) : (
						<div className="text-[#ff6636] text-lg font-semibold leading-normal">
							{originalPrice}
						</div>
					)}
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="focus:outline-none cursor-pointer"
						>
							<PiDotsThreeOutlineFill />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-[200px] py-3 bg-white shadow-[0px_6px_16px_0px_rgba(0,0,0,0.06)] border border-[#cdd0d8]">
						<DropdownMenuItem className="pl-[18px] pr-[18px] py-[5px] text-[#4d5565] text-sm font-normal leading-snug hover:bg-[#ff6636] hover:text-white cursor-pointer">
							View Details
						</DropdownMenuItem>
						<DropdownMenuItem className="pl-[18px] pr-[18px] py-[5px] text-[#4d5565] text-sm font-normal leading-snug hover:bg-[#ff6636] hover:text-white cursor-pointer">
							Edit Course
						</DropdownMenuItem>
						<DropdownMenuItem className="pl-[18px] pr-[18px] py-[5px] text-[#4d5565] text-sm font-normal leading-snug hover:bg-[#ff6636] hover:text-white cursor-pointer">
							Delete Course
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</CourseCard>
	);
};

export default TeacherCourseCard;
