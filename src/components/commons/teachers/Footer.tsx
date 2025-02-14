import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Footer = () => {
	return (
		<footer className="flex flex-wrap mt-auto gap-10 justify-between items-center px-40 py-3 text-sm tracking-normal leading-loose text-center max-md:px-5 bg-[#f5f7fa] max-md:flex-col max-md:gap-5">
			{/* Footer Text */}
			<div className="self-stretch my-auto text-sm tracking-normal leading-loose max-md:text-center">
				<span>© 2025 - BrainBox. Designed by </span>
				<Link
					href="https://github.com/lzaycoe"
					target="_blank"
					rel="noopener noreferrer"
				>
					<strong>LazyCode</strong>
				</Link>
				<span>. All rights reserved</span>
			</div>

			{/* Avatar List */}
			<div className="flex gap-6 items-center self-stretch my-auto text-gray-500 max-md:justify-center">
				{/* Hiển thị Avatar GitHub */}
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
						className="w-20 h-15"
					/>
				</Link>
			</div>

			{/* Footer Links */}
			<div className="flex gap-6 items-start self-stretch my-auto min-w-[240px] max-md:flex-col max-md:items-center">
				<div>FAQs</div>
				<div>Privacy Policy</div>
				<div>Terms & Condition</div>
			</div>
		</footer>
	);
};
