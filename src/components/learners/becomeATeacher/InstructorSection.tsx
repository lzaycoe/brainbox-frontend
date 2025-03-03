'use client';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { User } from '@/schemas/user.schema';
import { getUserByClerkId } from '@/services/api/user';
import { becomeATeacher } from '@/utils/teacherPrice';

export default function InstructorSection() {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [userData, setUserData] = useState<User | null>(null);
	const { user } = useUser();

	console.log(
		'process.env.NEXT_PUBLIC_BECOME_A_TEACHER',
		process.env.NEXT_PUBLIC_BECOME_A_TEACHER,
	);
	const fetchUser = async () => {
		try {
			if (!user) {
				throw new Error('User is undefined');
			}

			const userData = await getUserByClerkId(user?.id);
			setUserData(userData);
		} catch (error) {
			console.error('Failed to fetch user metadata:', error);
			setUserData(null);
		}
	};

	useEffect(() => {
		if (user) {
			fetchUser();
		}
	}, [user?.id]);

	const handlePayment = async () => {
		const paymentData = {
			userId: userData?.id,
			courseId: null,
			price: 50000,
		};

		setIsSubmitting(true);
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}` + `/users/become-a-teacher`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(paymentData),
				},
			);

			if (response.status === 409) {
				setShowPopup(true);
				return;
			}

			// if (!response.ok) {
			// 	throw new Error('Failed to complete payment.');
			// }

			const redirectUrl = await response.text();
			window.location.href = redirectUrl;
		} catch (error) {
			console.error('Error during payment:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			<div className="box-border flex flex-col justify-center items-center px-72 py-10 w-full bg-slate-100 max-md:px-24 max-md:py-8 max-sm:p-5 max-sm:text-center">
				<h1 className="m-0 text-2xl font-semibold tracking-tight leading-none text-center text-neutral-800 max-sm:text-xl">
					Become an Instructor
				</h1>
				<div className="flex gap-2 justify-center items-center mt-4 text-sm tracking-normal leading-loose text-gray-500 max-sm:flex-wrap max-sm:justify-center">
					<Link
						href="/"
						className="cursor-pointer duration-200 ease-linear transition-[color]"
						tabIndex={0}
					>
						Home
					</Link>
					<span className="text-gray-500">/</span>
					<span className="text-neutral-800">Become an instructor</span>
				</div>
			</div>

			<div className="flex justify-center items-center px-4 py-10 bg-white">
				<div className="grid grid-cols-12 gap-4 w-full max-w-screen-xl">
					<div className="col-span-1"></div>
					<div className="col-span-10 flex flex-col md:flex-row items-center gap-8">
						<div className="flex flex-col self-stretch my-auto min-w-[240px] w-[648px] max-md:max-w-full">
							<div className="flex flex-col max-w-full w-[648px]">
								<h2 className="text-6xl font-semibold tracking-tighter leading-none text-neutral-800 max-md:max-w-full max-md:text-4xl">
									Become an Instuctor
								</h2>
								<p className="mt-8 text-2xl leading-8 text-gray-600 max-md:max-w-full">
									Become an instructor & start teaching with 26k certified
									instructors. Create a success story with 67.1k Students — Grow
									yourself with 71 countries.
								</p>
							</div>
							<button
								className="gap-3 self-start px-10 mt-10 text-xl font-semibold tracking-normal text-white capitalize bg-orange-500 leading-[64px] max-md:px-5"
								aria-label="Get Started as an Instructor"
								onClick={handlePayment}
								disabled={isSubmitting}
							>
								Get Started
							</button>

							{showPopup && (
								<div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
									<div className="bg-white p-6 rounded-lg shadow-lg text-center">
										<h3 className="text-lg font-bold text-gray-800 mb-4">
											Payment Error
										</h3>
										<p className="text-gray-600">
											You have already paid for Become a Teacher
										</p>
										<button
											onClick={() => setShowPopup(false)}
											className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
										>
											Close
										</button>
									</div>
								</div>
							)}
						</div>

						<div className="md:w-1/2 flex justify-center">
							<Image
								loading="lazy"
								src="/app/become_a_teacher/become_a_teacher_1.png"
								alt="Instructor Illustration"
								className="object-cover max-w-full h-auto rounded-md shadow-lg"
								width={600}
								height={600}
							/>
						</div>
					</div>
					<div className="col-span-1"></div>
				</div>
			</div>
		</>
	);
}
