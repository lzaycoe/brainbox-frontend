'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { getCategoryColors } from '@/config/categoryColors';
import { Course } from '@/schemas/course.schema';
import { formatCurrency } from '@/utils/currency';

interface CourseDetailCardProps extends Course {
	creators: string;
	avatarImages: string;
	isAdminView?: boolean;
}

const CourseDetailCard: React.FC<CourseDetailCardProps> = ({
	id,
	title,
	subtitle,
	tag,
	description,
	thumbnail,
	originPrice,
	salePrice,
	creators,
	avatarImages,
	status,
	createdAt,
	updatedAt,
	isAdminView = false,
}) => {
	console.log('CourseDetailCard:', {
		title,
		subtitle,
		tag,
		description,
		thumbnail,
		originPrice,
		salePrice,
		creators,
		avatarImages,
		status,
		createdAt,
		updatedAt,
	});
	const categoryColors = getCategoryColors(tag);
	return (
		<div className="h-[312px] p-6 bg-white flex gap-6">
			<Image
				src={thumbnail}
				alt="Course Thumbnail"
				width={352}
				height={264}
				className="w-[352px] h-[264px]"
			/>
			<div className="flex flex-col gap-4">
				<div className="flex flex-col gap-3">
					<div className="flex gap-4 text-xs text-[#8c93a3]">
						<div
							className={`gap-2.5 self-stretch px-1.5 py-1 my-auto text-xs font-medium leading-tight uppercase ${categoryColors.bgColor} ${categoryColors.textColor} truncate min-w-[50px] max-w-[300px]`}
						>
							{tag}
						</div>
						<div className="flex gap-1 items-center ml-auto">
							<span className="text-2xl text-orange-600 font-bold mr-3">
								{formatCurrency(salePrice)}
							</span>
							<span className="text-xl text-gray-400 line-through">
								{formatCurrency(originPrice)}
							</span>
						</div>
					</div>
					<div className="flex flex-col gap-2">
						<h2 className="w-[896px] text-xl font-semibold text-[#1d1f26] leading-relaxed">
							{title}
						</h2>
						<h3 className="w-[896px] text-xs font-semibold text-[#1d1f26] leading-relaxed">
							{subtitle}
						</h3>
						<p className="w-[896px] text-sm text-[#6e7484] leading-snug">
							{description}
						</p>
					</div>
				</div>
				<div className="w-[896px] flex justify-between items-center">
					<div className="flex items-center">
						<div className="relative w-20 h-[50px]">
							<Image
								src={avatarImages}
								alt={creators}
								width={50}
								height={50}
								className={`absolute top-0 rounded-full border-2 border-white`}
							/>
						</div>
						<div className="flex flex-col gap-1">
							<span className="text-sm text-[#6e7484]">Created by:</span>
							<div className="flex gap-1.5 text-base font-medium text-[#1d1f26]">
								<strong>{creators}</strong>
							</div>
						</div>
					</div>
				</div>
				<hr />
				<div className="flex flex-col gap-2">
					<div className="flex gap-4 text-xs text-[#8c93a3] items-center">
						<div>
							Create At: <span className="text-[#4d5565]">{createdAt}</span>
						</div>
						<div>
							Last Updated: <span className="text-[#4d5565]">{updatedAt}</span>
						</div>
						{!isAdminView && (
							<div className="ml-auto">
								<Link
									href={'/teachers/courses/[id]/edit'}
									as={`/teachers/courses/${id}/edit`}
								>
									<Button
										className="gap-3 px-6 py-4 text-xm tracking-normal text-white capitalize bg-orange-500 leading-[56px] max-md:px-5 max-md:py-3 max-md:text-lg"
										tabIndex={0}
										aria-label="Edit Course"
									>
										Edit Course
									</Button>
								</Link>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseDetailCard;
