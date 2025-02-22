import Image from 'next/image';
import React from 'react';

/* OUR ONE BILLION MISSION */
const MissionSection = () => {
	return (
		<section className="w-full max-w-[1200px] mx-auto px-5 mb-10 h-auto bg-[#ffeee8] flex flex-col md:flex-row justify-center items-center gap-10 md:gap-14 overflow-hidden">
			<Image
				src="/app/about/01.png"
				alt="Mission Image"
				width={648}
				height={436}
				className="w-full max-w-[50%] md:max-w-[45%] origin-top-left rotate-180 shadow-[-20px_20px_30px_0px_rgba(0,0,0,0.30)]"
			/>
			<div className="w-full max-w-[600px] flex flex-col justify-start items-start gap-6">
				<div className="flex-col justify-start items-start gap-2 flex">
					<div className="text-[#ff6636] text-base font-medium leading-snug">
						OUR ONE BILLION MISSION
					</div>
					<div className="text-[#1d1f26] text-[32px] md:text-[40px] font-semibold leading-[40px] md:leading-[48px]">
						Our one billion mission sounds bold, We agree.
					</div>
				</div>
				<div className="text-[#4d5565] text-base leading-normal">
					"We cannot solve our problems with the same thinking we used when we
					created them."—Albert Einstein. Institutions are slow to change.
					Committees are where good ideas and innovative thinking go to die.
					Choose agility over dogma. Embrace and drive change. We need to wipe
					the slate clean and begin with bold, radical thinking.
				</div>
			</div>
		</section>
	);
};

const images = [
	'/app/about/01.png',
	'/app/about/01.png',
	'/app/about/01.png',
	'/app/about/01.png',
	'/app/about/01.png',
	'/app/about/01.png',
	'/app/about/01.png',
];

const GallerySection = () => {
	return (
		<section className="h-[724px] pl-[300px] pr-[150px] py-20 bg-[#f4f7f9] justify-center items-center gap-28 inline-flex">
			<div className="flex-col justify-start items-start gap-6 inline-flex">
				<div className="flex-col justify-start items-start gap-2 flex">
					<div className="w-[424px] text-[#ff6636] text-base font-medium leading-snug">
						OUR GALLERY
					</div>
					<div className="w-[424px] text-[#1d1f26] text-[40px] font-semibold leading-[48px]">
						We’ve been here almost 4 years
					</div>
				</div>
				<div className="w-[424px] text-[#4d5565] text-base leading-normal">
					Fusce lobortis leo augue, sit amet tristique nisi commodo in. Aliquam
					ac libero quis tellus venenatis imperdiet. Sed sed nunc libero.
					Curabitur in urna ligula. torquent per conubia nostra.
				</div>
			</div>
			<div className="w-[934px] h-[564px] relative">
				{images.map((src, index) => (
					<Image
						key={index}
						src={src}
						alt={`Gallery Image ${index + 1}`}
						width={238}
						height={160}
						className={`absolute ${getImagePosition(index)}`}
					/>
				))}
			</div>
		</section>
	);
};

// Hàm xác định vị trí từng ảnh theo thứ tự ban đầu
const getImagePosition = (index: number) => {
	const positions = [
		'left-[696px] top-[252px]',
		'left-[696px] top-[436px]',
		'left-[406px] top-0',
		'left-[248px] top-[252px]',
		'left-[102px] top-[32px]',
		'left-[742px] top-[69px]',
		'left-0 top-[252px]',
	];
	return positions[index] || '';
};

/* MAIN COMPONENT */
const AboutSection = () => {
	return (
		<>
			<MissionSection />
			<GallerySection />
		</>
	);
};

export default AboutSection;
