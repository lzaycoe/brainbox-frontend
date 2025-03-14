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
	{ value: 'under-500k', label: 'Under 500.000đ' },
	{ value: '500k-1m', label: '500.000đ - 1.000.000đ' },
	{ value: '1m-2m', label: '1.000.000đ - 2.000.000đ' },
	{ value: '2m-5m', label: '2.000.000đ - 5.000.000đ' },
	{ value: 'over-5m', label: 'Over 5.000.000đ' },
];

const statuses = [
	{ value: 'all', label: 'All Status' },
	{ value: 'pending', label: 'Pending' },
	{ value: 'approved', label: 'Approved' },
	{ value: 'rejected', label: 'Rejected' },
];

interface FilterSelectsProps {
	onCategoryChange: (category: string) => void;
	onRatingChange: (rating: string) => void;
	onPriceChange?: (price: string) => void;
	onStatusChange?: (status: string) => void;
}

const FilterSelects: React.FC<FilterSelectsProps> = ({
	onCategoryChange,
	onRatingChange,
	onPriceChange,
	onStatusChange,
}) => {
	return (
		<div className="flex gap-6">
			<div className="w-80 min-w-70 flex flex-col justify-start items-start gap-2">
				<div className="text-[#6e7484] text-xs font-normal leading-none">
					Category:
				</div>
				<Select onValueChange={onCategoryChange}>
					<SelectTrigger className="h-12 pl-[18px] pr-4 py-3 bg-white border border-[#e8eaef] justify-between items-center gap-[100px] inline-flex">
						<SelectValue placeholder="All Categories" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Categories</SelectItem>
						{categories.map((category) => (
							<SelectItem key={category.id} value={category.title}>
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
			{onPriceChange && (
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
							{prices.map((price) => (
								<SelectItem key={price.value} value={price.value}>
									{price.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			)}
			{onStatusChange && (
				<div className="w-60 flex flex-col justify-start items-start gap-2">
					<div className="text-[#6e7484] text-xs font-normal leading-none">
						Status:
					</div>
					<Select onValueChange={onStatusChange}>
						<SelectTrigger className="h-12 pl-[18px] pr-4 py-3 bg-white border border-[#e8eaef] items-center gap-[103px] inline-flex overflow-hidden justify-between">
							<SelectValue placeholder="All Status" />
						</SelectTrigger>
						<SelectContent>
							{statuses.map((status) => (
								<SelectItem key={status.value} value={status.value}>
									{status.label}
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
