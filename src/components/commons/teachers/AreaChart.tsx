// ChartComponent.tsx
import React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

interface ChartComponentProps {
	chartData: { month: string; desktop: number }[];
	chartConfig: {
		desktop: {
			label: string;
			color: string;
		};
	};
	fill?: string;
	stroke?: string;
}

export const ChartComponent: React.FC<ChartComponentProps> = ({
	chartData,
	chartConfig,
	fill = '#efeefe',
	stroke = '#564ffd',
}) => {
	return (
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
					fill={fill}
					fillOpacity={0.5}
					stroke={stroke}
					strokeWidth={3}
				/>
			</AreaChart>
		</ChartContainer>
	);
};
