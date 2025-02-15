'use client';

import Image from 'next/image';
import React from 'react';
import { GoMail } from 'react-icons/go';

import Content from './Content';
import Footer from './Footer';

const HeaderSection = () => (
	<div className="w-full max-w-[1920px] px-[300px] py-[30px] bg-[#F5F7FA] flex flex-col justify-center items-center gap-2 mx-auto">
		<div className="w-[1320px] text-center text-[#1D2026] text-2xl font-semibold">
			Contact
		</div>
		<div className="flex gap-1 text-sm text-[#6E7485]">
			<span>Home</span>
			<span>/</span>
			<span className="text-[#1D2026]">Contact</span>
		</div>
	</div>
);

const ContactInfo = () => (
	<div className="flex flex-col gap-6">
		<h2 className="text-5xl font-semibold text-[#1D2026]">Connect with us</h2>
		<p className="text-lg text-[#4E5566] w-[424px]">
			Want to chat? We’d love to hear from you! Get in touch with our Customer
			Success Team to inquire about speaking events, advertising rates, or just
			say hello.
		</p>
		<button className="flex items-center bg-[#FF6636] text-white px-6 py-3 rounded-lg text-lg font-semibold">
			<GoMail className="mr-2" /> Copy Email
		</button>
	</div>
);

const ContactImage = () => (
	<Image
		src="/app/contact/contact1.png"
		alt="Contact Visual"
		width={760}
		height={400}
		className="shadow-2xl"
	/>
);

const BranchesSection = () => (
	<section className="flex flex-col justify-center items-center px-72 py-10 text-center max-md:px-5">
		<header className="flex flex-col justify-center items-center max-md:max-w-full">
			<h2 className="text-4xl font-semibold tracking-tight leading-tight text-neutral-800 max-md:max-w-full">
				Our branches all over the world.
			</h2>
			<p className="mt-5 text-lg tracking-tight leading-6 text-gray-600 max-md:max-w-full">
				Phasellus sed quam eu eros faucibus cursus. Quisque mauris urna,
				imperdiet id leo quis, luctus auctor nisi.
			</p>
		</header>
		<div className="flex flex-nowrap gap-6 items-start mt-10 text-sm tracking-normal max-md:max-w-full">
			<div className="flex relative flex-col px-6 pt-60 pb-6 aspect-[0.857] min-w-60 w-[312px] max-md:px-5 max-md:pt-24">
				<Image
					src="/app/contact/branch01.png"
					alt="Mumbai branch background"
					layout="fill"
					className="object-cover absolute inset-0 size-full"
				/>
				<article className="flex relative flex-col justify-center items-center py-4 max-w-full bg-white border border-solid border-[color:var(--Gray-100,#E9EAF0)] w-[264px]">
					<h3 className="font-medium leading-none text-neutral-800">
						Binh Dinh, Viet Nam
					</h3>
					<address className="mt-2 leading-6 text-gray-500 not-italic">
						FPT University Campus, An Phu Thinh,
						<br />
						Quy Nhon City, Quy Nhon
					</address>
				</article>
			</div>

			<div className="flex relative flex-col px-6 pt-60 pb-6 aspect-[0.857] min-w-60 w-[312px] max-md:px-5 max-md:pt-24">
				<Image
					loading="lazy"
					src="/app/contact/branch02.png"
					className="object-cover absolute inset-0 size-full"
					alt="Mumbai branch background"
					layout="fill"
				/>
				<article className="flex relative flex-col justify-center items-center py-4 max-w-full bg-white border border-solid border-[color:var(--Gray-100,#E9EAF0)] w-[264px]">
					<h3 className="font-medium leading-none text-neutral-800">
						Tokyo, Japan
					</h3>
					<address className="mt-2 leading-6 text-gray-500 not-italic">
						901 N Pitt Str., Suite 170
						<br />
						Tokyo, VA 22314, Japan
					</address>
				</article>
			</div>

			<div className="flex relative flex-col px-6 pt-60 pb-6 aspect-[0.857] min-w-60 w-[312px] max-md:px-5 max-md:pt-24">
				<Image
					loading="lazy"
					src="/app/contact/branch03.png"
					className="object-cover absolute inset-0 size-full"
					alt="Mumbai branch background"
					layout="fill"
				/>
				<article className="flex relative flex-col justify-center items-center py-4 max-w-full bg-white border border-solid border-[color:var(--Gray-100,#E9EAF0)] w-[264px]">
					<h3 className="font-medium leading-none text-neutral-800">
						Moscow, Russia
					</h3>
					<address className="mt-2 leading-6 text-gray-500 not-italic">
						Anjeliersstraat 470H, 1015 NL
						<br />
						Moscow, Russia
					</address>
				</article>
			</div>

			<div className="flex relative flex-col px-6 pt-60 pb-6 aspect-[0.857] min-w-60 w-[312px] max-md:px-5 max-md:pt-24">
				<Image
					loading="lazy"
					src="/app/contact/branch04.png"
					className="object-cover absolute inset-0 size-full"
					alt="Mumbai branch background"
					layout="fill"
				/>
				<article className="flex relative flex-col justify-center items-center py-4 max-w-full bg-white border border-solid border-[color:var(--Gray-100,#E9EAF0)] w-[264px]">
					<h3 className="font-medium leading-none text-neutral-800">
						Mumbai, India
					</h3>
					<address className="mt-2 leading-6 text-gray-500 not-italic">
						36 East 20th St, 6th Floor
						<br />
						Mumbai, India
					</address>
				</article>
			</div>
		</div>
	</section>
);

const Header = () => {
	return (
		<div className="overflow-hidden ">
			<HeaderSection />
			<div className="w-full max-w-[1920px] h-auto px-[300px] py-8 bg-white border-t border-[#FFDDD1] flex justify-center items-center gap-[136px] mx-auto">
				<ContactInfo />
				<ContactImage />
			</div>
			<div className="w-full border-t border-gray-300 opacity-50"></div>
			<BranchesSection />
			<Content />
			<Footer />
		</div>
	);
};

export default Header;
