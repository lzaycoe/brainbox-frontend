'use client';

import { useEffect, useState } from 'react';

import { ListSummaryCardDashboard } from '@/components/admins/dashboard/ListSummaryCardDashboard';
import Loading from '@/components/commons/Loading';
import { CourseOverview } from '@/components/teachers/dashboard/CourseOverview';
import { RevenueReport } from '@/components/teachers/dashboard/RevenueReport';
import { SystemReport } from '@/schemas/revenue.schema';
import { getSystemReport } from '@/services/api/revenue';

export default function Home() {
	const [report, setReport] = useState<SystemReport | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchReport = async () => {
			try {
				const data = await getSystemReport();
				setReport(data);
			} catch (error) {
				console.error('Failed to fetch system report:', error);
				setError('Failed to load data. Please try again later.');
			} finally {
				setLoading(false);
			}
		};

		fetchReport();
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center mt-10">
				<Loading />
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="text-xl text-red-500">{error}</div>
			</div>
		);
	}

	return (
		<div className="flex flex-wrap justify-center p-4">
			{report && <ListSummaryCardDashboard report={report} />}
			<RevenueReport />
			<CourseOverview />
		</div>
	);
}
