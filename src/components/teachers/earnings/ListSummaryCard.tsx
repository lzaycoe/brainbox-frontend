import {
	PiCreditCardDuotone,
	PiCrownSimpleDuotone,
	PiReceiptDuotone,
	PiStackDuotone,
} from 'react-icons/pi';

import { SummaryCard } from '@/components/commons/SummaryCard';

export const ListSummaryCard = () => {
	return (
		<div className="flex flex-col gap-6 justify-center items-center mb-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<SummaryCard
					icon={<PiStackDuotone className="w-8 h-8 text-orange-500" />}
					value={'$13,804.00'}
					label="Total Revenue"
					bgColor="bg-orange-100"
				/>
				<SummaryCard
					icon={<PiReceiptDuotone className="w-8 h-8 text-violet-500" />}
					value={'$16,593.00'}
					label="Current Balance"
					bgColor="bg-violet-100"
				/>
				<SummaryCard
					icon={<PiCreditCardDuotone className="w-8 h-8 text-rose-500" />}
					value={'$13,184.00'}
					label="Total Withdrawals"
					bgColor="bg-rose-50"
				/>
				<SummaryCard
					icon={<PiCrownSimpleDuotone className="w-8 h-8 text-green-500" />}
					value={'$162.00'}
					label="Today Revenue"
					bgColor="bg-green-100"
				/>
			</div>
		</div>
	);
};
