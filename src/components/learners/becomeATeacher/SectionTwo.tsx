import {
	PiHandshake,
	PiIdentificationCard,
	PiNewspaperClipping,
	PiPlayCircle,
} from 'react-icons/pi';

export default function SectionTwo() {
	return (
		<section
			className="flex flex-col justify-center items-center px-72 py-20 bg-slate-100 max-md:px-5"
			aria-labelledby="teacher-steps-title"
		>
			<h2
				id="teacher-steps-title"
				className="text-4xl font-semibold tracking-tight leading-10 text-center text-neutral-800 w-[518px] max-md:max-w-full"
			>
				How You Will Become a Successful teacher
			</h2>
			<ul className="flex justify-center gap-6 items-start mt-10 max-md:flex-wrap max-md:max-w-full">
				<li className="flex flex-col justify-center items-center p-6 bg-white w-[312px] max-md:px-5">
					<div className="flex gap-2.5 items-center p-5 w-20 h-20 bg-indigo-600 bg-opacity-10">
						<PiNewspaperClipping
							className="object-contain w-10 h-10 aspect-square"
							color="#564FFD"
						/>
					</div>
					<div className="flex flex-col justify-center items-center mt-6 max-w-full text-center w-[264px]">
						<h3 className="text-lg font-medium leading-none text-neutral-800">
							1. Apply to Become an teacher
						</h3>
						<p className="mt-3 text-sm tracking-normal leading-6 text-gray-500">
							Begin by applying to become an teacher on our platform. Once
							approved, you can get started with teaching.
						</p>
					</div>
				</li>
				<li className="flex flex-col justify-center items-center p-6 bg-white w-[312px] max-md:px-5">
					<div className="flex gap-2.5 items-center p-5 w-20 h-20 bg-rose-50">
						<PiIdentificationCard
							className="object-contain w-10 h-10 aspect-square"
							color="#E34444"
						/>
					</div>
					<div className="flex flex-col justify-center items-center mt-6 max-w-full text-center w-[264px]">
						<h3 className="text-lg font-medium leading-none text-neutral-800">
							2. Set Up and Edit Your Profile
						</h3>
						<p className="mt-3 text-sm tracking-normal leading-6 text-gray-500">
							Customize your profile to reflect your teaching style and
							expertise. Add personal details and set your availability.
						</p>
					</div>
				</li>
				<li className="flex flex-col justify-center items-center p-6 bg-white w-[312px] max-md:px-5">
					<div className="flex gap-2.5 items-center p-5 w-20 h-20 bg-rose-100">
						<PiPlayCircle
							className="object-contain w-10 h-10 aspect-square"
							color="#FF6636"
						/>
					</div>
					<div className="flex flex-col justify-center items-center mt-6 max-w-full text-center w-[264px]">
						<h3 className="text-lg font-medium leading-none text-neutral-800">
							3. Create Your New Course
						</h3>
						<p className="mt-3 text-sm tracking-normal leading-6 text-gray-500">
							Design your course by adding lessons, materials, and setting a
							price. Make sure your course is engaging and informative.
						</p>
					</div>
				</li>
				<li className="flex flex-col justify-center items-center p-6 bg-white w-[312px] max-md:px-5">
					<div className="flex gap-2.5 items-center p-5 w-20 h-20 bg-green-100">
						<PiHandshake
							className="object-contain w-10 h-10 aspect-square"
							color="#23BD33"
						/>
					</div>
					<div className="flex flex-col justify-center items-center mt-6 max-w-full text-center w-[264px]">
						<h3 className="text-lg font-medium leading-none text-neutral-800">
							4. Start Teaching and Earning
						</h3>
						<p className="mt-3 text-sm tracking-normal leading-6 text-gray-500">
							Begin teaching your students and start earning from your courses.
							Engage with learners and grow your teaching reputation.
						</p>
					</div>
				</li>
			</ul>
		</section>
	);
}
