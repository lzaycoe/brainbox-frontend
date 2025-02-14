import React from 'react';
import { IconType } from 'react-icons';

interface StatisticItemProps {
	icon: IconType;
	iconColor?: string;
	alt: string;
	text1: string;
	text2: string;
}

const StatisticItem: React.FC<StatisticItemProps> = ({
	icon: Icon,
	iconColor = '#000',
	alt,
	text1,
	text2,
}) => {
	return (
		<div className="flex gap-4">
			<div
				aria-label={alt}
				className="object-contain w-10 h-10 flex items-center justify-center"
			>
				<Icon className="w-full h-full" style={{ color: iconColor }} />
			</div>
			<div>
				<div className="text-3xl font-semibold text-neutral-800">{text1}</div>
				<div className="mt-1 text-sm text-gray-600">{text2}</div>
			</div>
		</div>
	);
};

export default StatisticItem;
