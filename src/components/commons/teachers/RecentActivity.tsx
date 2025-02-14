'use client';

import { JSX } from 'react';

import { Card, CardTitle } from '@/components/ui/card';

interface ActivityItem {
	icon: JSX.Element;
	user: string;
	action: string;
	target: string;
	time: string;
}

interface RecentActivityProps {
	title: string;
	activities: ActivityItem[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
	title,
	activities,
}) => {
	return (
		<Card className="flex flex-col flex-1">
			{/* Title Section */}
			<div className="flex gap-10 justify-between items-center px-5 py-4 w-full bg-white shadow-sm max-md:px-3 max-md:py-3">
				<CardTitle className="text-lg max-md:text-base">{title}</CardTitle>
			</div>

			{/* Activity List */}
			<div className="flex flex-col max-md:gap-2">
				{activities.map((item) => (
					<div
						key={item.time}
						className="flex gap-3 items-start px-5 py-3 mt-4 max-md:gap-2 max-md:px-3 max-md:py-2"
					>
						{/* Icon */}
						<div className="flex items-center justify-center p-2 w-8 h-8 bg-orange-500 rounded-full max-md:w-6 max-md:h-6">
							{item.icon}
						</div>

						{/* Text Section */}
						<div className="flex flex-col min-w-[240px] w-[340px] max-md:min-w-full max-md:w-full">
							<div className="text-sm leading-6 text-neutral-800 max-md:text-xs">
								<span className="font-semibold">{item.user}</span> {item.action}{' '}
								<span className="text-neutral-800">{item.target}</span>
							</div>
							<div className="mt-1.5 text-xs text-gray-400 max-md:mt-1">
								{item.time}
							</div>
						</div>
					</div>
				))}
			</div>
		</Card>
	);
};
