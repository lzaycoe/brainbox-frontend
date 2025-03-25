'use client';

import { useEffect, useState } from 'react';

import Loading from '@/components/commons/Loading';
import { Banner } from '@/components/teachers/dashboard/Banner';
import { CourseOverview } from '@/components/teachers/dashboard/CourseOverview';
import { ListSummaryCardDashboard } from '@/components/teachers/dashboard/ListSummaryCardDashboard';
import { RevenueReport } from '@/components/teachers/dashboard/RevenueReport';
import { useUserContext } from '@/contexts/UserContext';
import { TeacherReport } from '@/schemas/revenue.schema';
import { getTeacherReport } from '@/services/api/revenue';

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const { user } = useUserContext();
	const teacherId = user?.id || 0;

	const [report, setReport] = useState<TeacherReport | null>(null);

	console.log('ListSummaryCardDashboard rendering...');
	useEffect(() => {
		const fetchReport = async () => {
			setIsLoading(true);
			console.log('Fetching report for teacherId:', teacherId);
			try {
				const data = await getTeacherReport(teacherId);
				console.log('Fetched report data:', data);
				setReport(data);
			} catch (error) {
				console.error('Failed to fetch teacher report:', error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchReport();
	}, [teacherId, setIsLoading]);

	if (!report) return <Loading className="w-full my-6" />;

	return (
		<div className="flex flex-wrap justify-center p-4">
			{isLoading ? (
				<Loading className="w-full my-6" />
			) : (
				<>
					<ListSummaryCardDashboard report={report} />
					<Banner />
					<CourseOverview />
					<RevenueReport />
				</>
			)}
		</div>
	);
}
