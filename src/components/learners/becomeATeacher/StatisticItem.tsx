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
