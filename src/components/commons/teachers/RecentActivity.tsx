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

import { JSX } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

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

interface ActivityItem {
	icon: JSX.Element;
	user: string;
	action: string;
	target: string;
	time: string;
}

interface RecentActivityProps {
	activities: ActivityItem[];
}

export const RecentActivity: React.FC<RecentActivityProps> = ({
	activities,
}) => {
	return (
		<div className="flex overflow-hidden flex-col min-w-[240px] w-[420px] max-md:max-w-full">
			<div className="flex flex-col w-full bg-white max-md:max-w-full">
				<div className="flex gap-10 justify-between items-center px-5 py-4 w-full bg-white shadow-sm max-md:max-w-full">
					<div className="self-stretch my-auto text-base font-medium leading-none text-neutral-800">
						Recent Activity
					</div>
					<div className="flex gap-2 items-center self-stretch my-auto text-sm tracking-normal leading-loose text-right text-gray-500 whitespace-nowrap">
						<div className="self-stretch my-auto">Today</div>
						<IoIosArrowDown />
					</div>
				</div>
				<div className="flex flex-col max-md:max-w-full">
					{/* Activity Items */}
					{activities.map((item, idx) => (
						<div
							key={idx}
							className="flex gap-3 justify-center items-start px-5 py-3 mt-4 max-md:max-w-full"
						>
							<div className="flex gap-2.5 items-center p-2 w-8 h-8 bg-orange-500 rounded-[100px]">
								{item.icon}
							</div>
							<div className="flex flex-col min-w-[240px] w-[340px]">
								<div className="text-sm tracking-normal leading-6 text-neutral-800">
									<span className="font-semibold leading-5 text-neutral-800">
										{item.user}
									</span>{' '}
									{item.action}{' '}
									<span className="text-neutral-800">{item.target}</span>
								</div>
								<div className="mt-1.5 text-xs leading-none text-gray-400">
									{item.time}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
