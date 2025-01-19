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
import Image from 'next/image';
import React from 'react';
import { FiPenTool } from 'react-icons/fi';
import { HiChip } from 'react-icons/hi';
import {
	PiBugDroidBold,
	PiCameraDuotone,
	PiChartBarHorizontal,
	PiCreditCardDuotone,
	PiFirstAidKitDuotone,
	PiHandshakeDuotone,
	PiHeadphonesDuotone,
	PiMegaphoneSimpleDuotone,
	PiPackageDuotone,
	PiReceiptDuotone,
} from 'react-icons/pi';

import { Button } from '@/components/ui/button';

export const BrowseCategories = () => {
	return (
		<section
			className="flex flex-col justify-center items-center px-72 py-20 max-md:px-5"
			aria-labelledby="browse-categories-title"
		>
			<h2
				id="browse-categories-title"
				className="text-4xl font-semibold tracking-tight leading-tight text-neutral-800"
			>
				Browse top category
			</h2>
			<div className="flex flex-col mt-10 max-md:max-w-full">
				<div className="grid grid-cols-4 gap-6 max-md:grid-cols-1">
					<article className="flex gap-5 justify-center items-center p-5 bg-violet-100 min-w-[240px]">
						<div className="flex gap-2.5 items-center self-stretch p-4 my-auto w-16 h-16 bg-white">
							<HiChip className="object-contain w-8 h-8" color="#564FFD" />
						</div>
						<div className="flex flex-col self-stretch my-auto w-[188px]">
							<h3 className="text-base font-medium leading-none text-neutral-800">
								Label
							</h3>
							<p className="mt-2 text-sm tracking-normal leading-loose text-gray-500">
								63,476 Courses
							</p>
						</div>
					</article>
					<article className="flex gap-5 justify-center items-center p-5 bg-green-100 min-w-[240px]">
						<div className="flex gap-2.5 items-center self-stretch p-4 my-auto w-16 h-16 bg-white">
							<PiHandshakeDuotone
								className="object-contain w-8 h-8"
								color="#22C55E"
							/>
						</div>
						<div className="flex flex-col self-stretch my-auto w-[188px]">
							<h3 className="text-base font-medium leading-none text-neutral-800">
								Business
							</h3>
							<p className="mt-2 text-sm tracking-normal leading-loose text-gray-500">
								52,822 Courses
							</p>
						</div>
					</article>
					<article className="flex gap-5 justify-center items-center p-5 bg-orange-50 min-w-[240px]">
						<div className="flex gap-2.5 items-center self-stretch p-4 my-auto w-16 h-16 bg-white">
							<PiCreditCardDuotone
								className="object-contain w-8 h-8"
								color="#F59E0B"
							/>
						</div>
						<div className="flex flex-col self-stretch my-auto w-[188px]">
							<h3 className="text-base font-medium leading-none text-neutral-800">
								Finance & Accounting
							</h3>
							<p className="mt-2 text-sm tracking-normal leading-loose text-gray-500">
								33,841 Courses
							</p>
						</div>
					</article>
					<article className="flex gap-5 justify-center items-center p-5 bg-rose-50 min-w-[240px]">
						<div className="flex gap-2.5 items-center self-stretch p-4 my-auto w-16 h-16 bg-white">
							<PiChartBarHorizontal
								className="object-contain w-8 h-8"
								color="#E34444"
							/>
						</div>
						<div className="flex flex-col self-stretch my-auto w-[188px]">
							<h3 className="text-base font-medium leading-none text-neutral-800">
								IT & Software
							</h3>
							<p className="mt-2 text-sm tracking-normal leading-loose text-gray-500">
								22,649 Courses
							</p>
						</div>
					</article>
					<article className="flex gap-5 justify-center items-center p-5 bg-white shadow-2xl min-w-[240px]">
						<div className="flex gap-2.5 items-center self-stretch p-4 my-auto w-16 h-16 bg-orange-500">
							<PiBugDroidBold
								className="object-contain w-8 h-8"
								color="#FFFFFF"
							/>
						</div>
						<div className="flex flex-col self-stretch my-auto w-[188px]">
							<h3 className="text-base font-medium leading-none text-neutral-800">
								Personal Development
							</h3>
							<p className="mt-2 text-sm tracking-normal leading-loose text-gray-500">
								20,126 Courses
							</p>
						</div>
					</article>
					<article className="flex gap-5 justify-center items-center p-5 bg-slate-100 min-w-[240px]">
						<div className="flex gap-2.5 items-center self-stretch p-4 my-auto w-16 h-16 bg-white">
							<PiReceiptDuotone className="object-contain w-8 h-8" />
						</div>
						<div className="flex flex-col self-stretch my-auto w-[188px]">
							<h3 className="text-base font-medium leading-none text-neutral-800">
								Office Productivity
							</h3>
							<p className="mt-2 text-sm tracking-normal leading-loose text-gray-500">
								13,932 Courses
							</p>
						</div>
					</article>
					<article className="flex gap-5 justify-center items-center p-5 bg-violet-100 min-w-[240px]">
						<div className="flex gap-2.5 items-center self-stretch p-4 my-auto w-16 h-16 bg-white">
							<PiMegaphoneSimpleDuotone
								className="object-contain w-8 h-8"
								color="#564FFD"
							/>
						</div>
						<div className="flex flex-col self-stretch my-auto w-[188px]">
							<h3 className="text-base font-medium leading-none text-neutral-800">
								Marketing
							</h3>
							<p className="mt-2 text-sm tracking-normal leading-loose text-gray-500">
								12,068 Courses
							</p>
						</div>
					</article>
					<article className="flex gap-5 justify-center items-center p-5 bg-slate-100 min-w-[240px]">
						<div className="flex gap-2.5 items-center self-stretch p-4 my-auto w-16 h-16 bg-white">
							<PiCameraDuotone className="object-contain w-8 h-8" />
						</div>
						<div className="flex flex-col self-stretch my-auto w-[188px]">
							<h3 className="text-base font-medium leading-none text-neutral-800">
								Photography & Video
							</h3>
							<p className="mt-2 text-sm tracking-normal leading-loose text-gray-500">
								6,196 Courses
							</p>
						</div>
					</article>
					<article className="flex gap-5 justify-center items-center p-5 bg-orange-50 min-w-[240px]">
						<div className="flex gap-2.5 items-center self-stretch p-4 my-auto w-16 h-16 bg-white">
							<PiPackageDuotone
								className="object-contain w-8 h-8"
								color="#FD8E1F"
							/>
						</div>
						<div className="flex flex-col self-stretch my-auto w-[188px]">
							<h3 className="text-base font-medium leading-none text-neutral-800">
								Lifestyle
							</h3>
							<p className="mt-2 text-sm tracking-normal leading-loose text-gray-500">
								2,736 Courses
							</p>
						</div>
					</article>
					<article className="flex gap-5 justify-center items-center p-5 bg-rose-100 min-w-[240px]">
						<div className="flex gap-2.5 items-center self-stretch p-4 my-auto w-16 h-16 bg-white">
							<FiPenTool className="object-contain w-8 h-8" color="#FF6636" />
						</div>
						<div className="flex flex-col self-stretch my-auto w-[188px]">
							<h3 className="text-base font-medium leading-none text-neutral-800">
								Design
							</h3>
							<p className="mt-2 text-sm tracking-normal leading-loose text-gray-500">
								2,600 Courses
							</p>
						</div>
					</article>
					<article className="flex gap-5 justify-center items-center p-5 bg-green-100 min-w-[240px]">
						<div className="flex gap-2.5 items-center self-stretch p-4 my-auto w-16 h-16 bg-white">
							<PiFirstAidKitDuotone
								className="object-contain w-8 h-8"
								color="#23BD33"
							/>
						</div>
						<div className="flex flex-col self-stretch my-auto w-[188px]">
							<h3 className="text-base font-medium leading-none text-neutral-800">
								Health & Fitness
							</h3>
							<p className="mt-2 text-sm tracking-normal leading-loose text-gray-500">
								1,678 Courses
							</p>
						</div>
					</article>
					<article className="flex gap-5 justify-center items-center p-5 bg-orange-50 min-w-[240px]">
						<div className="flex gap-2.5 items-center self-stretch p-4 my-auto w-16 h-16 bg-white">
							<PiHeadphonesDuotone
								className="object-contain w-8 h-8"
								color="#FD8E1F"
							/>
						</div>
						<div className="flex flex-col self-stretch my-auto w-[188px]">
							<h3 className="text-base font-medium leading-none text-neutral-800">
								Music
							</h3>
							<p className="mt-2 text-sm tracking-normal leading-loose text-gray-500">
								959 Courses
							</p>
						</div>
					</article>
				</div>
			</div>
			<div className="flex gap-3 items-center mt-10 text-sm tracking-normal text-center">
				<p className="self-stretch my-auto leading-loose text-gray-600">
					We have more category & subcategory.
				</p>
				<Button
					className="flex gap-2 justify-center items-center self-stretch py-1 my-auto font-medium leading-none text-orange-500 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
					aria-label="Browse all categories"
				>
					<span className="self-stretch my-auto">Browse All</span>
					<Image
						loading="lazy"
						src="/app/logo.png"
						alt=""
						className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
						width={24}
						height={24}
					/>
				</Button>
			</div>
		</section>
	);
};
