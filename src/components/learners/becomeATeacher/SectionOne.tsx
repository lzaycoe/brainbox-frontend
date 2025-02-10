import Head from 'next/head';
import Image from 'next/image';
import { PiCheckCircle } from 'react-icons/pi';

export default function SectionOne() {
	return (
		<>
			<Head>
				<title>Section</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link
					href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
					rel="stylesheet"
				/>
			</Head>

			<div className="flex justify-center items-center px-4 py-10 bg-white">
				<div className="grid grid-cols-12 gap-4 w-full max-w-screen-xl">
					<div className="col-span-1"></div>
					<div className="col-span-10 flex flex-col md:flex-row items-center gap-8">
						<Image
							loading="lazy"
							src="/app/become_a_teacher_2.png"
							alt="Teacher interacting with students on BrainBox platform"
							className="object-contain aspect-[1.19] min-w-[240px] w-[698px] max-md:max-w-full"
							width={698}
							height={557}
						/>
						<div className="flex flex-col min-w-[240px] w-[536px] max-md:max-w-full">
							<div className="flex flex-col max-w-full w-[536px]">
								<h2
									id="teaching-benefits-title"
									className="text-4xl font-semibold tracking-tight leading-10 text-neutral-800 max-md:max-w-full"
								>
									Why You Should Start Teaching on BrainBox
								</h2>
								<p className="mt-6 text-lg tracking-tight leading-6 text-gray-600 max-md:max-w-full">
									Begin your teaching journey with BrainBox, where you can
									engage with students and make a lasting impact. Our platform
									allows you to teach the way you want, manage your courses and
									payments, and communicate easily with your students.
								</p>
							</div>
							<div className="flex flex-col mt-8 max-md:max-w-full">
								<div className="flex gap-4 max-md:max-w-full">
									<PiCheckCircle
										className="object-contain self-start w-10 h-10 aspect-square"
										color="#23BD33"
									/>
									<div className="flex flex-col min-w-[240px] w-[480px] max-md:max-w-full">
										<h3 className="text-lg font-medium leading-none text-neutral-800 max-md:max-w-full">
											Teach Your Students the Way You Want
										</h3>
										<p className="mt-2.5 text-sm tracking-normal leading-6 text-gray-500 max-md:max-w-full">
											You can personalize your teaching approach, focusing on
											the aspects that matter most to your students and ensuring
											an engaging experience.
										</p>
									</div>
								</div>

								<div className="flex gap-4 max-md:max-w-full">
									<PiCheckCircle
										className="object-contain w-10 h-10 aspect-square"
										color="#23BD33"
									/>
									<div className="flex flex-col min-w-[240px] w-[480px] max-md:max-w-full">
										<h3 className="text-lg font-medium leading-none text-neutral-800 max-md:max-w-full">
											Manage Your Course and Payments in One Place
										</h3>
										<p className="mt-2.5 text-sm tracking-normal leading-6 text-gray-500 max-md:max-w-full">
											Stay organized with a streamlined system that allows you
											to manage all aspects of your course and payments from one
											central location.
										</p>
									</div>
								</div>

								<div className="flex gap-4 max-md:max-w-full">
									<PiCheckCircle
										className="object-contain w-10 h-10 aspect-square self-start"
										color="#23BD33"
									/>
									<div className="flex flex-col min-w-[240px] w-[480px] max-md:max-w-full">
										<h3 className="text-lg font-medium leading-none text-neutral-800 max-md:max-w-full">
											Chat with Your Students
										</h3>
										<p className="mt-2.5 text-sm tracking-normal leading-6 text-gray-500 max-md:max-w-full">
											Communicate easily with your students through our
											integrated chat feature, enhancing your teaching
											experience and engagement.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-span-1"></div>
				</div>
			</div>
		</>
	);
}
