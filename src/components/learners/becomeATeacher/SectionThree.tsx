import Image from 'next/image';

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
export default function SectionThree() {
	return (
		<>
			<div className="flex justify-center items-center px-4 py-10 bg-white">
				<div className="grid grid-cols-12 gap-4 w-full max-w-screen-xl">
					<div className="col-span-1"></div>
					<div className="col-span-10 flex flex-col md:flex-row items-center gap-8">
						<div className="flex flex-col self-stretch my-auto w-[424px] min-w-[240px] max-md:max-w-full">
							<div className="flex flex-col w-full">
								<h2 className="text-4xl font-semibold tracking-tight leading-10 max-md:max-w-full">
									Instructor rules & regulations
								</h2>
								<div className="mt-6 text-lg tracking-tight leading-6 text-gray-500 max-md:max-w-full">
									High-level leadership is essential in creating a thriving
									community, where collaboration and consistency bring
									long-lasting success. Working with others requires effective
									communication and a willingness to adapt to new strategies for
									improvement.
								</div>
								<ul className="flex flex-col mt-6 max-w-full text-base w-[536px] list-disc pl-5">
									<li className="max-md:max-w-full">
										Foster a positive and open environment for everyone to
										contribute and share ideas.
									</li>
									<li className="mt-3 max-md:max-w-full">
										Be open to new learning methods, staying flexible to adapt
										to changing needs.
									</li>
									<li className="mt-3 leading-6 max-md:max-w-full">
										Approach challenges with a solution-oriented mindset, always
										focusing on achieving the best results.
									</li>
									<li className="mt-3 max-md:max-w-full">
										Cultivate a culture of continuous growth, pushing the limits
										of what is possible while maintaining a supportive
										environment.
									</li>
								</ul>
							</div>
						</div>

						<div className="col-span-1"></div>
						<div className="col-span-1"></div>
						<div className="md:w-1/2 flex justify-end">
							<Image
								loading="lazy"
								src="/app/become_a_teacher_3.png"
								alt="Instructor rules and regulations illustration"
								className="object-contain w-full h-auto"
								width={500}
								height={400}
							/>
						</div>
					</div>
					<div className="col-span-1"></div>
				</div>
			</div>
		</>
	);
}
