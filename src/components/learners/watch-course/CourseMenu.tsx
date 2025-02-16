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
			id: 1,
			title: 'Getting Started',
			lectures: '4 lectures',
			duration: '51m',
			progress: '25% finish (1/4)',
			isExpanded: true,
			lecturesDetails: [
				{ id: 1, title: '1. What is Webflow?', time: '07:31', isDone: false },
				{
					id: 2,
					title: '2. Sign up in Webflow',
					time: '07:31',
					isActive: true,
					isDone: true,
				},
				{ id: 3, title: '3. Teaser of Webflow', time: '07:31', isDone: false },
				{ id: 4, title: '4. Figma Introduction', time: '07:31', isDone: false },
			],
		},
		{
			id: 2,
			title: 'Secret of Good Design',
			lectures: '52 lectures',
			duration: '5h 49m',
			isExpanded: false,
			lecturesDetails: [],
		},
		{
			id: 3,
			title: 'Practice Design Like an Artist',
			lectures: '43 lectures',
			duration: '51m',
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
				<div className="relative w-full h-2 bg-gray-200 rounded-md overflow-hidden">
					<progress
						className="absolute top-0 left-0 w-full h-4 appearance-none"
						value={progress}
						max={100}
					>
						{progress}%
					</progress>
					<div
						className="absolute top-0 left-0 h-4 bg-green-600"
						style={{ width: `${progress}%` }}
					></div>
				</div>
			</div>

			{/* Course Sections */}
			<div className="flex flex-col bg-white border border-gray-200 max-w-[603px] mt-4">
				{sections.map((section) => (
					<div
						key={section.id}
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
						{section.lecturesDetails.map((lecture) => (
							<div
								key={lecture.id}
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
