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
		<Card className="flex flex-col flex-1">
			<div className="flex gap-10 justify-between items-center px-5 py-4 w-full bg-white shadow-sm max-md:max-w-full">
				<CardTitle>{title}</CardTitle>
			</div>
			<CardContent className="mt-4 py-3">
				<ChartComponent chartData={chartData} chartConfig={chartConfig} />
			</CardContent>
			<CardFooter>
				<div className="flex w-full items-start gap-2 text-sm">
					<div className="grid gap-2">
						<div className="flex items-center gap-2 font-medium leading-none">
							Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
						</div>
						<div className="flex items-center gap-2 leading-none text-muted-foreground">
							January - June 2024
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
};
