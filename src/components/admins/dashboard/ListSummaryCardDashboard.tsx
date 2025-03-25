'use client';

import { useEffect, useState } from 'react';
import {
	PiBankDuotone,
	PiBookOpenDuotone,
	PiChalkboardTeacherDuotone,
	PiCheckCircleDuotone,
	PiClockDuotone,
	PiCurrencyDollarDuotone,
	PiShoppingCartDuotone,
	PiStudentDuotone,
} from 'react-icons/pi';

import Loading from '@/components/commons/Loading';
import { SummaryCard } from '@/components/commons/SummaryCard';
import { SystemReport } from '@/schemas/revenue.schema';
import { getSystemReport } from '@/services/api/revenue';

export const ListSummaryCardDashboard = () => {
	const [report, setReport] = useState<SystemReport | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchReport = async () => {
			try {
				const data = await getSystemReport();
				setReport(data);
			} catch (error) {
				console.error('Failed to fetch system report:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchReport();
	}, []);

	if (loading) {
		return <Loading className="w-full my-6" />;
	}

	if (!report) {
		return <div className="text-center text-red-500">Failed to load data.</div>;
	}

	return (
		<div className="flex flex-col gap-6 justify-center items-center mb-6">
			{/* Hàng đầu tiên */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<SummaryCard
					icon={<PiCurrencyDollarDuotone className="w-8 h-8 text-rose-500" />}
					value={new Intl.NumberFormat('vi-VN', {
						style: 'currency',
						currency: 'VND',
					}).format(report.totalRevenue)}
					label="Total Revenue"
					bgColor="bg-rose-100"
				/>
				<SummaryCard
					icon={<PiBankDuotone className="w-8 h-8 text-violet-500" />}
					value={new Intl.NumberFormat('vi-VN', {
						style: 'currency',
						currency: 'VND',
					}).format(report.systemRevenue)}
					label="System Revenue"
					bgColor="bg-violet-100"
				/>
				<SummaryCard
					icon={<PiStudentDuotone className="w-8 h-8 text-orange-500" />}
					value={report.totalLearners}
					label="Total Learners"
					bgColor="bg-orange-50"
				/>
				<SummaryCard
					icon={
						<PiChalkboardTeacherDuotone className="w-8 h-8 text-green-500" />
					}
					value={report.totalTeachers}
					label="Total Teachers"
					bgColor="bg-green-100"
				/>
			</div>

			{/* Hàng thứ hai */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<SummaryCard
					icon={<PiBookOpenDuotone className="w-8 h-8 text-red-500" />}
					value={report.totalCourses}
					label="Total Courses"
					bgColor="bg-red-50"
				/>
				<SummaryCard
					icon={<PiClockDuotone className="w-8 h-8 text-green-500" />}
					value={report.totalCoursesActive}
					label="Total Courses Active"
					bgColor="bg-green-100"
				/>
				<SummaryCard
					icon={<PiShoppingCartDuotone className="w-8 h-8 text-gray-500" />}
					value={report.totalCoursesSold}
					label="Total Courses Sold"
					bgColor="bg-gray-100"
				/>
				<SummaryCard
					icon={<PiCheckCircleDuotone className="w-8 h-8 text-violet-500" />}
					value={report.totalCoursesCompleted}
					label="Total Courses Completed"
					bgColor="bg-violet-100"
				/>
			</div>
		</div>
	);
};
