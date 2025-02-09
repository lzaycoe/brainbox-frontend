'use client';

import { TrendingUp } from 'lucide-react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	ResponsiveContainer,
	Tooltip,
	XAxis,
} from 'recharts';

import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';

interface ProfileViewChartCardProps {
	title: string;
	chartData: { month: string; desktop: number }[];
}

export const ProfileViewChartCard: React.FC<ProfileViewChartCardProps> = ({
	title,
	chartData,
}) => {
	return (
		<Card className="flex flex-col flex-1">
			<div className="flex gap-10 justify-between items-center px-5 py-4 w-full bg-white shadow-sm max-md:max-w-full">
				<CardTitle>{title}</CardTitle>
			</div>
			<CardContent className="mt-4 py-3">
				<ResponsiveContainer width="100%" height={300}>
					<BarChart
						data={chartData}
						margin={{
							top: 20,
						}}
					>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							tickMargin={5}
							axisLine={false}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<Tooltip />
						<Bar dataKey="desktop" fill="#23bd33" radius={8} barSize={30}>
							<LabelList
								position="top"
								offset={12}
								className="fill-foreground"
								fontSize={12}
							/>
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					<strong>$7,443</strong>
					<TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					USD Dollar you earned.
				</div>
			</CardFooter>
		</Card>
	);
};
