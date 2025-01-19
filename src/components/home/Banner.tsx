import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';

export const Banner = () => {
	return (
		<div className="max-md:pl-5">
			<div className="flex gap-5 max-md:flex-col bg-gray-50">
				<div className="flex flex-col w-[42%] pl-9 max-md:ml-0 max-md:w-full ">
					<div className="flex flex-col self-stretch my-auto w-full font-semibold max-md:mt-10 max-md:max-w-full">
						<h1 className="text-7xl tracking-tighter leading-[74px] text-neutral-800 max-md:max-w-full max-md:text-4xl max-md:leading-10">
							Learn with expert anytime anywhere
						</h1>
						<p className="mt-10 text-2xl leading-8 text-gray-600 max-md:max-w-full">
							Our mission is to help people to find the best course online and
							learn with expert anytime, anywhere.
						</p>
						<Button
							className="gap-3 self-start px-10 py-7 mt-10 text-xl tracking-normal text-white capitalize bg-orange-500 leading-[56px] max-md:px-5 max-md:py-3 max-md:text-lg"
							tabIndex={0}
							aria-label="Create Account"
						>
							Create Account
						</Button>
					</div>
				</div>
				<div className="flex flex-col ml-5 w-[58%] max-md:ml-0 max-md:w-full">
					<Image
						loading="lazy"
						src="/app/banner_home.png"
						alt="Online learning illustration showing students learning with experts"
						className="object-contain grow w-full aspect-[1.64] max-md:mt-10 max-md:max-w-full"
						width={800}
						height={500}
					/>
				</div>
			</div>
		</div>
	);
};
