import { Briefcase, CheckCircle, Globe, Shield, Users } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import AboutSection from './AboutSection';

const HeroSection = () => {
	return (
		<div className="w-full max-w-[1200px] mx-auto px-5 py-14 flex justify-between items-center gap-10">
			{/* Phần văn bản chiếm 50% */}
			<div className="w-1/2 flex-col justify-start items-start gap-8">
				<div className="flex-col justify-start items-start gap-4">
					<div className="text-[#e8eaef] text-[80px] font-semibold leading-[80px]">
						2021-2025
					</div>
					<div className="text-[#1d1f26] text-5xl font-semibold leading-[52px]">
						We share knowledge with the world
					</div>
				</div>
				<div className="text-[#6e7484] text-xl font-normal leading-loose">
					Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent
					fermentum quam mauris. Fusce tempor et augue a aliquet. Donec non
					ipsum non risus egestas tincidunt at vitae nulla.
				</div>
			</div>

			{/* Phần hình ảnh chiếm 50% */}
			<div className="w-1/2">
				<Image
					src="/app/about/01.png"
					alt="Hero Image"
					width={600}
					height={450}
					className="w-full h-auto"
				/>
			</div>
		</div>
	);
};

const companies = [
	'/app/about/LOGO_01.png',
	'/app/about/LOGO_02.png',
	'/app/about/LOGO_03.png',
	'/app/about/LOGO_04.png',
	'/app/about/LOGO_05.png',
	'/app/about/LOGO_06.png',
	'/app/about/LOGO_07.png',
	'/app/about/LOGO_08.png',
];

const statistics = [
	{
		value: '67.1k',
		label: 'Students',
		icon: Users,
		color: 'text-orange-500',
		size: 'w-8 h-8',
	},
	{
		value: '26k',
		label: 'Certified Instructor',
		icon: Briefcase,
		color: 'text-blue-500',
		size: 'w-8 h-8',
	},
	{
		value: '72',
		label: 'Country Language',
		icon: Globe,
		color: 'text-red-500',
		size: 'w-8 h-8',
	},
	{
		value: '99.9%',
		label: 'Success Rate',
		icon: CheckCircle,
		color: 'text-green-500',
		size: 'w-8 h-8',
	},
	{
		value: '57',
		label: 'Trusted Companies',
		icon: Shield,
		color: 'text-orange-500',
		size: 'w-8 h-8',
	},
];

interface LogoCardProps {
	src: string;
}

const LogoCard: React.FC<LogoCardProps> = ({ src }) => (
	<article className="relative w-[200px] h-[120px] flex justify-center items-center overflow-hidden">
		{src ? (
			<Image
				src={src}
				alt="Company logo"
				layout="fill"
				objectFit="contain"
				className="p-0 m-0"
			/>
		) : (
			<div className="w-full h-full"></div>
		)}
	</article>
);

interface StatisticCardProps {
	value: string;
	label: string;
	Icon: React.ComponentType<{ className?: string }>;
	color: string;
	size?: string;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
	value,
	label,
	Icon,
	color,
	size,
}) => (
	<article className="flex gap-4 items-start whitespace-nowrap min-w-48">
		<Icon className={`shrink-0 ${size} ${color}`} />
		<div className="w-52">
			<h3 className="text-3xl font-semibold tracking-tight leading-none text-neutral-800">
				{value}
			</h3>
			<p className="mt-2 text-sm font-medium tracking-normal leading-none text-gray-600">
				{label}
			</p>
		</div>
	</article>
);

const Content = () => {
	return (
		<>
			<HeroSection />
			<hr className="border-gray-200 w-full" />
			<div className="w-full max-w-[1200px] mx-auto px-5 mt-10 mb-10">
				<article className="flex flex-wrap gap-10 justify-between items-center">
					<header className="w-[368px]">
						<h2 className="text-3xl font-semibold tracking-tight leading-10 text-neutral-800">
							We Just keep growing with 6.3k Companies
						</h2>
						<p className="mt-5 text-base leading-6 text-gray-500">
							Nullam egestas tellus at enim ornare tristique. Class aptent
							taciti sociosqu ad litora torquent
						</p>
					</header>

					{/* Hiển thị logo đã căn chỉnh */}
					<div className="flex flex-row items-center">
						<div className="flex flex-col">
							<div className="flex -space-x-4">
								{companies.slice(0, 4).map((src, index) => (
									<LogoCard key={index} src={src} />
								))}
							</div>
							<div className="flex -space-x-4 mt-[-10px]">
								{companies.slice(4).map((src, index) => (
									<LogoCard key={index} src={src} />
								))}
							</div>
						</div>
					</div>
				</article>

				{/* Phần thống kê */}
				<section className="flex flex-row justify-center items-start gap-x-6 mt-20 max-md:mt-10 max-md:max-w-full">
					{statistics.map((stat, index) => (
						<StatisticCard
							key={index}
							value={stat.value}
							label={stat.label}
							Icon={stat.icon}
							color={stat.color}
							size={stat.size}
						/>
					))}
				</section>
			</div>
			<AboutSection />
		</>
	);
};

export default Content;
