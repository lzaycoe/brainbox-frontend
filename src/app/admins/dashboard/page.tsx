import { CourseOverview } from '@/components/admins/dashboard/CourseOverview';
import { ListSummaryCard } from '@/components/admins/dashboard/ListSummaryCard';
import { RevenueReport } from '@/components/admins/dashboard/RevenueReport';

export default function Home() {
	return (
		<div className="flex flex-wrap justify-center p-4">
			<ListSummaryCard />
			<RevenueReport />
			<CourseOverview />
		</div>
	);
}
