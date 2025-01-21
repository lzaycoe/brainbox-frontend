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
