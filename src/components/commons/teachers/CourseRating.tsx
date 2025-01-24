import React from 'react';
import { PiStarDuotone } from 'react-icons/pi';

import { ChartComponent } from '@/components/commons/teachers/AreaChart';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

interface CourseRatingProps {
	title: string;
	chartData: { month: string; desktop: number }[];
	chartConfig: {
		desktop: {
			label: string;
			color: string;
		};
	};
}

export const CourseRating: React.FC<CourseRatingProps> = ({
	title,
	chartData,
	chartConfig,
}) => {
	return (
		<Card className="flex flex-col flex-1">
			<div className="flex gap-10 justify-between items-center px-5 py-4 w-full bg-white shadow-sm">
				<CardTitle>{title}</CardTitle>
			</div>
			<CardContent className="py-5">
				<div className="flex gap-6 justify-center items-end max-sm:flex-col max-sm:items-center">
					<div
						className="flex flex-col justify-center items-center p-5 bg-orange-50 h-[180px] w-[180px]"
						aria-label="Average Rating Score"
					>
						<div
							className="text-4xl font-semibold tracking-tight leading-tight text-center text-neutral-800"
							aria-label="Rating: 4.6 out of 5"
						>
							4.6
						</div>
						<div className="flex flex-col items-center mt-4 w-full">
							<div
								className="flex gap-0.5 items-center"
								aria-label="4.6 out of 5 stars"
							>
								<PiStarDuotone className="w-6 h-6 text-amber-500" />
								<PiStarDuotone className="w-6 h-6 text-amber-500" />
								<PiStarDuotone className="w-6 h-6 text-amber-500" />
								<PiStarDuotone className="w-6 h-6 text-amber-500" />
								<PiStarDuotone className="w-6 h-6 text-amber-500" />
							</div>
							<div className="mt-2 text-sm font-medium tracking-normal leading-none text-center text-neutral-800">
								Overall Rating
							</div>
						</div>
					</div>
					<div aria-label="Rating trend graph" className="w-full flex-1">
						<ChartComponent
							chartData={chartData}
							chartConfig={chartConfig}
							fill="#fff8f2"
							stroke="#fd8e1f"
						/>
					</div>
				</div>
				<hr className="mt-6 w-full h-px bg-gray-200 border-[none]"></hr>
				<ul
					className="flex flex-col gap-3 mt-6 w-[496px] max-sm:w-full"
					aria-label="Rating distribution"
				>
					<li className="flex gap-3 justify-between items-center w-full">
						<div className="flex gap-1.5 items-center">
							<div aria-label="5 stars" className="flex gap-1.5 items-center">
								<PiStarDuotone className="text-amber-500" />
								<PiStarDuotone className="text-amber-500" />
								<PiStarDuotone className="text-amber-500" />
								<PiStarDuotone className="text-amber-500" />
								<PiStarDuotone className="text-amber-500" />
							</div>
							<div className="w-12 text-sm tracking-normal leading-loose text-gray-600">
								5 Star
							</div>
						</div>
						<div className="flex flex-1 gap-3 items-center max-sm:min-w-0">
							<div className="w-full">
								<div
									className="overflow-hidden w-full h-2 bg-gray-200 rounded"
									aria-valuenow={56}
									aria-valuemin={0}
									aria-valuemax={100}
								>
									<div className="h-full bg-amber-500 w-[56%]"></div>
								</div>
							</div>
							<div className="text-sm font-medium tracking-normal leading-none text-right min-w-[36px] text-neutral-800">
								56%
							</div>
						</div>
					</li>
					<li className="flex gap-3 justify-between items-center w-full">
						<div className="flex gap-1.5 items-center">
							<div aria-label="4 stars" className="flex gap-1.5 items-center">
								<PiStarDuotone className="text-amber-500" />
								<PiStarDuotone className="text-amber-500" />
								<PiStarDuotone className="text-amber-500" />
								<PiStarDuotone className="text-amber-500" />
								<PiStarDuotone />
							</div>
							<div className="w-12 text-sm tracking-normal leading-loose text-gray-600">
								4 Star
							</div>
						</div>
						<div className="flex flex-1 gap-3 items-center max-sm:min-w-0">
							<div className="w-full">
								<div
									className="overflow-hidden w-full h-2 bg-gray-200 rounded"
									aria-valuenow={37}
									aria-valuemin={0}
									aria-valuemax={100}
								>
									<div className="h-full bg-amber-500 w-[37%]"></div>
								</div>
							</div>
							<div className="text-sm font-medium tracking-normal leading-none text-right min-w-[36px] text-neutral-800">
								37%
							</div>
						</div>
					</li>
					<li className="flex gap-3 justify-between items-center w-full">
						<div className="flex gap-1.5 items-center">
							<div aria-label="3 stars" className="flex gap-1.5 items-center">
								<PiStarDuotone className="text-amber-500" />
								<PiStarDuotone className=" text-amber-500" />
								<PiStarDuotone className="text-amber-500" />
								<PiStarDuotone />
								<PiStarDuotone />
							</div>
							<div className="w-12 text-sm tracking-normal leading-loose text-gray-600">
								3 Star
							</div>
						</div>
						<div className="flex flex-1 gap-3 items-center max-sm:min-w-0">
							<div className="w-full">
								<div
									className="overflow-hidden w-full h-2 bg-gray-200 rounded"
									aria-valuenow={8}
									aria-valuemin={0}
									aria-valuemax={100}
								>
									<div className="h-full bg-amber-500 w-[8%]"></div>
								</div>
							</div>
							<div className="text-sm font-medium tracking-normal leading-none text-right min-w-[36px] text-neutral-800">
								8%
							</div>
						</div>
					</li>
					<li className="flex gap-3 justify-between items-center w-full">
						<div className="flex gap-1.5 items-center">
							<div aria-label="2 stars" className="flex gap-1.5 items-center">
								<PiStarDuotone className="text-amber-500" />
								<PiStarDuotone className="text-amber-500" />
								<PiStarDuotone />
								<PiStarDuotone />
								<PiStarDuotone />
							</div>
							<div className="w-12 text-sm tracking-normal leading-loose text-gray-600">
								2 Star
							</div>
						</div>
						<div className="flex flex-1 gap-3 items-center max-sm:min-w-0">
							<div className="w-full">
								<div
									className="overflow-hidden w-full h-2 bg-gray-200 rounded"
									aria-valuenow={1}
									aria-valuemin={0}
									aria-valuemax={100}
								>
									<div className="h-full bg-amber-500 w-[1%]"></div>
								</div>
							</div>
							<div className="text-sm font-medium tracking-normal leading-none text-right min-w-[36px] text-neutral-800">
								1%
							</div>
						</div>
					</li>
					<li className="flex gap-3 justify-between items-center w-full">
						<div className="flex gap-1.5 items-center">
							<div aria-label="1 star" className="flex gap-1.5 items-center">
								<PiStarDuotone className="text-amber-500" />
								<PiStarDuotone />
								<PiStarDuotone />
								<PiStarDuotone />
								<PiStarDuotone />
							</div>
							<div className="w-12 text-sm tracking-normal leading-loose text-gray-600">
								1 Star
							</div>
						</div>
						<div className="flex flex-1 gap-3 items-center max-sm:min-w-0">
							<div className="w-full">
								<div
									className="overflow-hidden w-full h-2 bg-gray-200 rounded"
									aria-valuenow={0.5}
									aria-valuemin={0}
									aria-valuemax={100}
								>
									<div className="h-full bg-amber-500 w-[0.5%]"></div>
								</div>
							</div>
							<div className="text-sm font-medium tracking-normal leading-none text-right min-w-[36px] text-neutral-800">
								&lt;1%
							</div>
						</div>
					</li>
				</ul>
			</CardContent>
		</Card>
	);
};
