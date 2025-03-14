import Image from 'next/image';
import React from 'react';

export default function SectionSix() {
	return (
		<div className="flex justify-center items-center px-4 py-10 bg-neutral-800">
			<div className="grid grid-cols-12 gap-4 w-full max-w-screen-xl">
				<div className="col-span-1"></div>
				<div className="col-span-10 flex flex-col md:flex-row items-center gap-8">
					<div className="flex flex-col self-stretch my-auto w-[424px] min-w-[240px] max-md:max-w-full">
						<div className="flex flex-col w-full">
							<h2 className="text-4xl font-semibold tracking-tight leading-10 text-white">
								Start teaching with us and inspire others
							</h2>
							<p className="mt-6 text-base leading-6 text-neutral-300">
								Become an teacher & start teaching with 26k certified teachers.
								Create a success story with 67.1k Students — Grow yourself with
								71 countries.
							</p>
						</div>
						<button
							className="gap-3 self-start px-10 mt-10 text-xl font-semibold tracking-normal text-white capitalize bg-orange-500 leading-[64px] max-md:px-5"
							aria-label="Register as an teacher"
						>
							Register now
						</button>
					</div>

					<div className="col-span-1"></div>
					<div className="col-span-1"></div>
					<div className="md:w-1/2 flex justify-end">
						<Image
							src="/app/become_a_teacher/become_a_teacher_6.png"
							alt="teacher teaching students"
							className="object-contain w-full h-auto"
							width={500}
							height={400}
							priority={false}
						/>
					</div>
				</div>
				<div className="col-span-1"></div>
			</div>
		</div>
	);
}
