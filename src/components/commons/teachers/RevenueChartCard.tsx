'use client';

import { TrendingUp } from 'lucide-react';

import { ChartComponent } from '@/components/commons/teachers/AreaChart';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';

interface RevenueChartCardProps {
	title: string;
	chartData: { month: string; desktop: number }[];
	chartConfig: {
		desktop: {
			label: string;
			color: string;
		};
	};
}

export const RevenueChartCard: React.FC<RevenueChartCardProps> = ({
	title,
	chartData,
	chartConfig,
}) => {
	return (
		<Card className="flex flex-col flex-1 max-w-full max-md:rounded-md">
			{/* Header */}
			<div className="flex gap-10 justify-between items-center px-5 py-4 w-full bg-white shadow-sm max-md:flex-col max-md:items-start max-md:gap-2">
				<CardTitle className="text-base max-md:text-sm">{title}</CardTitle>
			</div>
			{/* Chart Content */}
			<CardContent className="mt-4 py-3 max-md:px-3 max-md:py-2">
				<ChartComponent chartData={chartData} chartConfig={chartConfig} />
			</CardContent>
			{/* Footer */}
			<CardFooter className="px-5 py-3 max-md:px-3 max-md:py-2">
				<div className="flex w-full flex-col items-start gap-2 text-sm max-md:text-xs">
					<div className="grid gap-2">
						<div className="flex items-center gap-2 font-medium leading-none text-neutral-800">
							Trending up by 5.2% this month{' '}
							<TrendingUp className="h-4 w-4 max-md:h-3 max-md:w-3" />
						</div>
						<div className="flex items-center gap-2 leading-none text-gray-400">
							January - June 2024
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};
