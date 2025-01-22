/* eslint-disable @typescript-eslint/no-unused-vars */
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

import { BarChart as LucideBarChart, TrendingUp } from 'lucide-react';
import {
	Bar,
	BarChart,
	CartesianGrid,
	LabelList,
	ResponsiveContainer,
	Tooltip,
	XAxis,
} from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

/* eslint-disable @typescript-eslint/no-unused-vars */
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

interface BarChartCardProps {
	chartData: { month: string; desktop: number }[];
}

export const BarChartCard: React.FC<BarChartCardProps> = ({ chartData }) => {
	return (
		<div className="flex overflow-hidden flex-col min-w-[240px] w-[320px] max-md:max-w-full">
			<div className="flex flex-col w-full bg-white max-md:max-w-full">
				<Card>
					<CardHeader>
						<CardTitle>Bar Chart - Label</CardTitle>
						<CardDescription>January - June 2024</CardDescription>
					</CardHeader>
					<CardContent>
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
								<Bar
									dataKey="desktop"
									fill="hsl(var(--chart-1))"
									radius={8}
									barSize={30}
								>
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
			</div>
		</div>
	);
};
