import { Metadata } from 'next';

import { CourseOverview } from '@/components/teachers/dashboard/CourseOverview';
import { ListSummaryCard } from '@/components/teachers/dashboard/ListSummaryCard';
import { RevenueReport } from '@/components/teachers/dashboard/RevenueReport';

export const metadata: Metadata = {
	title: 'BrainBox | Admin Dashboard',
};

export default function Home() {
	return (
		<div className="flex flex-wrap justify-center p-4">
			<ListSummaryCard />
			<RevenueReport />
			<CourseOverview />
		</div>
	);
}
