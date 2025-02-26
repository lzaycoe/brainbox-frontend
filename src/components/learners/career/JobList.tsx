import React from 'react';
import { IoMdArrowForward } from 'react-icons/io';
import { MdLibraryBooks, MdOutlineLocationOn } from 'react-icons/md';
import { PiHandbag } from 'react-icons/pi';

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
		<div className="py-4 px-3 bg-white shadow-md flex-col gap-4 inline-flex w-full max-w-sm">
			<div className="flex-col gap-4 flex">
				<div className="text-[#1d1f26] text-lg font-medium">{title}</div>
				<div className="flex flex-wrap gap-3">
					<div className="flex items-center gap-1.5">
						<MdOutlineLocationOn className="text-[blue] text-lg" />
						<div className="text-[#4d5565] text-sm">{location}</div>
					</div>
					<div className="flex items-center gap-1.5">
						<PiHandbag className="text-[green] text-lg" />
						<div className="text-[#4d5565] text-sm">{type}</div>
					</div>
					<div className="flex items-center gap-1.5">
						<MdLibraryBooks className="text-[orange] text-lg" />
						<div className="text-[#4d5565] text-sm">{vacancy} Vacancy</div>
					</div>
				</div>
			</div>
			<div className="border-t border-[#e8eaef]"></div>
			<div className="flex justify-between items-center">
				<div>
					<span className="text-[#cf2d2d] text-xs font-medium">Deadline: </span>
					<span className="text-[#6e7484] text-xs">{deadline}</span>
				</div>
				<div>
					<div className="w-12 h-12 bg-[#FFEEE8] flex items-center justify-center hover:bg-[#ffccbb] transition-colors">
						<IoMdArrowForward className="text-[#FF6636] text-2xl hover:text-[#cc3300] transition-colors" />
					</div>
				</div>
			</div>
		</div>
	);
};

const JobList: React.FC = () => {
	const jobs = [
		{
			id: 1,
			title: 'Product Designer (UI/UX Designer)',
			location: 'Tokyo, Japan',
			type: 'Full-Time',
			vacancy: '01',
			deadline: '30 June, 2025',
		},
		{
			id: 2,
			title: 'Social Media Manager',
			location: 'Moscow, Russia',
			type: 'Full-Time',
			vacancy: '01',
			deadline: '30 June, 2025',
		},
		{
			id: 3,
			title: 'Social Media Manager',
			location: 'Mumbai, India',
			type: 'Full-Time',
			vacancy: '03',
			deadline: '30 June, 2025',
		},
		{
			id: 4,
			title: 'Social Media Manager',
			location: 'Tokyo, Japan',
			type: 'Full-Time',
			vacancy: '01',
			deadline: '30 June, 2025',
		},
	];

	return (
		<div className="py-10 bg-[#f4f7f9] flex flex-col justify-center items-center gap-6">
			<h2 className="text-3xl font-bold text-gray-800">
				Our all open positions ({jobs.length})
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{jobs.map((job) => (
					<JobCard
						key={job.id}
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
