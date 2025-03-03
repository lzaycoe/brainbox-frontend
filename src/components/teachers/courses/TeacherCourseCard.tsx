import { useRouter } from 'next/navigation';
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
import { getCategoryColors } from '@/config/categoryColors';
import { Course } from '@/schemas/course.schema';
import { formatCurrency } from '@/utils/currency';

interface TeacherCourseCardProps extends Course {
	rating?: string;
	students?: string;
}

const TeacherCourseCard: React.FC<TeacherCourseCardProps> = ({
	id,
	thumbnail: imageUrl,
	tag: category,
	title,
	rating = '0',
	students = '0',
	salePrice,
	originPrice,
}) => {
	const { bgColor: categoryBgColor, textColor: categoryTextColor } =
		getCategoryColors(category);

	const router = useRouter();

	const handleEditCourse = () => {
		router.push(`/teachers/courses/${id}/edit`);
	};

	const handleViewDetails = () => {
		router.push(`/teachers/courses/${id}`);
	};

	const handleSectionsAndLectures = () => {
		router.push(`/teachers/courses/${id}/sections`);
	};

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
			maxWidth="w-[244px]"
		>
			<div className="w-full flex justify-between items-center">
				<div className="flex items-center gap-1">
					{salePrice ? (
						<>
							<div className="text-[#ff6636] text-lg font-semibold leading-normal">
								{formatCurrency(salePrice)}
							</div>
							<div className="text-[#a0a5b2] text-sm font-normal line-through leading-snug">
								{formatCurrency(originPrice)}
							</div>
						</>
					) : (
						<div className="text-[#ff6636] text-lg font-semibold leading-normal">
							{formatCurrency(originPrice)}{' '}
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
						<DropdownMenuItem
							className="pl-[18px] pr-[18px] py-[5px] text-[#4d5565] text-sm font-normal leading-snug hover:bg-[#ff6636] hover:text-white cursor-pointer"
							onClick={handleViewDetails}
						>
							View Details
						</DropdownMenuItem>
						<DropdownMenuItem
							className="pl-[18px] pr-[18px] py-[5px] text-[#4d5565] text-sm font-normal leading-snug hover:bg-[#ff6636] hover:text-white cursor-pointer"
							onClick={handleEditCourse}
						>
							Edit Course
						</DropdownMenuItem>
						<DropdownMenuItem
							className="pl-[18px] pr-[18px] py-[5px] text-[#4d5565] text-sm font-normal leading-snug hover:bg-[#ff6636] hover:text-white cursor-pointer"
							onClick={handleSectionsAndLectures}
						>
							Sections & Lectures
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</CourseCard>
	);
};

export default TeacherCourseCard;
