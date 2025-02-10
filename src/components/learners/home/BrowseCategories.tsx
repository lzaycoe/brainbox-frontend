import React from 'react';
import { FiPenTool } from 'react-icons/fi';
import { HiChip } from 'react-icons/hi';
import {
	PiArrowRight,
	PiBugDroidBold,
	PiCameraDuotone,
	PiChartBarHorizontal,
	PiCreditCardDuotone,
	PiFirstAidKitDuotone,
	PiHandshakeDuotone,
	PiHeadphonesDuotone,
	PiMegaphoneSimpleDuotone,
	PiPackageDuotone,
	PiReceiptDuotone,
} from 'react-icons/pi';

import { Button } from '@/components/ui/button';

import CategoryCard from './CatergoryCard';

export const BrowseCategories = () => {
	const categories = [
		{
			id: 1,
			icon: <HiChip />,
			title: 'Label',
			courseCount: '63,476',
			bgColor: 'bg-violet-100',
			iconColor: '#564FFD',
		},
		{
			id: 2,
			icon: <PiHandshakeDuotone />,
			title: 'Business',
			courseCount: '52,822',
			bgColor: 'bg-green-100',
			iconColor: '#22C55E',
		},
		{
			id: 3,
			icon: <PiCreditCardDuotone />,
			title: 'Finance & Accounting',
			courseCount: '33,841',
			bgColor: 'bg-orange-50',
			iconColor: '#F59E0B',
		},
		{
			id: 4,
			icon: <PiChartBarHorizontal />,
			title: 'IT & Software',
			courseCount: '22,649',
			bgColor: 'bg-rose-50',
			iconColor: '#E34444',
		},
		{
			id: 5,
			icon: <PiBugDroidBold />,
			title: 'Personal Development',
			courseCount: '20,126',
			bgColor: 'bg-rose-100',
			iconColor: '#E34444',
		},
		{
			id: 6,
			icon: <PiReceiptDuotone />,
			title: 'Office Productivity',
			courseCount: '13,932',
			bgColor: 'bg-slate-100',
			iconColor: undefined,
		},
		{
			id: 7,
			icon: <PiMegaphoneSimpleDuotone />,
			title: 'Marketing',
			courseCount: '12,068',
			bgColor: 'bg-violet-100',
			iconColor: '#564FFD',
		},
		{
			id: 8,
			icon: <PiCameraDuotone />,
			title: 'Photography & Video',
			courseCount: '6,196',
			bgColor: 'bg-slate-100',
			iconColor: undefined,
		},
		{
			id: 9,
			icon: <PiPackageDuotone />,
			title: 'Lifestyle',
			courseCount: '2,736',
			bgColor: 'bg-orange-50',
			iconColor: '#FD8E1F',
		},
		{
			id: 10,
			icon: <FiPenTool />,
			title: 'Design',
			courseCount: '2,600',
			bgColor: 'bg-rose-100',
			iconColor: '#FF6636',
		},
		{
			id: 11,
			icon: <PiFirstAidKitDuotone />,
			title: 'Health & Fitness',
			courseCount: '1,678',
			bgColor: 'bg-green-100',
			iconColor: '#23BD33',
		},
		{
			id: 12,
			icon: <PiHeadphonesDuotone />,
			title: 'Music',
			courseCount: '959',
			bgColor: 'bg-orange-50',
			iconColor: '#FD8E1F',
		},
	];

	return (
		<section
			className="flex flex-col justify-center items-center px-72 py-20 max-md:px-5"
			aria-labelledby="browse-categories-title"
		>
			<h2
				id="browse-categories-title"
				className="text-4xl font-semibold tracking-tight leading-tight text-neutral-800"
			>
				Browse top category
			</h2>
			<div className="flex flex-col mt-10 max-md:max-w-full">
				<div className="grid grid-cols-4 gap-6 max-md:grid-cols-1">
					{categories.map((category) => (
						<CategoryCard key={category.id} {...category} />
					))}
				</div>
			</div>
			<div className="flex gap-3 items-center mt-10 text-sm tracking-normal text-center">
				<p className="self-stretch my-auto leading-loose text-gray-600">
					We have more category & subcategory.
				</p>
				<Button
					className="flex gap-2 justify-center items-center self-stretch py-1 my-auto font-medium leading-none text-orange-500 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
					aria-label="Browse all categories"
				>
					<span className="self-stretch my-auto">Browse All</span>
					<PiArrowRight
						className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
						width={24}
						height={24}
					/>
				</Button>
			</div>
		</section>
	);
};
