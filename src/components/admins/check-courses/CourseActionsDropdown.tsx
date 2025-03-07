import { BsThreeDots } from 'react-icons/bs';
import { FaCheck, FaEye, FaTimes } from 'react-icons/fa';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CourseActionsDropdownProps {
	readonly courseId: number;
	readonly status: string;
	readonly onStatusUpdate: (courseId: number, newStatus: string) => void;
	readonly onViewDetails: (courseId: number) => void;
	readonly position: 'top' | 'bottom';
}

export default function CourseActionsDropdown({
	courseId,
	status,
	onStatusUpdate,
	onViewDetails,
	position,
}: CourseActionsDropdownProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-200 group">
					<BsThreeDots className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" side={position} className="w-36">
				{status === 'pending' && (
					<>
						<DropdownMenuItem
							onClick={() => onStatusUpdate(courseId, 'approved')}
							className="flex items-center gap-2 group cursor-pointer"
						>
							<span className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center group-hover:bg-green-100 transition-all duration-200">
								<FaCheck className="w-3 h-3 text-green-600" />
							</span>
							<span className="group-hover:text-green-600">Approve</span>
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={() => onStatusUpdate(courseId, 'rejected')}
							className="flex items-center gap-2 group cursor-pointer"
						>
							<span className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-all duration-200">
								<FaTimes className="w-3 h-3 text-red-600" />
							</span>
							<span className="group-hover:text-red-600">Reject</span>
						</DropdownMenuItem>
					</>
				)}
				<DropdownMenuItem
					onClick={() => onViewDetails(courseId)}
					className="flex items-center gap-2 group cursor-pointer"
				>
					<span className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-all duration-200">
						<FaEye className="w-3 h-3 text-blue-600" />
					</span>
					<span className="group-hover:text-blue-600">Details</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
