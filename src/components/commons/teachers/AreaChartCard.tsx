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

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

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

interface AreaChartCardProps {
	title: string;
	chartData: { month: string; desktop: number }[];
	chartConfig: {
		desktop: {
			label: string;
			color: string;
		};
	};
}

export const AreaChartCard: React.FC<AreaChartCardProps> = ({
	title,
	chartData,
	chartConfig,
}) => {
	return (
		<div className="flex overflow-hidden flex-col min-w-[240px] w-[532px] max-md:max-w-full h-full">
			<Card className="flex flex-col flex-1">
				<div className="flex gap-10 justify-between items-center px-5 py-4 w-full bg-white shadow-sm max-md:max-w-full">
					<CardTitle>{title}</CardTitle>
				</div>
				<CardContent className="mt-4 py-3">
					<ChartContainer config={chartConfig}>
						<AreaChart
							data={chartData}
							margin={{
								left: 12,
								right: 12,
							}}
						>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="month"
								tickLine={false}
								axisLine={false}
								tickMargin={8}
								tickFormatter={(value) => value.slice(0, 3)}
							/>
							<ChartTooltip
								cursor={false}
								content={<ChartTooltipContent indicator="line" />}
							/>
							<Area
								dataKey="desktop"
								type="natural"
								fill="#efeefe"
								fillOpacity={0.5}
								stroke="#564ffd"
								strokeWidth={3}
							/>
						</AreaChart>
					</ChartContainer>
				</CardContent>
				<CardFooter>
					<div className="flex w-full items-start gap-2 text-sm">
						<div className="grid gap-2">
							<div className="flex items-center gap-2 font-medium leading-none">
								Trending up by 5.2% this month{' '}
								<TrendingUp className="h-4 w-4" />
							</div>
							<div className="flex items-center gap-2 leading-none text-muted-foreground">
								January - June 2024
							</div>
						</div>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
};
