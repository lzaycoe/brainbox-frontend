import React from 'react';

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

const status = [
	{ id: 1, title: 'CANCELED' },
	{ id: 2, title: 'PAID' },
];

interface FilterStatus {
	onStatusChange: (status: string) => void;
}

const FilterStatusSelects: React.FC<FilterStatus> = ({ onStatusChange }) => {
	return (
		<div className="flex gap-6">
			<div className="w-60 flex flex-col justify-start items-start gap-2">
				<div className="text-[#6e7484] text-xs font-normal leading-none">
					Status:
				</div>
				<Select onValueChange={onStatusChange}>
					<SelectTrigger className="h-12 pl-[18px] pr-4 py-3 bg-white border border-[#e8eaef] justify-between items-center gap-[100px] inline-flex overflow-hidden">
						<SelectValue placeholder="All Status" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Status</SelectItem>
						{status.map((status) => (
							<SelectItem key={status.id} value={status.title}>
								{status.title}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default FilterStatusSelects;
