// Import các thành phần cần thiết
import React from 'react';
import { FaMoneyCheck, FaRegChartBar } from 'react-icons/fa';
import { FaHandshakeSimple } from 'react-icons/fa6';
import { IoIosGift } from 'react-icons/io';
import { IoFastFoodSharp, IoHourglassOutline } from 'react-icons/io5';
import { LuTimerOff } from 'react-icons/lu';
import { SiEventstore } from 'react-icons/si';

// PerkCard Component
const PerkCard = ({
	bgColor,
	icon,
	text,
}: {
	bgColor: string;
	icon: React.ReactNode;
	text: string;
}) => {
	return (
		<div
			className={`p-5 ${bgColor} flex flex-col justify-start items-start gap-4 rounded-md shadow-md w-[220px]`}
		>
			<div className="w-[45px] h-[45px] bg-white flex justify-center items-center rounded-md">
				{icon}
			</div>
			<p className="text-[#1d1f26] text-base font-medium leading-snug">
				{text}
			</p>
		</div>
	);
};

// Main Content Component
const Content = () => {
	return (
		<div className="w-full max-w-[1320px] h-auto px-5 bg-white flex flex-col justify-center items-center gap-10 mx-auto">
			<h3 className="text-[#1d1f26] text-[36px] font-semibold leading-[44px]">
				Our Perks & Benefits
			</h3>
			<div className="grid grid-cols-4 gap-4 w-full justify-items-center">
				<PerkCard
					bgColor="bg-[#ffeee8]"
					icon={<IoFastFoodSharp className="w-6 h-6 text-[#FF6636]" />}
					text="Healthy Food & Snacks"
				/>
				<PerkCard
					bgColor="bg-[#ebeaff]"
					icon={<FaRegChartBar className="w-6 h-6 text-[blue]" />}
					text="Personal Career Growth"
				/>
				<PerkCard
					bgColor="bg-[#e1f7e3]"
					icon={<LuTimerOff className="w-6 h-6 text-[green]" />}
					text="Vacation & Paid Time Off"
				/>
				<PerkCard
					bgColor="bg-[#fff3db]"
					icon={<IoIosGift className="w-6 h-6 text-[orange]" />}
					text="Special Allowance & Bonus"
				/>
				<PerkCard
					bgColor="bg-[#e3f8e1]"
					icon={<FaMoneyCheck className="w-6 h-6 text-[green]" />}
					text="Competitive Salary"
				/>
				<PerkCard
					bgColor="bg-[#ffdada]"
					icon={<FaHandshakeSimple className="w-6 h-6 text-[red]" />}
					text="Well-being memberships"
				/>
				<PerkCard
					bgColor="bg-[#f2e6ff]"
					icon={<IoHourglassOutline className="w-6 h-6 text-[purple]" />}
					text="Maternity/Paternity Benefits"
				/>
				<PerkCard
					bgColor="bg-[#e0f7ff]"
					icon={<SiEventstore className="w-6 h-6 text-[blue]" />}
					text="Eduguard Annual Events"
				/>
			</div>
		</div>
	);
};

export default Content;
