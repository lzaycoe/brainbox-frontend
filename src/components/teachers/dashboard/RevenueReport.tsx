/*
 *  ======================================================================
 *  Copyright (C) 2025 - lzaycoe (Lazy Code)
 *  ======================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  ======================================================================
 */
'use client';

import {
	PiCardsDuotone,
	PiChatCircleDotsDuotone,
	PiStarDuotone,
} from 'react-icons/pi';

import { AreaChartCard } from '@/components/commons/teachers/AreaChartCard';
import { BarChartCard } from '@/components/commons/teachers/BarChartCard';
import { RecentActivity } from '@/components/commons/teachers/RecentActivity';

/*
 *  ======================================================================
 *  Copyright (C) 2025 - lzaycoe (Lazy Code)
 *  ======================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  ======================================================================
 */

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
		<section className="flex flex-wrap gap-6 items-start mb-6">
			<div className="flex overflow-hidden flex-col min-w-[240px] w-[420px] max-md:max-w-full h-full">
				<RecentActivity title="Recent Activity" activities={activities} />
			</div>
			<div className="flex overflow-hidden flex-col min-w-[240px] w-[532px] max-md:max-w-full h-full">
				<AreaChartCard
					title="Revenue"
					chartData={chartData}
					chartConfig={chartConfig}
				/>
			</div>
			<div className="flex overflow-hidden flex-col min-w-[240px] w-[320px] max-md:max-w-full h-full">
				<BarChartCard title="Profile View" chartData={chartData} />
			</div>
		</section>
	);
};
