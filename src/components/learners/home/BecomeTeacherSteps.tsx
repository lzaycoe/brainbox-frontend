'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { PiArrowRight } from 'react-icons/pi';

import { Button } from '@/components/ui/button';

const BecomeTeacherSteps: React.FC = () => {
	const router = useRouter();

	const navigate = () => {
		router.push('/become-instructor');
	};

	return (
		<div className="flex flex-wrap gap-6 justify-center items-center px-10 pt-20 pb-20 bg-slate-100 max-md:px-5 max-md:pb-24">
			<div
				className="flex flex-col self-stretch p-10 my-auto min-w-[240px] w-[648px] max-md:px-5 max-md:max-w-full bg-cover bg-center"
				style={{ backgroundImage: 'url(/app/become-a-teacher.png)' }}
			>
				<div
					className="flex flex-col justify-between h-full"
					style={{ width: '60%' }}
				>
					<div className="flex flex-col max-w-full text-white w-[568px]">
						<h2 className="text-3xl font-semibold tracking-tight leading-none max-md:max-w-full">
							Become a teacher
						</h2>
						<p className="mt-3 text-sm tracking-normal leading-6">
							Teachers from around the world teach millions of students on
							Udemy. We provide the tools and skills to teach what you love.
						</p>
					</div>
					<Button
						className="flex gap-3 justify-center items-center self-start px-6 mt-8 text-base font-semibold tracking-normal leading-none text-orange-500 capitalize bg-white shadow-lg max-md:px-5"
						onClick={navigate}
					>
						<span className="self-stretch my-auto">Start teaching</span>
						<PiArrowRight
							className="flex shrink-0 self-stretch my-auto w-6 h-6"
							aria-hidden="true"
						/>
					</Button>
				</div>
			</div>
			<div className="flex flex-col self-stretch p-10 my-auto bg-white min-w-[240px] max-md:px-5 max-md:max-w-full">
				<h2 className="text-3xl font-semibold tracking-tight leading-none text-neutral-800 max-md:max-w-full">
					Your teaching & earning steps
				</h2>
				<div className="flex flex-col mt-7 max-md:max-w-full">
					<div className="flex flex-wrap gap-5 items-start max-md:max-w-full">
						<div className="flex gap-4 justify-center items-center min-w-[240px]">
							<div
								className="flex justify-center items-center text-2xl font-semibold leading-none text-center text-indigo-600 bg-violet-100 h-[52px] rounded-full w-[52px]"
								aria-hidden="true"
							>
								1
							</div>
							<p className="self-stretch my-auto text-base text-neutral-800 w-[206px]">
								Apply to become instructor
							</p>
						</div>
						<div className="flex gap-4 justify-center items-center min-w-[240px]">
							<div
								className="flex justify-center items-center text-2xl font-semibold leading-none text-center text-orange-500 bg-rose-50 h-[52px] rounded-full w-[52px]"
								aria-hidden="true"
							>
								2
							</div>
							<p className="self-stretch my-auto text-base text-neutral-800 w-[206px]">
								Build & edit your profile
							</p>
						</div>
					</div>
					<div className="flex flex-wrap gap-5 items-start mt-5 max-md:max-w-full">
						<div className="flex gap-4 justify-center items-center min-w-[240px]">
							<div
								className="flex justify-center items-center text-2xl font-semibold leading-none text-center text-red-500 bg-rose-50 h-[52px] rounded-full w-[52px]"
								aria-hidden="true"
							>
								3
							</div>
							<p className="self-stretch my-auto text-base text-neutral-800 w-[206px]">
								Create your new course
							</p>
						</div>
						<div className="flex gap-4 justify-center items-center min-w-[240px]">
							<div
								className="flex justify-center items-center text-2xl font-semibold leading-none text-center text-green-600 bg-green-100 h-[52px] rounded-full w-[52px]"
								aria-hidden="true"
							>
								4
							</div>
							<p className="self-stretch my-auto text-base text-neutral-800 w-[206px]">
								Start teaching & earning
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default BecomeTeacherSteps;
