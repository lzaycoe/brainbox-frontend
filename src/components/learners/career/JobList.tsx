import React from 'react';
import { MdLibraryBooks, MdOutlineLocationOn } from 'react-icons/md';
import { PiHandbag } from 'react-icons/pi';

const JobList = () => {
	const jobs = [
		{
			title: 'Product Designer (UI/UX Designer)',
			location: 'Tokyo, Japan',
			type: 'Full-Time',
			vacancy: '01',
			deadline: '30 June, 2025',
		},
		{
			title: 'Social Media Manager',
			location: 'Moscow, Russia',
			type: 'Full-Time',
			vacancy: '01',
			deadline: '30 June, 2025',
		},
		{
			title: 'Social Media Manager',
			location: 'Mumbai, India',
			type: 'Full-Time',
			vacancy: '03',
			deadline: '30 June, 2025',
		},
		{
			title: 'Social Media Manager',
			location: 'Tokyo, Japan',
			type: 'Full-Time',
			vacancy: '01',
			deadline: '30 June, 2025',
		},
	];

	interface JobCardProps {
		title: string;
		location: string;
		type: string;
		vacancy: string;
		deadline: string;
	}

	const JobCard: React.FC<JobCardProps> = ({
		title,
		location,
		type,
		vacancy,
		deadline,
	}) => {
		return (
			<div className="py-6 px-4 bg-white shadow-md flex-col gap-6 inline-flex w-full max-w-md">
				<div className="flex-col gap-5 flex">
					<div className="text-[#1d1f26] text-xl font-medium">{title}</div>
					<div className="flex flex-wrap gap-4">
						{/* Location */}
						<div className="flex items-center gap-1.5">
							<MdOutlineLocationOn className="text-[blue] text-xl" />
							<div className="text-[#4d5565] text-sm">{location}</div>
						</div>
						{/* Type */}
						<div className="flex items-center gap-1.5">
							<PiHandbag className="text-[green] text-xl" />
							<div className="text-[#4d5565] text-sm">{type}</div>
						</div>
						{/* Vacancy */}
						<div className="flex items-center gap-1.5">
							<MdLibraryBooks className="text-[orange] text-xl" />
							<div className="text-[#4d5565] text-sm">{vacancy} Vacancy</div>
						</div>
					</div>
				</div>
				<div className="border-t border-[#e8eaef]"></div>
				<div className="flex justify-between items-center">
					<div>
						<span className="text-[#e34444] text-sm font-medium">
							Deadline:{' '}
						</span>
						<span className="text-[#6e7484] text-sm">{deadline}</span>
					</div>
					<div>
						<svg
							width="48"
							height="48"
							viewBox="0 0 48 48"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect width="48" height="48" fill="#FFEEE8" />
							<path
								d="M15.75 24H32.25"
								stroke="#FF6636"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M25.5 17.25L32.25 24L25.5 30.75"
								stroke="#FF6636"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center gap-6 p-4">
			<h2 className="text-3xl font-bold text-gray-800 mt-4">
				Our all open positions ({jobs.length})
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{jobs.map((job, index) => (
					<JobCard
						key={index}
						title={job.title}
						location={job.location}
						type={job.type}
						vacancy={job.vacancy}
						deadline={job.deadline}
					/>
				))}
			</div>
		</div>
	);
};

export default JobList;
