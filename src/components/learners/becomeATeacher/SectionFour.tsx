import Image from 'next/image';
import React from 'react';
import { FaEnvelope } from 'react-icons/fa';

export default function SectionFour() {
	return (
		<div className="flex justify-center items-center px-4 py-10 bg-rose-100">
			<div className="grid grid-cols-12 gap-4 w-full max-w-screen-xl">
				<div className="col-span-1"></div>
				<div className="col-span-10 flex flex-col md:flex-row items-center gap-8">
					<div className="md:w-1/2 flex justify-center">
						<Image
							src="/app/become_a_teacher/become_a_teacher_4.png"
							alt="Support team illustration"
							className="object-contain w-full h-auto"
							width={500}
							height={5500}
							priority={false}
						/>
					</div>
					<div className="col-span-1"></div>

					<div className="flex flex-col self-stretch my-auto w-[480px] min-w-[240px] max-md:max-w-full justify-end">
						<div className="flex flex-col max-w-full w-[536px]">
							<h2 className="text-4xl font-semibold tracking-tight leading-10 text-neutral-800 max-md:max-w-full">
								Rest assured, we are always here to assist you
							</h2>
							<p className="mt-6 text-lg tracking-tight leading-6 text-gray-500 max-md:max-w-full">
								Our team is dedicated to providing the support you need,
								ensuring a smooth and stress-free experience. Whether you are
								facing challenges or looking for guidance, we are here to help.
							</p>
						</div>
						<ul className="flex flex-col mt-8 text-sm tracking-normal leading-loose text-neutral-800 max-md:max-w-full">
							<li className="flex flex-wrap gap-2 items-center max-md:max-w-full">
								<span className="self-stretch my-auto w-[504px] max-md:max-w-full">
									We offer expert advice and solutions to help you overcome any
									obstacles you may encounter.
								</span>
							</li>
							<li className="flex flex-wrap gap-2 items-center mt-3 max-md:max-w-full">
								<span className="self-stretch my-auto w-[504px] max-md:max-w-full">
									If you are considering a career change, we are here to support
									you every step of the way.
								</span>
							</li>
							<li className="flex flex-wrap gap-2 items-center mt-3 max-md:max-w-full">
								<span className="self-stretch my-auto w-[504px] max-md:max-w-full">
									Our resources are designed to help you succeed, no matter what
									path you choose.
								</span>
							</li>
							<li className="flex flex-wrap gap-2 items-center mt-3 max-md:max-w-full">
								<span className="self-stretch my-auto w-[504px] max-md:max-w-full">
									We are committed to offering continuous support and ensuring
									your success.
								</span>
							</li>
						</ul>

						<footer
							className="flex gap-4 justify-center items-center self-start mt-8"
							aria-label="Contact Information"
						>
							<div className="flex flex-col self-stretch my-auto w-14">
								<div
									className="flex justify-center items-center w-14 h-14 bg-white rounded-full"
									aria-hidden="true"
								>
									<FaEnvelope className="w-5 h-5 text-gray-600" />
								</div>
							</div>
							<div className="flex flex-col self-stretch my-auto font-medium">
								<span className="text-xs leading-none text-gray-400 uppercase">
									Email us, anytime anywhere
								</span>
								<a
									href="mailto:help.brainbox@gamil.com"
									className="mt-2 text-lg leading-none text-neutral-800 hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								>
									help.brainbox@gamil.com
								</a>
							</div>
						</footer>
					</div>
				</div>
				<div className="col-span-1"></div>
			</div>
		</div>
	);
}
