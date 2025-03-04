import React from 'react';

import {
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Pagination as UIPagination,
} from '@/components/ui/pagination';

interface PaginationComponentProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (pageNumber: number) => void;
	activeClassName?: string;
	hoverClassName?: string;
}

const PaginationCustom: React.FC<PaginationComponentProps> = ({
	currentPage,
	totalPages,
	onPageChange,
	activeClassName = 'bg-[#FF6636] text-white',
	hoverClassName = 'hover:bg-[#FFEEE8] hover:text-[#FF6636]',
}) => {
	return (
		<UIPagination className="my-6">
			<PaginationContent>
				<PaginationPrevious
					hoverClassName={hoverClassName}
					onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
				/>
				{Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
					<PaginationItem key={number}>
						<PaginationLink
							isActive={number === currentPage}
							onClick={() => onPageChange(number)}
							activeClassName={activeClassName}
							hoverClassName={hoverClassName}
						>
							{number}
						</PaginationLink>
					</PaginationItem>
				))}
				<PaginationNext
					hoverClassName={hoverClassName}
					onClick={() =>
						onPageChange(
							currentPage < totalPages ? currentPage + 1 : totalPages,
						)
					}
				/>
			</PaginationContent>
		</UIPagination>
	);
};

export default PaginationCustom;
