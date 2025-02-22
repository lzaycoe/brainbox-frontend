import { Briefcase, CheckCircle, Globe, Shield, Users } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

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
	{ value: '67.1k', label: 'Students', icon: Users },
	{ value: '26k', label: 'Certified Instructor', icon: Briefcase },
	{ value: '72', label: 'Country Language', icon: Globe },
	{ value: '99.9%', label: 'Success Rate', icon: CheckCircle },
	{ value: '57', label: 'Trusted Companies', icon: Shield },
];

interface LogoCardProps {
	src: string;
}

const LogoCard: React.FC<LogoCardProps> = ({ src }) => (
	<article className="flex justify-center items-center px-4 py-2 bg-white shadow-lg w-[160px] h-[80px] max-md:w-[140px] max-md:h-[60px]">
		{src ? (
			<Image
				src={src}
				alt="Company logo"
				width={80}
				height={80}
				className="object-contain w-[80px] h-[80px]"
			/>
		) : (
			<div className="w-[80px] h-[80px]"></div>
		)}
	</article>
);

interface StatisticCardProps {
	value: string;
	label: string;
	Icon: React.ComponentType<{ className?: string }>;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
	value,
	label,
	Icon,
}) => (
	<article className="flex gap-4 items-start whitespace-nowrap min-w-48">
		<Icon className="shrink-0 w-10 h-10 text-gray-600" />
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
		<div className="w-full max-w-[1200px] mx-auto px-5">
			<article className="flex flex-wrap gap-10 justify-between items-center">
				<header className="w-[368px]">
					<h2 className="text-3xl font-semibold tracking-tight leading-10 text-neutral-800">
						We Just keep growing with 6.3k Companies
					</h2>
					<p className="mt-5 text-base leading-6 text-gray-500">
						Nullam egestas tellus at enim ornare tristique. Class aptent taciti
						sociosqu ad litora torquent
					</p>
				</header>

				{/* Hiển thị logo đã căn chỉnh */}
				<div className="flex flex-col gap-4">
					<div className="flex justify-between gap-4">
						{companies.slice(0, 4).map((src, index) => (
							<LogoCard key={index} src={src} />
						))}
					</div>
					<div className="flex justify-between gap-4">
						{companies.slice(4).map((src, index) => (
							<LogoCard key={index} src={src} />
						))}
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
					/>
				))}
			</section>
		</div>
	);
};

export default Content;
