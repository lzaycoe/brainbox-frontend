import { CourseOverview } from '@/components/teachers/dashboard/CourseOverview';
import { ListSummaryCardDashboard } from '@/components/teachers/dashboard/ListSummaryCardDashboard';
import { RevenueReport } from '@/components/teachers/dashboard/RevenueReport';

export default function Home() {
	return (
		<div className="flex flex-wrap justify-center p-4">
			<ListSummaryCardDashboard />
			<RevenueReport />
			<CourseOverview />
		</div>
	);
}
