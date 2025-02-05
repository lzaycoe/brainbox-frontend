/*
 *  ======================================================================
 *  Copyright (C) 2025 - lzaycoe (Lazy Code)
 *  ======================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  ======================================================================
 */
import Image from 'next/image';
import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function SectionFive() {
	return (
		<div className="flex justify-center items-center px-4 py-10 bg-white">
			<div className="grid grid-cols-12 gap-4 w-full max-w-screen-xl">
				<div className="col-span-12 flex flex-col md:flex-row items-center gap-8 justify-center">
					<div className="flex flex-col self-stretch my-auto w-[454px] min-w-[240px] max-md:max-w-full">
						<div className="flex flex-col max-w-full w-[536px]">
							<h2 className="text-4xl font-semibold tracking-tight leading-10 text-neutral-800 max-md:max-w-full">
								Over 20k Instructors Have Created Their Success Stories with
								BrainBox
							</h2>
							<p className="mt-6 text-xl leading-8 text-gray-600 max-md:max-w-full">
								Our platform has empowered thousands of instructors to achieve
								their dreams. With BrainBox, your success story is just
								beginning.
							</p>
						</div>
						<div
							className="flex flex-col p-8 mt-8 max-w-full text-lg tracking-tight leading-7 bg-rose-100 text-neutral-800 w-[536px] max-md:px-5"
							role="blockquote"
						>
							<p className="mt-5 max-md:max-w-full">
								Join the community of successful instructors. With BrainBox, you
								will find everything you need to grow and succeed in your
								teaching career. Our support and tools are designed for your
								continued success and satisfaction.
							</p>
						</div>

						<div className="flex gap-3 items-start self-start mt-8">
							<button
								className="flex gap-4 items-center p-3 w-12 h-12 bg-slate-100"
								aria-label="Previous testimonial"
							>
								<div className="flex w-6 min-h-[24px]" aria-hidden="true">
									<FaArrowLeft className="w-6 h-6 text-gray-600" />
								</div>
							</button>
							<button
								className="flex gap-4 items-center p-3 w-12 h-12 bg-orange-500 shadow-lg"
								aria-label="Next testimonial"
							>
								<div className="flex w-6 min-h-[24px]" aria-hidden="true">
									<FaArrowRight className="w-6 h-6 text-gray-600" />
								</div>
							</button>
						</div>
					</div>

					<div className="md:w-1/2 flex justify-center">
						<div className="flex gap-5 max-md:flex-col">
							<div className="flex flex-col w-[58%] max-md:ml-0 max-md:w-full">
								<div className="flex flex-col w-full max-md:mt-6 max-md:max-w-full">
									<div className="max-md:max-w-full">
										<div className="flex gap-5 max-md:flex-col">
											<div className="flex flex-col w-[39%] max-md:ml-0 max-md:w-full">
												<Image
													loading="lazy"
													src="/app/become_a_teacher_5.1.png"
													alt="Instructor success story 1"
													width={129}
													height={129}
													className="object-contain shrink-0 mt-16 max-w-full aspect-square max-md:mt-10"
												/>
											</div>
											<div className="flex flex-col ml-5 w-[61%] max-md:ml-0 max-md:w-full">
												<Image
													loading="lazy"
													src="/app/become_a_teacher_5.2.png"
													alt="Instructor success story 2"
													width={200}
													height={200}
													className="object-contain shrink-0 max-w-full aspect-square max-md:mt-10"
												/>
											</div>
										</div>
									</div>
									<Image
										loading="lazy"
										src="/app/become_a_teacher_5.7.png"
										alt="Instructor success story 3"
										width={536}
										height={536}
										className="object-contain mt-6 w-full aspect-square max-md:max-w-full"
									/>
									<div className="mt-6 max-md:max-w-full">
										<div className="flex gap-5 max-md:flex-col">
											<div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
												<Image
													loading="lazy"
													src="/app/become_a_teacher_5.4.png"
													alt="Instructor success story 4"
													width={200}
													height={200}
													className="object-contain shrink-0 max-w-full aspect-square max-md:mt-6"
												/>
											</div>
											<div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
												<Image
													loading="lazy"
													src="/app/become_a_teacher_5.3.png"
													alt="Instructor success story 5"
													width={200}
													height={128}
													className="object-contain grow shrink-0 max-w-full aspect-[0.64] max-md:mt-6"
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="flex flex-col ml-5 w-[42%] max-md:ml-0 max-md:w-full">
								<div className="flex flex-col items-start self-stretch my-auto max-md:mt-10">
									<Image
										loading="lazy"
										src="/app/become_a_teacher_5.8.png"
										alt="Instructor success story 6"
										width={200}
										height={128}
										className="object-contain max-w-full aspect-[0.64]"
									/>
									<Image
										loading="lazy"
										src="/app/become_a_teacher_5.6.png"
										alt="Instructor success story 7"
										width={536}
										height={536}
										className="object-contain self-stretch mt-6 w-full aspect-square"
									/>
									<Image
										loading="lazy"
										src="/app/become_a_teacher_5.5.png"
										alt="Instructor success story 8"
										width={200}
										height={200}
										className="object-contain mt-6 max-w-full aspect-square"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
