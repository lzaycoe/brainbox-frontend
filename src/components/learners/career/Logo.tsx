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

const Logo = () => {
	return (
		<>
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
			</div>
		</>
	);
};

export default Logo;
