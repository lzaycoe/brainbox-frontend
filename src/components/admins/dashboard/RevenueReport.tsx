'use client';

import {
	PiCardsDuotone,
	PiChatCircleDotsDuotone,
	PiStarDuotone,
} from 'react-icons/pi';

import { ProfileViewChartCard } from '@/components/commons/teachers/ProfileViewChartCard';
import { RecentActivity } from '@/components/commons/teachers/RecentActivity';
import { RevenueChartCard } from '@/components/commons/teachers/RevenueChartCard';

const activities = [
	{
		icon: <PiChatCircleDotsDuotone className="text-white" />,
		user: 'Kevin',
		action: 'comments on your lecture',
		target: '“What is ux” in “2021 ui/ux design with figma”',
		time: 'Just now',
	},
	{
		icon: <PiStarDuotone className="text-white" />,
		user: 'John',
		action: 'give a 5 star rating on your course',
		target: '“2021 ui/ux design with figma”',
		time: '5 mins ago',
	},
	{
		icon: <PiCardsDuotone className="text-white" />,
		user: 'Sraboni',
		action: 'purchase your course',
		target: '“2021 ui/ux design with figma”',
		time: '6 mins ago',
	},
	{
		icon: <PiCardsDuotone className="text-white" />,
		user: 'Arif',
		action: 'purchase your course',
		target: '“2021 ui/ux design with figma”',
		time: '10 mins ago',
	},
];

const chartData = [
	{ month: 'January', desktop: 186 },
	{ month: 'February', desktop: 305 },
	{ month: 'March', desktop: 237 },
	{ month: 'April', desktop: 73 },
	{ month: 'May', desktop: 209 },
	{ month: 'June', desktop: 214 },
];

const chartConfig = {
	desktop: {
		label: 'LazyCode',
		color: 'hsl(var(--chart-1))',
	},
};

export const RevenueReport = () => {
	return (
		<section className="flex flex-wrap gap-6 items-start mb-6 max-lg:flex-col">
			{/* Recent Activity Card */}
			<div className="flex overflow-hidden flex-col min-w-[240px] w-[420px] max-md:w-full h-full">
				<RecentActivity title="Recent Activity" activities={activities} />
			</div>

			{/* Revenue Chart Card */}
			<div className="flex overflow-hidden flex-col min-w-[240px] w-[530px] max-md:w-full h-full">
				<RevenueChartCard
					title="Revenue"
					chartData={chartData}
					chartConfig={chartConfig}
				/>
			</div>

			{/* Profile View Chart Card */}
			<div className="flex overflow-hidden flex-col min-w-[240px] w-[320px] max-md:w-full h-full">
				<ProfileViewChartCard title="Profile View" chartData={chartData} />
			</div>
		</section>
	);
};
