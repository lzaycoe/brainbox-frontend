'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import {
	IoIosArrowBack,
	IoIosArrowDown,
	IoIosArrowForward,
} from 'react-icons/io';

export const CreditCard = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const images = ['/app/teacher/Card.png'];

	const nextCard = () => {
		setCurrentIndex((prev) => (prev + 1) % images.length);
	};

	const prevCard = () => {
		setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
	};

	return (
		<section className="overflow-hidden max-w-[600px] h-auto flex flex-col items-center">
			<div className="flex flex-col items-center pb-3 w-full bg-white">
				<header className="flex gap-10 justify-between items-center self-stretch px-5 py-3 w-full whitespace-nowrap bg-white shadow-sm">
					<h2 className="text-base font-medium text-neutral-800">Cards</h2>
					<div className="flex gap-2 items-center text-sm text-gray-500">
						<span>Revenue</span>
						<IoIosArrowDown className="w-4 h-4" />
					</div>
				</header>

				<figure className="mt-3 w-full">
					<Image
						src={images[currentIndex]}
						alt="Card preview"
						width={800}
						height={280}
						className="object-contain w-full shadow-[0px_8px_32px_rgba(69,63,202,0.24)]"
					/>
				</figure>

				<div className="flex gap-10 justify-between items-center mt-6 w-full max-w-sm">
					<div className="flex gap-1.5">
						<span className="w-2.5 h-2.5 bg-orange-500 rounded-full"></span>
						<span className="w-2.5 h-2.5 bg-rose-200 rounded-full"></span>
					</div>
					<div className="flex gap-2">
						<button
							className="w-6 h-6"
							aria-label="Previous card"
							onClick={prevCard}
						>
							<IoIosArrowBack className="w-6 h-6" />
						</button>
						<button
							className="w-6 h-6"
							aria-label="Next card"
							onClick={nextCard}
						>
							<IoIosArrowForward className="w-6 h-6" />
						</button>
					</div>
				</div>

				<button className="flex gap-2 justify-center items-center px-12 py-6 mt-6 w-full max-w-sm text-base font-medium bg-white border border-dashed border-[#E9EAF0] text-neutral-800">
					<CiCirclePlus className="w-8 h-8 text-orange-500" />
					<span>Add new card</span>
				</button>
			</div>
		</section>
	);
};
