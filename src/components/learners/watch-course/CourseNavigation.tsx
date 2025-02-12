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
import { PiDownloadSimple, PiFileText } from 'react-icons/pi';

export default function CourseNavigation() {
	return (
		<div className="flex flex-col justify-center py-px font-medium p-5">
			<div className="flex flex-col w-full max-md:max-w-full">
				{/* Top Separator */}
				<hr
					className="w-full bg-gray-200 border border-gray-200 border-solid min-h-[1px] max-md:max-w-full"
					aria-hidden="true"
				/>

				{/* Navigation */}
				<nav aria-label="Course navigation">
					<ul className="flex flex-wrap gap-6 items-start self-start max-md:max-w-full list-none p-0 m-0">
						{/* Description */}
						<li>
							<a
								href="#description"
								className="gap-2.5 self-stretch py-5 text-base leading-none text-center whitespace-nowrap bg-white shadow-sm text-neutral-800 w-[155px] inline-block no-underline"
								aria-current="page"
							>
								Description
							</a>
						</li>

						{/* Lecture Notes */}
						<li>
							<a
								href="#lecture-notes"
								className="gap-2.5 self-stretch py-5 text-base leading-none text-center text-gray-600 w-[155px] inline-block no-underline"
							>
								Lectures Notes
							</a>
						</li>

						{/* Attach File */}
						<li>
							<a
								href="#attach-file"
								className="flex gap-3 justify-center items-center py-5 w-[155px] no-underline"
							>
								<span className="self-stretch my-auto text-base leading-none text-center text-gray-600">
									Attach File
								</span>
								<span
									className="gap-2.5 self-stretch px-1.5 py-1 my-auto text-xs leading-none text-orange-500 uppercase whitespace-nowrap bg-rose-100"
									aria-label="1 file attached"
								>
									01
								</span>
							</a>
						</li>

						{/* Comments */}
						<li>
							<a
								href="#comments"
								className="gap-2.5 self-stretch py-5 text-base leading-none text-center text-gray-600 whitespace-nowrap w-[155px] inline-block no-underline"
							>
								Comments
							</a>
						</li>
					</ul>
				</nav>

				{/* Bottom Separator */}
				<hr
					className="w-full bg-gray-200 border border-gray-200 border-solid min-h-[1px] max-md:max-w-full"
					aria-hidden="true"
				/>
			</div>
			<div className="flex flex-col max-w-[915px] mt-5">
				<div>
					{/* Title */}
					<h2 className="w-full text-2xl font-semibold tracking-tight leading-none text-neutral-800 max-md:max-w-full">
						Lectures Description
					</h2>

					{/* Paragraph 1 */}
					<p className="mt-5 w-full text-sm tracking-normal leading-6 text-gray-600 max-md:max-w-full">
						If that all sounds a little too fancy - do not worry, this course is
						aimed at people new to web design and who have never coded before.
					</p>
				</div>
				<div className="mt-10">
					<div className="flex flex-wrap gap-10 justify-between items-center w-full font-semibold max-md:max-w-full">
						<h2 className="self-stretch my-auto text-2xl tracking-tight leading-none text-neutral-800">
							Lecture Notes
						</h2>
						<button
							className="flex gap-2 justify-center items-center self-stretch px-4 my-auto text-sm tracking-normal leading-10 text-orange-500 capitalize bg-rose-100"
							tabIndex={0}
						>
							<span className="flex shrink-0 self-stretch my-auto w-6 h-6">
								<PiDownloadSimple className="w-full h-full" color="#FF6636" />
							</span>
							<span className="self-stretch my-auto">Download Notes</span>
						</button>
					</div>

					{/* Description */}
					<p className="mt-5 w-full text-sm tracking-normal leading-6 text-gray-600 max-md:max-w-full">
						In ut aliquet ante. Curabitur mollis tincidunt turpis, sed aliquam
						mauris finibus vel. Praesent eget mi in mi maximus egestas. Mauris
						eget ipsum in justo bibendum pellentesque.
					</p>
				</div>

				<div className="mt-10">
					{/* Header */}
					<h2 className="text-2xl font-semibold tracking-tight leading-none text-neutral-800">
						Attach Files <span>(01)</span>
					</h2>

					{/* File Attachment Section */}
					<div className="flex flex-wrap gap-10 justify-between items-center p-6 mt-5 w-full bg-slate-100 max-md:px-5 max-md:max-w-full">
						{/* File Info */}
						<div className="flex gap-3 items-start self-stretch my-auto">
							<div className="flex shrink-0 w-12 h-12" aria-label="File icon">
								<PiFileText className="w-full h-full" color="#FF6636" />
							</div>
							<div className="flex flex-col">
								<div className="text-base font-medium leading-none text-neutral-800">
									Download file
								</div>
								<div className="mt-1 text-sm tracking-normal leading-loose text-gray-500">
									12.6 MB
								</div>
							</div>
						</div>

						{/* Download Button */}
						<button
							className="gap-3 self-stretch px-6 my-auto text-base font-semibold tracking-normal leading-10 text-white capitalize bg-orange-500 max-md:px-5"
							tabIndex={0}
						>
							Download File
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
