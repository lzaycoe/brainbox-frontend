import React from 'react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const categories = [
	{ id: 2, title: 'Business' },
	{ id: 3, title: 'Finance & Accounting' },
	{ id: 4, title: 'IT & Software' },
	{ id: 5, title: 'Personal Development' },
	{ id: 6, title: 'Office Productivity' },
	{ id: 7, title: 'Marketing' },
	{ id: 8, title: 'Photography & Video' },
	{ id: 9, title: 'Lifestyle' },
	{ id: 10, title: 'Design' },
	{ id: 11, title: 'Health & Fitness' },
	{ id: 12, title: 'Music' },
];

const ratings = [
	{ value: '4', label: '4 Star & Up' },
	{ value: '3', label: '3 Star & Up' },
	{ value: '2', label: '2 Star & Up' },
	{ value: '1', label: '1 Star & Up' },
];

const prices = [
	{ value: '5', label: 'over 80$' },
	{ value: '4', label: '61 - 80$' },
	{ value: '3', label: '41 - 60$' },
	{ value: '2', label: '21 - 40$' },
	{ value: '1', label: '1 - 20$' },
];

interface FilterSelectsProps {
	onCategoryChange: (category: string) => void;
	onRatingChange: (rating: string) => void;
	onPriceChange: (price: string) => void;
}

const FilterSelects: React.FC<FilterSelectsProps> = ({
	onCategoryChange,
	onRatingChange,
	onPriceChange,
}) => {
	return (
		<div className="flex gap-6">
			<div className="w-60 flex flex-col justify-start items-start gap-2">
				<div className="text-[#6e7484] text-xs font-normal leading-none">
					Category:
				</div>
				<Select onValueChange={onCategoryChange}>
					<SelectTrigger className="h-12 pl-[18px] pr-4 py-3 bg-white border border-[#e8eaef] justify-between items-center gap-[100px] inline-flex overflow-hidden">
						<SelectValue placeholder="All Categories" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Categories</SelectItem>
						{categories.map((category) => (
							<SelectItem
								key={category.id}
								value={category.title.toLowerCase().replace(/ /g, '-')}
							>
								{category.title}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="w-60 flex flex-col justify-start items-start gap-2">
				<div className="text-[#6e7484] text-xs font-normal leading-none">
					Rating:
				</div>
				<Select onValueChange={onRatingChange}>
					<SelectTrigger className="h-12 pl-[18px] pr-4 py-3 bg-white border border-[#e8eaef] items-center gap-[103px] inline-flex overflow-hidden justify-between">
						<SelectValue placeholder="All Star" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Star</SelectItem>
						{ratings.map((rating) => (
							<SelectItem key={rating.value} value={rating.value}>
								{rating.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			{/* <div className="w-60 flex flex-col justify-start items-start gap-2">
				<div className="text-[#6e7484] text-xs font-normal leading-none">
					Price:
				</div>
				<Select onValueChange={onPriceChange}>
					<SelectTrigger className="h-12 pl-[18px] pr-4 py-3 bg-white border border-[#e8eaef] items-center gap-[103px] inline-flex overflow-hidden justify-between">
						<SelectValue placeholder="All Price" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Price</SelectItem>
						{prices.map((prices) => (
							<SelectItem key={prices.value} value={prices.value}>
								{prices.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div> */}
			{onPriceChange && ( // Kiểm tra nếu `onPriceChange` được truyền vào
				<div className="w-60 flex flex-col justify-start items-start gap-2">
					<div className="text-[#6e7484] text-xs font-normal leading-none">
						Price:
					</div>
					<Select onValueChange={onPriceChange}>
						<SelectTrigger className="h-12 pl-[18px] pr-4 py-3 bg-white border border-[#e8eaef] items-center gap-[103px] inline-flex overflow-hidden justify-between">
							<SelectValue placeholder="All Price" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="all">All Price</SelectItem>
							{prices.map((prices) => (
								<SelectItem key={prices.value} value={prices.value}>
									{prices.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			)}
		</div>
	);
};

export default FilterSelects;
