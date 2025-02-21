import { ListSummaryCard } from '@/components/teachers/earnings/ListSummaryCard';
import { RevenueReport } from '@/components/teachers/earnings/RevenueReport';

export default function Earning() {
	return (
		<div className="flex flex-wrap justify-center p-4">
			<ListSummaryCard />
			<RevenueReport />
		</div>
	);
}
