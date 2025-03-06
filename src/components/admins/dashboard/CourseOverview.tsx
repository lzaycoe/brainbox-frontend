'use client';

import { CourseOverviewChartCard } from '@/components/commons/teachers/CourseOverviewChartCard';
import { CourseRating } from '@/components/commons/teachers/CourseRating';

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
export const CourseOverview = () => {
	return (
		<section className="flex flex-wrap gap-6 items-start mb-6">
			<div className="flex overflow-hidden flex-col min-w-[240px] w-[550px] max-md:max-w-full h-full">
				<CourseRating
					title="Overall Course Rating"
					chartData={chartData}
					chartConfig={chartConfig}
				/>
			</div>
			<div className="flex overflow-hidden flex-col min-w-[240px] w-[745px] max-md:max-w-full h-full">
				<CourseOverviewChartCard title="Course Overview" />
			</div>
		</section>
	);
};
