import Image from 'next/image';
import React from 'react';
import { FaMoneyCheck, FaRegChartBar } from 'react-icons/fa';
import { FaHandshakeSimple } from 'react-icons/fa6';
import { IoIosGift } from 'react-icons/io';
import { IoFastFoodSharp, IoHourglassOutline } from 'react-icons/io5';
import { LuTimerOff } from 'react-icons/lu';
import { SiEventstore } from 'react-icons/si';

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
			className={`p-5 ${bgColor} flex flex-col justify-start items-start gap-4 shadow-md w-[220px]`}
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

const CardPerk = () => {
	return (
		<div className="w-full max-w-[1040px] h-auto px-5 bg-white flex flex-col justify-center items-center gap-10 mx-auto mt-10">
			<h3 className="text-[#1d1f26] text-[36px] font-semibold leading-[44px]">
				Our Perks & Benefits
			</h3>
			<div className="grid grid-cols-4 gap-x-6 gap-y-6 w-full max-w-[1200px] justify-items-stretch">
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

const GallerySection = () => {
	return (
		<div>
			<hr className="mt-14 border-gray-150 w-full" />
			<section className="w-full px-5 h-auto bg-white flex justify-center items-center gap-10">
				<div className="pt-12 w-full max-w-[1200px] flex justify-center items-center gap-10">
					<div className="flex-col justify-start items-start gap-4 flex max-w-[400px]">
						<div className="flex-col justify-start items-start gap-1 flex">
							<div className="text-[#ff6636] text-sm font-medium leading-tight ">
								OUR GALLERY
							</div>
							<div className="text-[#1d1f26] text-[36px] font-semibold leading-[40px]">
								We’ve been here almost 4 years
							</div>
						</div>
						<div className="text-[#4d5565] text-base leading-relaxed">
							Fusce lobortis leo augue, sit amet tristique nisi commodo in.
							Aliquam ac libero quis tellus venenatis imperdiet. Sed sed nunc
							libero. Curabitur in urna ligula. torquent per conubia nostra.
						</div>
					</div>
					<div className="w-[600px] h-[400px] relative">
						<Image
							src="/app/about/AboutSection_02.png"
							alt="Gallery Image"
							width={600}
							height={400}
							className="object-cover"
						/>
					</div>
				</div>
			</section>
		</div>
	);
};

const Content = () => {
	return (
		<>
			<CardPerk />
			<GallerySection />
		</>
	);
};

export default Content;
