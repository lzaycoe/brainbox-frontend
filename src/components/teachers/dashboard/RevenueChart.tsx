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
import { IoIosArrowDown } from 'react-icons/io';

export const RevenueChart = () => {
	return (
		<div className="flex flex-wrap gap-6 items-start my-6">
			<div className="flex overflow-hidden flex-col min-w-[240px] w-[424px] max-md:max-w-full">
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
						<div className="flex gap-3 justify-center items-start px-5 py-3 max-md:max-w-full">
							<div className="flex gap-2.5 items-center p-2 w-8 h-8 bg-orange-500 rounded-[100px]"></div>
							<div className="flex flex-col min-w-[240px] w-[340px]">
								<div className="text-sm tracking-normal leading-6 text-neutral-800">
									<span className="font-semibold leading-5 text-neutral-800">
										Kevin
									</span>{' '}
									comments on your lecture{' '}
									<span className="text-neutral-800">
										“What is ux” in “2021 ui/ux design with figma”
									</span>
								</div>
								<div className="mt-1.5 text-xs leading-none text-gray-400">
									Just now
								</div>
							</div>
						</div>
						<div className="flex gap-3 justify-center items-start px-5 py-3 mt-4 max-md:max-w-full">
							<div className="flex gap-2.5 items-center p-2 w-8 h-8 bg-orange-500 rounded-[100px]"></div>
							<div className="flex flex-col min-w-[240px] w-[340px]">
								<div className="text-sm tracking-normal leading-6 text-neutral-800">
									<span className="font-semibold leading-5 text-neutral-800">
										John
									</span>{' '}
									give a 5 star rating on your course{' '}
									<span className="text-neutral-800">
										“2021 ui/ux design with figma”
									</span>
								</div>
								<div className="mt-1.5 text-xs leading-none text-gray-400">
									5 mins ago
								</div>
							</div>
						</div>
						<div className="flex gap-3 justify-center items-start px-5 py-3 mt-4 max-md:max-w-full">
							<div className="flex gap-2.5 items-center p-2 w-8 h-8 bg-orange-500 rounded-[100px]"></div>
							<div className="flex flex-col min-w-[240px] w-[340px]">
								<div className="text-sm tracking-normal leading-6 text-neutral-800">
									<span className="font-semibold leading-5 text-neutral-800">
										Sraboni
									</span>{' '}
									purchase your course{' '}
									<span className="text-neutral-800">
										“2021 ui/ux design with figma”
									</span>
								</div>
								<div className="mt-1.5 text-xs leading-none text-gray-400">
									6 mins ago
								</div>
							</div>
						</div>
						<div className="flex gap-3 justify-center items-start px-5 py-3 mt-4 max-md:max-w-full">
							<div className="flex gap-2.5 items-center p-2 w-8 h-8 bg-orange-500 rounded-[100px]"></div>
							<div className="text-sm tracking-normal leading-6 text-gray-600 min-w-[240px] w-[340px]">
								Arif purchase your course “2021 ui/ux design with figma”
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex overflow-hidden flex-col min-w-[240px] w-[536px] max-md:max-w-full">
				<div className="flex flex-col pb-5 w-full bg-white max-md:max-w-full">
					<div className="flex flex-wrap gap-10 justify-between items-center px-5 py-4 w-full bg-white shadow-sm max-md:max-w-full">
						<div className="self-stretch my-auto text-base font-medium leading-none text-neutral-800">
							Revenue
						</div>
						<div className="flex gap-2 items-center self-stretch my-auto text-sm tracking-normal leading-loose text-right text-gray-500">
							<div className="self-stretch my-auto">This month</div>
						</div>
					</div>
					<div className="flex flex-wrap gap-2.5 mx-5 text-xs leading-none text-gray-400 max-md:mr-2.5 max-md:max-w-full">
						<div className="flex flex-col justify-between self-start mt-3.5 whitespace-nowrap min-h-[334px] max-md:hidden">
							<div>1m</div>
							<div className="mt-9">500k</div>
							<div className="mt-9">100k</div>
							<div className="mt-9">50k</div>
							<div className="mt-9">10k</div>
							<div className="mt-9">1k</div>
							<div className="mt-9">0</div>
						</div>
						<div className="flex flex-col grow shrink-0 basis-0 w-fit max-md:max-w-full">
							<div className="shrink-0 ml-32 w-px bg-indigo-600 border border-indigo-600 border-dashed h-[312px] max-md:ml-2.5"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
