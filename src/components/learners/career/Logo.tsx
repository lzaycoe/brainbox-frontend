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

interface LogoCardProps {
	src: string;
}

const LogoCard: React.FC<LogoCardProps> = ({ src }) => (
	<article className="relative w-[160px] h-[100px] flex justify-center items-center overflow-hidden">
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

const Logo = () => {
	return (
		<div className="w-full flex justify-center bg-[#f4f7f9] py-10">
			<div className="w-full max-w-[1140px] bg-white shadow-lg p-6 rounded-lg">
				<div className="w-full max-w-[1200px] mx-auto px-5 mt-10 mb-10">
					<article className="flex justify-between items-center gap-10">
						{/* Văn bản giới thiệu */}
						<header className="w-[350px] flex-shrink-0">
							<h2 className="text-3xl font-semibold tracking-tight leading-10 text-neutral-800">
								We Just keep growing with 6.3k Companies
							</h2>
							<p className="mt-5 text-base leading-6 text-gray-500">
								Nullam egestas tellus at enim ornare tristique. Class aptent
								taciti sociosqu ad litora torquent.
							</p>
						</header>

						{/* Khu vực hiển thị logo */}
						<div className="flex flex-col gap-2">
							<div className="flex gap-4">
								{companies.slice(0, 4).map((src, index) => (
									<LogoCard key={index} src={src} />
								))}
							</div>
							<div className="flex gap-4">
								{companies.slice(4).map((src, index) => (
									<LogoCard key={index} src={src} />
								))}
							</div>
						</div>
					</article>
				</div>
			</div>
		</div>
	);
};

export default Logo;
