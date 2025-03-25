'use client';

import {
	PiCheckCircleDuotone,
	PiCreditCardDuotone,
	PiCrownSimpleDuotone,
	PiGraduationCapDuotone,
	PiHourglassDuotone,
	PiNotebookDuotone,
	PiReceiptDuotone,
	PiStackDuotone,
} from 'react-icons/pi';

import { SummaryCard } from '@/components/commons/SummaryCard';
import { TeacherReport } from '@/schemas/revenue.schema';

export const ListSummaryCardDashboard = ({
	report,
}: {
	report: TeacherReport;
}) => {
	return (
		<div className="flex flex-col gap-6 justify-center items-center mb-6">
			{/* Hàng đầu tiên */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<SummaryCard
					icon={<PiNotebookDuotone className="w-8 h-8 text-blue-500" />}
					value={report.totalCourses}
					label="Total Courses"
					bgColor="bg-blue-100"
				/>
				<SummaryCard
					icon={<PiHourglassDuotone className="w-8 h-8 text-yellow-500" />}
					value={report.totalCoursesPending}
					label="Pending Courses"
					bgColor="bg-yellow-100"
				/>
				<SummaryCard
					icon={<PiGraduationCapDuotone className="w-8 h-8 text-orange-500" />}
					value={report.totalCoursesSold}
					label="Courses Sold"
					bgColor="bg-orange-100"
				/>
				<SummaryCard
					icon={<PiCheckCircleDuotone className="w-8 h-8 text-green-500" />}
					value={report.totalCoursesCompleted}
					label="Completed Courses"
					bgColor="bg-green-100"
				/>
			</div>

			{/* Hàng thứ hai */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<SummaryCard
					icon={<PiStackDuotone className="w-8 h-8 text-orange-500" />}
					value={new Intl.NumberFormat('vi-VN', {
						style: 'currency',
						currency: 'VND',
					}).format(report.revenues.totalRevenue)}
					label="Total Revenue"
					bgColor="bg-orange-100"
				/>
				<SummaryCard
					icon={<PiReceiptDuotone className="w-8 h-8 text-violet-500" />}
					value={new Intl.NumberFormat('vi-VN', {
						style: 'currency',
						currency: 'VND',
					}).format(report.revenues.serviceFee)}
					label="Service Fee"
					bgColor="bg-violet-100"
				/>
				<SummaryCard
					icon={<PiCreditCardDuotone className="w-8 h-8 text-rose-500" />}
					value={new Intl.NumberFormat('vi-VN', {
						style: 'currency',
						currency: 'VND',
					}).format(report.revenues.totalWithdrawn)}
					label="Total Withdrawals"
					bgColor="bg-rose-50"
				/>
				<SummaryCard
					icon={<PiCrownSimpleDuotone className="w-8 h-8 text-green-500" />}
					value={new Intl.NumberFormat('vi-VN', {
						style: 'currency',
						currency: 'VND',
					}).format(report.revenues.availableForWithdraw)}
					label="Current Balance"
					bgColor="bg-green-100"
				/>
			</div>
		</div>
	);
};
