import { Metadata } from 'next';

import { Banner } from '@/components/teachers/dashboard/Banner';
import { CourseOverview } from '@/components/teachers/dashboard/CourseOverview';
import { ListSummaryCardDashboard } from '@/components/teachers/dashboard/ListSummaryCardDashboard';
import { RevenueReport } from '@/components/teachers/dashboard/RevenueReport';

export const metadata: Metadata = {
	title: 'BrainBox | Teacher | Dashboard',
};

export default function Home() {
	return (
		<div className="flex flex-wrap justify-center p-4">
			<ListSummaryCardDashboard />
			<Banner />
			<RevenueReport />
			<CourseOverview />
		</div>
	);
}
