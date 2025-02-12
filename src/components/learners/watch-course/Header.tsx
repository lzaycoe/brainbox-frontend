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
import {
	PiArrowLeftBold,
	PiFolderOpen,
	PiPlayCircle,
	PiTimer,
} from 'react-icons/pi';

export default function Header() {
	return (
		<div className="flex justify-between items-center px-8 py-5 bg-slate-100 max-md:px-5">
			<div className="flex items-center gap-4">
				<div
					className="flex items-center justify-center w-10 h-10 rounded-full bg-white cursor-pointer"
					role="button"
					aria-label="Go back"
				>
					<PiArrowLeftBold className="object-contain w-6 h-8" />
				</div>

				{/* Course Details */}
				<div>
					<h2 className="text-lg font-medium text-neutral-800">
						Complete Website Responsive Design: from Figma to Webflow to Website
						Design
					</h2>
					<div className="flex gap-4 mt-2 text-sm text-gray-600">
						{/* Sections */}
						<div className="flex items-center gap-1">
							<div
								className="rounded-full flex items-center justify-center"
								role="img"
								aria-label="Sections icon"
							>
								<PiFolderOpen
									className="object-contain w-4 h-4"
									color="#FF6636"
								/>
							</div>
							<span>6 Sections</span>
						</div>

						{/* Lectures */}
						<div className="flex items-center gap-1">
							<div
								className="rounded-full flex items-center justify-center"
								role="img"
								aria-label="Sections icon"
							>
								<PiPlayCircle
									className="object-contain w-4 h-4"
									color="#564FFD"
								/>
							</div>
							<span>202 lectures</span>
						</div>

						{/* Duration */}
						<div className="flex items-center gap-1">
							<div
								className="rounded-full flex items-center justify-center"
								role="img"
								aria-label="Sections icon"
							>
								<PiTimer className="object-contain w-4 h-4" color="#FD8E1F" />
							</div>
							<span>19h 37m</span>
						</div>
					</div>
				</div>
			</div>

			{/* Buttons */}
			<div className="flex gap-3">
				<button className="px-6 py-2 text-orange-500 bg-white border border-orange-500">
					Write a Review
				</button>
				<button className="px-6 py-2 text-white bg-orange-500">
					Next Lecture
				</button>
			</div>
		</div>
	);
}
