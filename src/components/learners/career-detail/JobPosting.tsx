import { FiCheck } from 'react-icons/fi';
import { IoMdArrowForward } from 'react-icons/io';
import { MdLibraryBooks, MdOutlineLocationOn } from 'react-icons/md';
import { PiHandbag } from 'react-icons/pi';

const Navbar = () => (
	<div className="max-w-[1100px] mx-auto h-[88px] px-10 py-5 bg-white flex justify-between items-center">
		<div className="flex items-center gap-2">
			<div data-svg-wrapper className="relative">
				<svg
					width="42"
					height="40"
					viewBox="0 0 42 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M2.25 15L21 5L39.75 15L21 25L2.25 15Z"
						stroke="#FF6636"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M30.375 37.5V20L21 15"
						stroke="#FF6636"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						d="M35.375 17.332V25.8509C35.3755 26.1206 35.2884 26.3831 35.1266 26.5989C34.074 27.9995 29.6333 33.1237 21 33.1237C12.3667 33.1237 7.92597 27.9995 6.87336 26.5989C6.71165 26.3831 6.62449 26.1206 6.625 25.8509V17.332"
						stroke="#FF6636"
						strokeWidth="3"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</div>
			<div className="text-[#1d1f26] text-[32px] font-semibold leading-10">
				BrainBox
			</div>
		</div>
		<div>
			<button className="px-6 py-2 bg-[#ffeee8] text-[#ff6636] text-base font-semibold capitalize">
				Back to homepage
			</button>
		</div>
	</div>
);

const ApplyButton = () => (
	<button className="flex gap-3 justify-center items-center px-8 py-1 text-lg font-semibold text-white bg-orange-500 hover:bg-orange-600 transition duration-300 leading-[40px] max-md:px-5">
		<span>Apply now</span>
		<IoMdArrowForward className="w-6 h-6" />
	</button>
);

const JobHeader = () => (
	<header className="flex flex-wrap gap-10 justify-between items-start px-40 py-20 w-full bg-slate-100 max-md:px-5 max-md:max-w-full">
		<div className="flex w-full justify-between max-md:flex-col max-md:items-start">
			<div className="flex flex-col self-stretch my-auto min-w-60 w-[60%] max-md:max-w-full">
				<div className="flex flex-col w-full max-md:max-w-full">
					<div className="flex gap-4 items-start self-start text-base text-gray-600">
						<div className="flex gap-1.5 items-center">
							<MdOutlineLocationOn className="text-blue-500 text-lg" />
							<span>Tokyo, Japan</span>
						</div>
						<div className="flex gap-1.5 items-center whitespace-nowrap">
							<PiHandbag className="text-green-500 text-lg" />
							<span>Full-Time</span>
						</div>
						<div className="flex gap-1.5 items-center">
							<MdLibraryBooks className="text-orange-500 text-lg" />
							<span>01 Vacancy</span>
						</div>
					</div>
					<h1 className="mt-3 text-4xl font-semibold tracking-tight leading-tight text-neutral-800 max-md:max-w-full">
						Product Designer (UI/UX Designer)
					</h1>
				</div>
				<div className="flex gap-6 mt-10 text-base max-md:flex-col max-md:max-w-full">
					<address className="w-1/2 not-italic">
						<h2 className="font-medium leading-none text-orange-500">
							ADDRESS
						</h2>
						<p className="mt-2 leading-6 text-neutral-800">
							FPT University Campus, An Phu Thinh, Quy Nhon City, Quy Nhon
						</p>
					</address>
					<div className="w-1/2">
						<h2 className="font-medium leading-none text-orange-500">
							CONTACT
						</h2>
						<p className="mt-2 leading-6 text-neutral-800">
							career.lazycode@gmail.com
							<br />
							(219) 555-0114
						</p>
					</div>
				</div>
			</div>
			<div className="flex items-center self-start w-[40%] justify-end max-md:w-full max-md:justify-start mt-20">
				<ApplyButton />
			</div>
		</div>
	</header>
);

interface JobSectionProps {
	title: string;
	children: React.ReactNode;
}

const JobSection = ({ title, children }: JobSectionProps) => (
	<section className="mt-10 max-w-full w-[648px]">
		<h2 className="text-xl font-medium leading-tight text-neutral-800">
			{title}
		</h2>
		<div className="mt-4 text-sm text-gray-500">{children}</div>
	</section>
);

const JobPosting = () => {
	const requirements = [
		'Vestibulum hendrerit facilisis libero, pretium condimentum ipsum vulputate at.',
		'Quisque varius auctor augue id blandit.',
		'Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
		'Ut ut magna condimentum, pharetra est nec, lacinia nulla.',
		'Aliquam tempus mollis sem eget ullamcorper.',
		'Donec non orci eget lorem laoreet ullamcorper et et magna.',
		'Curabitur quis ipsum sollicitudin, sagittis elit in, sodales felis.',
		'Nam bibendum tristique nibh id tristique.',
		'Vestibulum lorem libero, rutrum vitae tincidunt quis, sodales quis neque.',
	];

	const benefits = [
		'Nulla facilisi. Integer non euismod neque.',
		'Suspendisse a ligula posuere, convallis dui et, commodo nisl.',
		'Suspendisse a ligula posuere, convallis dui et, commodo nisl aliquam iaculis tristique nulla.',
		'Donec dolor nunc, ultrices ac imperdiet eu, dignissim ut purus.',
		'Mauris et tellus in mauris commodo varius nec sit amet urna.',
		'Integer bibendum, tellus luctus laoreet pulvinar.',
		'Donec dolor nunc, ultrices ac imperdiet eu, dignissim ut purus. Aliquam erat volutpat.',
	];

	return (
		<>
			<Navbar />
			<article className="flex flex-col justify-center items-center pb-20">
				<JobHeader />
				<JobSection title="Requirements">
					<ul className="mt-4 w-full text-sm tracking-normal leading-loose text-gray-500 list-disc pl-5">
						{requirements.map((requirement) => (
							<li key={requirement} className="mt-2.5 max-md:max-w-full">
								{requirement}
							</li>
						))}
					</ul>
				</JobSection>
				<JobSection title="Benefits">
					<ul className="mt-4 text-sm tracking-normal leading-loose text-gray-600 max-md:max-w-full">
						{benefits.map((benefit) => (
							<li
								key={benefit}
								className="flex items-center gap-2 mt-2.5 max-md:max-w-full"
							>
								<FiCheck className="shrink-0 w-5 h-5 text-green-500" />
								<span className="max-md:max-w-full">{benefit}</span>
							</li>
						))}
					</ul>
				</JobSection>
				<JobSection title="Salary">
					<p>Based on Skills [20K - 40K (USD)] and Other Benefits</p>
				</JobSection>
				<JobSection title="Job Nature">
					<p>Job Type: Full Time</p>
					<p>
						Office Hours: 9 AM to 5 PM (Sat-Thurs) 6 days (We will consider
						remote as well)
					</p>
					<p className="mt-4">
						<strong className="font-medium text-neutral-800">Location:</strong>{' '}
						FPT University Campus, An Phu Thinh New Urban Area, Nhon Binh Ward &
						Dong Da Ward, Quy Nhon City, Quy Nhon
					</p>
				</JobSection>
				<div className="mt-10">
					<ApplyButton />
				</div>
			</article>
		</>
	);
};

export default JobPosting;
