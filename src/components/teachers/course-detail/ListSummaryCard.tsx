import {
	PiMoneyWavyDuotone,
	PiPlayCircleDuotone,
	PiStackDuotone,
	PiUsersDuotone,
} from 'react-icons/pi';

import { SummaryCard } from '@/components/commons/SummaryCard';
import { formatCurrency } from '@/utils/currency';

interface ListSummaryCardProps {
	revenue: number;
	studentsEnrolled: number;
	sections: number;
	lectures: number;
}

export const ListSummaryCard = ({
	revenue,
	studentsEnrolled,
	sections,
	lectures,
}: ListSummaryCardProps) => {
	return (
		<div className="flex flex-col gap-6 justify-center items-center mb-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<SummaryCard
					icon={<PiMoneyWavyDuotone className="w-8 h-8 text-yellow-500" />}
					value={formatCurrency(revenue)}
					label="Revenue"
					bgColor="bg-yellow-100"
				/>
				<SummaryCard
					icon={<PiUsersDuotone className="w-8 h-8 text-rose-500" />}
					value={studentsEnrolled}
					label="Students Enrolled"
					bgColor="bg-rose-100"
				/>
				<SummaryCard
					icon={<PiStackDuotone className="w-8 h-8 text-green-500" />}
					value={sections}
					label="Sections"
					bgColor="bg-green-100"
				/>
				<SummaryCard
					icon={<PiPlayCircleDuotone className="w-8 h-8 text-orange-500" />}
					value={lectures}
					label="Lectures"
					bgColor="bg-orange-50"
				/>
			</div>
		</div>
	);
};
