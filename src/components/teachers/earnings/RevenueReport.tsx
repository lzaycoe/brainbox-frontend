import Image from 'next/image';
import React from 'react';
import { IoIosArrowDown } from 'react-icons/io';

import { CreditCard } from './CreditCard';

export const RevenueReport = () => {
	return (
		<section className="flex flex-row justify-between p-10 max-w-[1410px] mx-auto gap-x-4 h-full items-center">
			<div className="flex flex-col w-3/5 bg-white p-16 shadow-xl h-full">
				<header className="flex flex-wrap gap-10 justify-between items-center px-5 py-4 w-full whitespace-nowrap bg-white shadow-sm max-md:max-w-full">
					<h2 className="text-lg font-medium text-neutral-800">Statistic</h2>
					<div className="flex gap-2 items-center text-sm text-gray-500">
						<div className="flex gap-2 items-center text-sm text-gray-500">
							<span>Revenue</span>
							<IoIosArrowDown className="w-4 h-4" />
						</div>
					</div>
				</header>

				<div className="flex flex-wrap gap-5 self-center mt-5 w-full text-xs text-gray-400 max-w-[900px] max-md:max-w-full">
					<aside className="whitespace-nowrap min-h-[400px] max-md:hidden">
						<div>1m</div>
						<div className="mt-12 max-md:mt-10">500k</div>
						<div className="mt-12 max-md:mt-10">100k</div>
						<div className="mt-12 max-md:mt-10">50k</div>
						<div className="mt-12 max-md:mt-10">10k</div>
						<div className="mt-12 max-md:mt-10">1k</div>
						<div className="mt-12 max-md:mt-10">0</div>
					</aside>

					<figure className="grow shrink-0 self-end mt-20 basis-0 w-fit max-md:mt-10 max-md:max-w-full">
						<Image
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e0707c0165d389dc6f3858a40d12209b0a792a9298eb3d7440331849c03fd39?placeholderIfAbsent=true&apiKey=eb47009d56d84332945ecb583277e964"
							alt="Revenue statistics chart"
							width={900}
							height={300}
							className="object-contain w-full aspect-[2.9] max-md:max-w-full"
						/>
						<figcaption className="flex flex-wrap gap-10 justify-between items-center mt-5 max-md:max-w-full">
							<time>Aug 01</time>
							<time>Aug 10</time>
							<time>Aug 20</time>
							<time>Aug 31</time>
						</figcaption>
					</figure>
				</div>
			</div>

			<div className="w-2/5 flex justify-center items-center bg-white p-16 shadow-xl h-full">
				<CreditCard />
			</div>
		</section>
	);
};
