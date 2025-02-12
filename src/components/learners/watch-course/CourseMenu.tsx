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
	PiArrowDownBold,
	PiArrowUpBold,
	PiChecks,
	PiPauseFill,
	PiPlayCircle,
	PiPlayFill,
	PiTimer,
} from 'react-icons/pi';

export default function CourseMenu() {
	const progress = 15; // Progress in percentage
	const sections = [
		{
			title: 'Getting Started',
			lectures: '4 lectures',
			duration: '51m',
			progress: '25% finish (1/4)',
			isExpanded: true,
			lecturesDetails: [
				{ title: '1. What is Webflow?', time: '07:31', isDone: false },
				{
					title: '2. Sign up in Webflow',
					time: '07:31',
					isActive: true,
					isDone: true,
				},
				{ title: '3. Teaser of Webflow', time: '07:31', isDone: false },
				{ title: '4. Figma Introduction', time: '07:31', isDone: false },
			],
		},
		{
			title: 'Secret of Good Design',
			lectures: '52 lectures',
			duration: '5h 49m',
			isExpanded: false,
			lecturesDetails: [],
		},
		{
			title: 'Practice Design Like an Artist',
			lectures: '43 lectures',
			duration: '51m',
			isExpanded: false,
			lecturesDetails: [],
		},
		{
			title: 'Web Development (webflow) Freelancingggggggggggggg',
			lectures: '137 lectures',
			duration: '10h 6m',
			isExpanded: false,
			lecturesDetails: [],
		},
		{
			title: 'Secrets of Making Money Freelancingggggggggggggg',
			lectures: '21 lectures',
			duration: '38m',
			isExpanded: false,
			lecturesDetails: [],
		},
	];

	return (
		<div className="flex flex-col max-w-[603px]">
			{/* Header Section */}
			<div className="flex flex-wrap gap-10 justify-between items-center w-full font-semibold max-md:max-w-full">
				<h2 className="self-stretch my-auto text-2xl tracking-tight leading-none text-neutral-800">
					Course Contents
				</h2>
				<div
					className="self-stretch my-auto text-base leading-none text-right text-green-600"
					aria-live="polite"
				>
					{progress}% Completed
				</div>
			</div>

			{/* Progress Bar Section */}
			<div className="flex flex-col mt-4 w-full max-md:max-w-full">
				<div
					className="flex flex-col items-start w-full bg-gray-200 max-md:pr-5 max-md:max-w-full"
					role="progressbar"
					aria-valuenow={progress}
					aria-valuemin={0}
					aria-valuemax={100}
				>
					<div
						className="flex shrink-0 h-1 bg-green-600"
						style={{ width: `${progress}%` }}
					></div>
				</div>
			</div>

			{/* Course Sections */}
			<div className="flex flex-col bg-white border border-gray-200 max-w-[603px] mt-4">
				{sections.map((section, index) => (
					<div
						key={index}
						className={`${section.isExpanded ? 'bg-slate-100' : 'bg-white'}`}
					>
						{/* Section Header */}
						<div className="flex flex-wrap gap-10 justify-between items-center p-4 w-full max-md:max-w-full">
							<div className="flex gap-2 items-center my-auto text-base leading-none text-neutral-800 flex-1 min-w-0">
								<div
									className="flex shrink-0 items-center w-5 h-5"
									aria-hidden="true"
								>
									{section.isExpanded ? (
										<PiArrowUpBold className="object-contain w-5 h-4 text-orange-500" />
									) : (
										<PiArrowDownBold className="object-contain w-5 h-4 text-neutral-800" />
									)}
								</div>
								<h2
									className={`ml-1 ${
										section.isExpanded ? 'text-orange-500' : 'text-neutral-800'
									} truncate text-base font-medium leading-none max-w-[300px]`}
									title={section.title} // Tooltip for full title
								>
									{section.title}
								</h2>
							</div>

							<div className="flex gap-2 items-center text-sm tracking-normal leading-loose text-gray-600">
								<div className="flex gap-1 items-center">
									<PiPlayCircle
										className="object-contain w-4 h-4"
										color="#564FFD"
									/>
									<span>{section.lectures}</span>
								</div>
								<div className="flex gap-1 items-center">
									<PiTimer className="object-contain w-4 h-4" color="#FD8E1F" />
									<span>{section.duration}</span>
								</div>
								{section.progress && (
									<div className="flex gap-1 items-center text-gray-400">
										<PiChecks
											className="object-contain w-4 h-4"
											color="#23BD33"
										/>
										<span>{section.progress}</span>
									</div>
								)}
							</div>
						</div>

						{/* Divider */}
						<div className="w-full bg-white border border-gray-200 min-h-[1px] max-md:max-w-full"></div>
						{section.lecturesDetails.map((lecture, index) => (
							<div
								key={index}
								className={`flex flex-wrap gap-10 justify-between items-center px-5 py-3 w-full ${
									lecture.isActive ? 'bg-rose-100 text-neutral-800' : ''
								} max-md:max-w-full`}
							>
								<div
									className={`flex gap-3 items-center self-stretch my-auto ${
										lecture.isActive
											? 'font-medium leading-none'
											: 'text-gray-600'
									}`}
								>
									<div
										className={`flex shrink-0 self-stretch my-auto h-[18px] w-[18px] ${
											lecture.isActive
												? 'bg-white border border-orange-500'
												: 'bg-white border border-gray-300'
										}`}
										aria-hidden="true"
									></div>

									<span className="self-stretch my-auto">{lecture.title}</span>
								</div>
								<div className="flex gap-1.5 justify-center items-center self-stretch my-auto leading-loose whitespace-nowrap text-gray-400">
									{lecture.isActive ? (
										<div
											className="flex shrink-0 self-stretch my-auto"
											aria-hidden="true"
										>
											<PiPauseFill className="object-contain w-4 h-4" />
										</div>
									) : (
										<div
											className="flex shrink-0 self-stretch my-auto"
											aria-hidden="true"
										>
											<PiPlayFill className="object-contain w-4 h-4" />
										</div>
									)}
									<span className="self-stretch my-auto">{lecture.time}</span>
								</div>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
}
