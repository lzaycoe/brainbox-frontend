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
import { PiArrowDown } from 'react-icons/pi';

import { Progress } from '@/components/ui/progress';

export const Banner = () => {
	return (
		<section
			className="flex flex-col justify-center items-center mx-20 p-10 bg-slate-900 max-md:px-5"
			role="region"
			aria-label="Profile Progress Section"
		>
			<div className="flex flex-wrap gap-8 justify-between items-center w-full max-w-[1240px] max-md:max-w-full">
				<div className="flex gap-6 justify-center items-center self-stretch my-auto min-w-[240px]">
					<Image
						loading="lazy"
						src="/app/lazyavt.png"
						alt="Profile avatar"
						className="object-contain shrink-0 self-stretch my-auto w-20 aspect-square rounded-[40px]"
						width={80}
						height={80}
					/>
					<div className="flex flex-col self-stretch my-auto w-56">
						<div className="text-xl font-semibold leading-tight text-white">
							Lazy Code
						</div>
						<div className="mt-1.5 text-sm tracking-normal leading-loose text-white opacity-50">
							lazycode.dev@gmail.com
						</div>
					</div>
				</div>
				<div className="flex flex-wrap gap-6 justify-center items-center self-stretch my-auto min-w-[240px] max-md:max-w-full">
					<div
						className="self-stretch my-auto text-sm font-medium tracking-normal leading-none text-right text-white opacity-60"
						aria-label="Progress steps"
					>
						1/4 Steps
					</div>
					<Progress
						indicatorColor="bg-green-400"
						value={25}
						className="flex flex-col self-stretch my-auto min-w-[240px] w-[312px] h-[20px] bg-slate-50"
					/>
					<div
						className="self-stretch my-auto text-base font-semibold leading-none text-white w-[204px]"
						aria-label="Completion percentage"
					>
						25% Completed
					</div>
				</div>
				<div className="flex gap-3 justify-center items-center self-stretch my-auto">
					<button
						className="gap-3 self-stretch px-6 text-base font-semibold tracking-normal leading-10 text-white capitalize bg-orange-500"
						aria-label="Edit Biography"
					>
						Edit Biography
					</button>
					<button
						className="flex gap-4 items-center self-stretch p-3 my-auto w-12 h-12 bg-white bg-opacity-10  text-white"
						aria-label="Additional options"
					>
						<PiArrowDown className="w-8 h-8" />
					</button>
				</div>
			</div>
		</section>
	);
};
