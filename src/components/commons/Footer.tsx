import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsApple, BsInstagram } from 'react-icons/bs';
import { FaGooglePlay, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { FaArrowRightLong, FaFacebookF } from 'react-icons/fa6';
import { IoLogoYoutube } from 'react-icons/io';
import { MdKeyboardArrowDown } from 'react-icons/md';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Footer = () => {
	return (
		<footer
			className="flex flex-col justify-center items-center pt-12 bg-neutral-800"
			role="contentinfo"
		>
			<div className="flex flex-wrap gap-6 items-start max-md:max-w-full">
				<div className="flex flex-col justify-center min-w-[240px] w-[424px] max-md:max-w-full">
					<div className="flex flex-col w-full text-justify max-w-[424px] max-md:max-w-full">
						<div className="flex gap-2.5 items-center self-start text-4xl font-semibold tracking-tighter leading-none text-white whitespace-nowrap">
							<Image
								loading="lazy"
								src="/app/logo.png"
								alt="BrainBox Logo"
								className="object-contain shrink-0 aspect-square w-[46px]"
								width={46}
								height={46}
							/>
							<div>BrainBox</div>
						</div>
						<div className="mt-5 text-sm tracking-normal leading-6 text-gray-400 max-md:max-w-full">
							Aliquam rhoncus ligula est, non pulvinar elit
							<br />
							convallis nec. Donec mattis odio at.
						</div>
					</div>
					<nav aria-label="Social Media Links">
						<div className="flex gap-3 items-start self-start mt-7">
							<Link
								href="#"
								className="flex gap-2.5 items-center p-3.5 bg-zinc-700 bg-opacity-40 h-[46px] w-[46px] hover:bg-orange-500"
								aria-label="Facebook"
							>
								<FaFacebookF color="#fff" />
							</Link>
							<Link
								href="#"
								className="flex gap-2.5 items-center p-3.5 bg-zinc-700 bg-opacity-40 h-[46px] w-[46px] hover:bg-orange-500"
								aria-label="Twitter"
							>
								<FaTwitter color="#fff" />
							</Link>
							<Link
								href="#"
								className="flex gap-2.5 items-center p-3.5 bg-zinc-700 bg-opacity-40 h-[46px] w-[46px] hover:bg-orange-500"
								aria-label="Instagram"
							>
								<BsInstagram color="#fff" />
							</Link>
							<Link
								href="#"
								className="flex flex-col justify-center items-center px-3.5 bg-zinc-700 bg-opacity-40 h-[46px] w-[46px] hover:bg-orange-500"
								aria-label="LinkedIn"
							>
								<FaLinkedinIn color="#fff" />
							</Link>
							<Link
								href="#"
								className="flex flex-col justify-center items-center px-3.5 bg-zinc-700 bg-opacity-40 h-[46px] w-[46px] hover:bg-orange-500"
								aria-label="YouTube"
							>
								<IoLogoYoutube color="#fff" />
							</Link>
						</div>
					</nav>
				</div>
				<nav
					className="flex flex-col text-sm text-justify w-[200px]"
					aria-label="Top Categories"
				>
					<div className="font-medium leading-none text-white uppercase">
						Top 4 Category
					</div>
					<div className="flex flex-col items-start self-start mt-5 tracking-normal leading-loose text-gray-400">
						<Link
							href="#"
							className="relative gap-3 self-stretch py-1.5 pr-8 whitespace-nowrap bg-neutral-800 hover:bg-transparent hover:text-white group"
						>
							Development
							<div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
							<FaArrowRightLong
								className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								color="#fff"
							/>
						</Link>
						<Link
							href="#"
							className="relative gap-3 self-stretch py-1.5 pr-8 bg-neutral-800 hover:bg-transparent hover:text-white group"
						>
							Finance & Accounting
							<div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
							<FaArrowRightLong
								className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								color="#fff"
							/>
						</Link>
						<Link
							href="#"
							className="relative gap-3 self-stretch py-1.5 pr-8 whitespace-nowrap bg-neutral-800 hover:bg-transparent hover:text-white group"
						>
							Design
							<div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
							<FaArrowRightLong
								className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								color="#fff"
							/>
						</Link>
						<Link
							href="#"
							className="relative gap-3 self-stretch py-1.5 pr-8 whitespace-nowrap bg-neutral-800 hover:bg-transparent hover:text-white group"
						>
							Business
							<div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
							<FaArrowRightLong
								className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								color="#fff"
							/>
						</Link>
					</div>
				</nav>
				<nav
					className="flex flex-col text-sm text-justify w-[200px]"
					aria-label="Quick Links"
				>
					<div className="font-medium leading-none text-white uppercase">
						Quick Links
					</div>
					<div className="flex flex-col items-start self-start mt-5 tracking-normal leading-loose text-gray-400">
						<Link
							href="/about"
							className="relative gap-3 self-stretch py-1.5 pr-8 whitespace-nowrap bg-neutral-800 hover:bg-transparent hover:text-white group"
						>
							About
							<div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
							<FaArrowRightLong
								className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								color="#fff"
							/>
						</Link>
						<Link
							href="/become-teacher"
							className="relative gap-3 self-stretch py-1.5 pr-8 whitespace-nowrap bg-neutral-800 hover:bg-transparent hover:text-white group"
						>
							Become Teacher
							<div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
							<FaArrowRightLong
								className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								color="#fff"
							/>
						</Link>
						<Link
							href="/contact"
							className="relative gap-3 self-stretch py-1.5 pr-8 whitespace-nowrap bg-neutral-800 hover:bg-transparent hover:text-white group"
						>
							Contact
							<div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
							<FaArrowRightLong
								className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								color="#fff"
							/>
						</Link>
						<Link
							href="career"
							className="relative gap-3 self-stretch py-1.5 pr-8 whitespace-nowrap bg-neutral-800 hover:bg-transparent hover:text-white group"
						>
							Career
							<div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
							<FaArrowRightLong
								className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								color="#fff"
							/>
						</Link>
					</div>
				</nav>
				<nav
					className="flex flex-col text-sm text-justify w-[200px]"
					aria-label="Support Links"
				>
					<div className="font-medium leading-none text-white uppercase">
						Support
					</div>
					<div className="flex flex-col items-start self-start mt-5 tracking-normal leading-loose text-gray-400">
						<Link
							href="#"
							className="relative gap-3 self-stretch py-1.5 pr-8 bg-neutral-800 hover:bg-transparent hover:text-white group"
						>
							Help Center
							<div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
							<FaArrowRightLong
								className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								color="#fff"
							/>
						</Link>
						<Link
							href="/FAQs"
							className="relative gap-3 self-stretch py-1.5 pr-8 whitespace-nowrap bg-neutral-800 hover:bg-transparent hover:text-white group"
						>
							FAQs
							<div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
							<FaArrowRightLong
								className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								color="#fff"
							/>
						</Link>
						<Link
							href="/FAQs"
							className="relative gap-3 self-stretch py-1.5 pr-8 bg-neutral-800 hover:bg-transparent hover:text-white group"
						>
							Terms & Condition
							<div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
							<FaArrowRightLong
								className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								color="#fff"
							/>
						</Link>
						<Link
							href="#"
							className="relative gap-3 self-stretch py-1.5 pr-8 bg-neutral-800 hover:bg-transparent hover:text-white group"
						>
							Privacy Policy
							<div className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
							<FaArrowRightLong
								className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
								color="#fff"
							/>
						</Link>
					</div>
				</nav>
				<div className="flex flex-col text-justify w-[200px]">
					<div className="text-sm font-medium leading-none text-white uppercase">
						Download our app
					</div>
					<div className="flex flex-col justify-center self-start mt-5">
						<Link
							href="#"
							className="flex gap-3.5 justify-center items-center px-5 py-3 bg-zinc-700 bg-opacity-40 hover:bg-orange-500"
							aria-label="Download from App Store"
						>
							<BsApple color="#fff" />
							<div className="flex flex-col self-stretch my-auto">
								<div className="text-xs leading-none text-neutral-300">
									Download now
								</div>
								<div className="text-base font-medium leading-none text-white">
									App Store
								</div>
							</div>
						</Link>
						<Link
							href="#"
							className="flex gap-3.5 justify-center items-center px-5 py-3 mt-3 bg-zinc-700 bg-opacity-40 hover:bg-orange-500"
							aria-label="Download from Play Store"
						>
							<FaGooglePlay color="#fff" />
							<div className="flex flex-col self-stretch my-auto">
								<div className="text-xs leading-none text-neutral-300">
									Download now
								</div>
								<div className="text-base font-medium leading-none text-white">
									Play Store
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>
			<div className="w-full h-px mt-16 bg-gray-600"></div>
			<div className="flex flex-wrap gap-10 justify-between items-center px-20 py-4 w-full text-justify shadow-sm bg-neutral-800 max-md:px-5 max-md:mt-10 max-md:max-w-full">
				<div className="self-stretch my-auto text-sm tracking-normal leading-loose text-gray-400">
					<span>© 2025 - BrainBox. Designed by </span>
					<a href="https://github.com/lzaycoe" className="text-white">
						LazyCode
					</a>
					<span>. All rights reserved</span>
				</div>
				<div className="flex gap-6 items-center self-stretch my-auto text-gray-500">
					<Link
						href="https://github.com/lzaycoe/brainbox-frontend/graphs/contributors"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Image
							src="https://contrib.rocks/image?repo=lzaycoe/brainbox-frontend"
							alt="Contributors to BrainBox"
							width={100}
							height={20}
							className="w-56 h-15"
						/>
					</Link>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							className="flex overflow-hidden gap-10 justify-center self-stretch px-4 py-3 my-auto text-base text-gray-400 whitespace-nowrap border border-solid bg-neutral-800 border-zinc-700 "
							aria-label="Select Language"
						>
							<span>English</span>
							<MdKeyboardArrowDown color="#fff" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>English</DropdownMenuItem>
						<DropdownMenuItem>Vietnamese</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</footer>
	);
};
