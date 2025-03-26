import { Metadata } from 'next';

import { ListSummaryCard } from '@/components/teachers/earnings/ListSummaryCard';
import { RevenueReport } from '@/components/teachers/earnings/RevenueReport';
import WithdrawHistory from '@/components/teachers/earnings/WithdrawHistory';
import WithdrawMoney from '@/components/teachers/earnings/WithdrawMoney';

export const metadata: Metadata = {
	title: 'BrainBox | Teacher | Earnings',
};

export default function Earning() {
	return (
		<div className="flex flex-wrap justify-center p-4">
			<ListSummaryCard />
			<RevenueReport />
			<WithdrawMoney key="withdraw-money" />
			<WithdrawHistory />
		</div>
	);
}
