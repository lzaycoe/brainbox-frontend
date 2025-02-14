import { JSX } from 'react';

interface CardProps {
	icon: JSX.Element;
	value: number | string;
	label: string;
	bgColor: string;
}

export const SummaryCard: React.FC<CardProps> = ({
	icon,
	value,
	label,
	bgColor,
}) => {
	return (
		<div className="flex gap-6 items-center p-6 bg-white min-w-[240px] max-md:px-5">
			<div
				className={`flex gap-2.5 items-center self-stretch p-3.5 my-auto ${bgColor} h-[60px] w-[60px]`}
			>
				{icon}
			</div>
			<div className="flex flex-col justify-center self-stretch my-auto w-[180px]">
				<div className="text-2xl leading-none text-neutral-800">{value}</div>
				<div className="mt-1.5 text-sm tracking-normal leading-loose text-gray-600">
					{label}
				</div>
			</div>
		</div>
	);
};
