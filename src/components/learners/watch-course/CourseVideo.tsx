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

export default function CourseVideo() {
	return (
		<div className="flex flex-col bg-white p-5">
			{/* Video Section */}
			<div className="mb-5 w-full">
				<video
					controls
					className="w-full h-[450px]"
					poster="https://via.placeholder.com/800x450?text=Video+Thumbnail"
				>
					<source src="/path-to-your-video.mp4" type="video/mp4" />
					<track
						src="/path-to-your-captions.vtt"
						kind="subtitles"
						srcLang="en"
						label="English"
						default
					/>
					Your browser does not support the video tag.
				</video>
			</div>

			{/* Text Content */}
			<h2 className="text-3xl font-semibold tracking-tight leading-none text-neutral-800">
				2. Sign up in Webflow
			</h2>
			<div className="flex flex-wrap gap-10 justify-between items-end mt-5 w-full">
				{/* Section 1: Logo and Students */}
				<div className="flex gap-3 items-center">
					<Image
						src="/app/watch-course/avatar.png"
						alt="Webflow logo"
						width={112} // 28 * 4 (tailwind width conversion)
						height={32} // Based on aspect ratio [3.5]
						className="object-contain shrink-0 w-28 aspect-[3.5]"
						loading="lazy"
					/>
					<div className="flex flex-col">
						<div className="text-sm font-semibold tracking-normal leading-none text-neutral-800">
							512
						</div>
						<div className="text-xs leading-none text-gray-500">
							Students watching
						</div>
					</div>
				</div>

				{/* Section 2: Last Updated and Comments */}
				<div className="flex gap-6 items-start text-sm tracking-normal leading-loose min-w-[240px]">
					<div className="flex items-center">
						<span className="text-gray-500">Last updated:</span>
						<span className="ml-2 text-neutral-800">Jan 12, 2025</span>
					</div>
					<div className="flex items-center">
						<span className="text-gray-500">Comments:</span>
						<span className="ml-2 text-neutral-800">154</span>
					</div>
				</div>
			</div>
		</div>
	);
}
