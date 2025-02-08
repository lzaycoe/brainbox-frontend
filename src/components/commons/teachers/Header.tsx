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
import { PiBell, PiMagnifyingGlass } from 'react-icons/pi';

export const Header = () => {
	return (
		<header
			className="flex flex-wrap gap-10 justify-between items-center px-40 py-6 bg-white max-md:px-5"
			role="banner"
			aria-label="Dashboard Header"
		>
			{/* Greeting Section */}
			<div className="flex flex-col self-stretch my-auto min-w-[240px] w-[312px]">
				<div
					className="text-sm font-medium tracking-normal leading-none text-gray-500"
					aria-label="Time of Day Greeting"
				>
					Good Morning
				</div>
				<div
					className="mt-1.5 text-xl font-semibold leading-tight text-neutral-800"
					aria-label="Current Section"
				>
					Dashboard
				</div>
			</div>

			{/* Search and Actions Section */}
			<div className="flex gap-4 items-start self-stretch my-auto min-w-[240px] max-md:max-w-full">
				{/* Search Bar */}
				<form
					className="flex overflow-hidden flex-col justify-center items-start px-5 py-3 text-base text-gray-400 whitespace-nowrap bg-slate-100 min-w-[240px] w-[312px] max-md:pr-5"
					role="search"
				>
					<div className="flex gap-3 items-center">
						<PiMagnifyingGlass className="w-8 h-8" />
						<label htmlFor="searchInput" className="sr-only">
							Search Dashboard
						</label>
						<input
							type="search"
							id="searchInput"
							className="bg-transparent border-none outline-none w-full"
							placeholder="Search"
							aria-label="Search Dashboard"
						/>
					</div>
				</form>

				{/* Notifications Button */}
				<button
					className="flex gap-2.5 items-center p-3 w-12 h-full bg-slate-100"
					aria-label="Notifications"
				>
					<PiBell className="w-8 h-8" />
				</button>

				{/* User Profile Picture */}
				<Image
					loading="lazy"
					src="/app/lazyavt.png"
					className="object-contain shrink-0 w-12 rounded-full aspect-square"
					alt="User Profile Picture"
					width={48}
					height={48}
				/>
			</div>
		</header>
	);
};
