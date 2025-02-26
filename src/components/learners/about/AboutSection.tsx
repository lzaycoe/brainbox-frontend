import { Quote } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { IoArrowForwardSharp } from 'react-icons/io5';

const MissionSection = () => {
	return (
		<section className="w-full px-5 h-auto bg-[#ffeee8] flex justify-center items-center gap-10 pt-4">
			<div className="w-full max-w-[1200px] flex justify-center items-center gap-10">
				<Image
					src="/app/about/AboutSection_01.png"
					alt="Mission Image"
					width={600}
					height={400}
				/>
				<div className="flex-col justify-start items-start gap-6 flex max-w-[536px]">
					<div className="flex-col justify-start items-start gap-2 flex">
						<div className="text-[#ff6636] text-sm font-medium">
							OUR ONE BILLION MISSION
						</div>
						<div className="text-[#1d1f26] text-[40px] font-semibold leading-[40px]">
							Our one billion mission sounds bold, We agree.
						</div>
					</div>
					<div className="text-[#4d5565] text-[18px] leading-normal">
						We cannot solve our problems with the same thinking we used when we
						created them. —Albert Einstein. Institutions are slow to change.
						Committees are where good ideas and innovative thinking go to die.
						Choose agility over dogma. Embrace and drive change. We need to wipe
						the slate clean and begin with bold, radical thinking.
					</div>
				</div>
			</div>
		</section>
	);
};

const GallerySection = () => {
	return (
		<section className="w-full px-5 h-auto bg-[#f4f7f9] flex justify-center items-center gap-10">
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

					<button className="bg-[#ff6636] px-6 py-2 hover:bg-[#e55b31] transition duration-300 flex items-center gap-2">
						<span className="text-white text-sm font-semibold capitalize">
							Join our team
						</span>
						<IoArrowForwardSharp className="text-white text-sm" />
					</button>
				</div>
				<div className="w-[600px] h-[400px] relative">
					<Image
						src="/app/about/AboutSection_02.png"
						alt="Gallery Image"
						width={600}
						height={400}
					/>
				</div>
			</div>
		</section>
	);
};

const TestimonialsSection = () => {
	const testimonials = [
		{
			name: 'Sundar Pichai',
			title: 'Chief Chairman of Google',
			text: 'Eduguard fit us like a glove. Their team curates fresh, up-to-date courses from their marketplace and makes them available to customers.',
		},
		{
			name: 'Satya Nadella',
			title: 'CEO of Microsoft',
			text: 'Eduguard responds to the needs of the business in an agile and global manner. It’s truly the best solution for our employees and their careers.',
		},
		{
			name: 'Ted Sarandos',
			title: 'Chief Executive Officer of Netflix',
			text: 'In total, it was a big success, I would get emails about what a fantastic resource it was.',
		},
	];

	return (
		<section className="mt-10 mb-10 w-full px-5 h-auto bg-white flex justify-center items-center">
			<div className="w-full max-w-[1000px] flex justify-center items-start gap-8">
				{testimonials.map((testimonial) => {
					const [position, company] = testimonial.title.split(' of ');

					const companyLinks = {
						Google: 'https://www.google.com',
						Microsoft: 'https://www.microsoft.com',
						Netflix: 'https://www.netflix.com',
					};
					const companyLink =
						companyLinks[company as keyof typeof companyLinks] || '#';

					return (
						<div
							key={testimonial.name}
							className="flex-col justify-start items-center gap-4 inline-flex"
						>
							<div className="relative p-6 bg-[#f4f7f9] shadow-sm w-[320px] flex flex-col justify-between items-center gap-2">
								<Quote
									className="absolute top-2 left-2 text-[#FF6636] opacity-70 rotate-180"
									size={22}
								/>
								<div className="text-center text-[#1d1f26] text-base font-normal leading-relaxed">
									{testimonial.text}
								</div>
								<Quote
									className="absolute bottom-2 right-2 text-[#FF6636] opacity-70"
									size={22}
								/>
							</div>
							<div className="flex-col justify-start items-center gap-1 flex">
								<div className="w-[320px] text-center text-[#1d1f26] text-sm font-medium leading-snug">
									{testimonial.name}
								</div>
								<div className="w-[320px] text-center">
									<span className="text-[#6e7484] text-xs font-normal leading-snug">
										{position} of{' '}
									</span>
									<a
										href={companyLink}
										target="_blank"
										rel="noopener noreferrer"
										className="text-[#554ffc] text-xs font-medium leading-tight hover:underline"
									>
										{company}
									</a>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

const AboutSection = () => {
	return (
		<>
			<MissionSection />
			<GallerySection />
			<TestimonialsSection />
		</>
	);
};

export default AboutSection;
