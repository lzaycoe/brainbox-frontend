import { RevenueChartCard } from '@/components/commons/teachers/RevenueChartCard';

import { CreditCard } from './CreditCard';

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
		<section className="flex flex-wrap gap-6 justify-center items-start mb-6 max-lg:flex-col">
			{/* Revenue Chart Card */}
			<div className="flex overflow-hidden flex-col min-w-[240px] w-[872px] max-md:w-full h-full">
				<RevenueChartCard
					title="Revenue"
					chartData={chartData}
					chartConfig={chartConfig}
				/>
			</div>

			<div className="flex overflow-hidden flex-col min-w-[240px] w-[424px] max-md:w-full h-full">
				<CreditCard />
			</div>
		</section>
	);
};
