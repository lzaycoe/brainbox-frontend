import Image from 'next/image';
import React from 'react';
import { TbSquareRoundedCheckFilled } from 'react-icons/tb';

interface Breadcrumb {
	label: string;
	active?: boolean;
}

interface HeaderSectionProps {
	title: string;
	breadcrumbs: Breadcrumb[];
}

const HeaderSection = ({ title, breadcrumbs }: HeaderSectionProps) => (
	<div className="w-full px-5 py-4 bg-[#F5F7FA] flex flex-col justify-center items-center gap-2 mx-auto">
		<div className="w-full max-w-[1320px] text-center text-[#1D2026] text-2xl font-semibold">
			{title}
		</div>
		<div className="flex gap-1 text-sm text-[#6E7485]">
			{breadcrumbs.map((item, index) => (
				<span key={index} className={item.active ? 'text-[#1D2026]' : ''}>
					{item.label}
				</span>
			))}
		</div>
	</div>
);

interface ContactInfoProps {
	title: string;
	description: string;
	buttonText: string;
}

const ContactInfo = ({ title, description, buttonText }: ContactInfoProps) => (
	<div className="flex flex-col items-start gap-4 max-w-[400px]">
		<h2 className="text-[30px] font-semibold text-[#1D2026]">{title}</h2>
		<p className="text-[13px] text-[#4E5566]">{description}</p>
		<button className="inline-flex items-center bg-[#FF6636] text-white px-5 py-2 text-base font-semibold gap-1">
			{buttonText}
		</button>
	</div>
);

const WhyJoinUs = () => {
	return (
		<div className="w-full max-w-[1320px] h-auto px-5 py-10 bg-[#f4f7f9] flex justify-center items-start gap-20 mx-auto">
			{/* Hình ảnh bên trái */}
			<div className="w-[500px] h-[320px] flex-shrink-0 overflow-hidden">
				<Image
					src="/app/career/Career_02.png"
					alt="Vietnam"
					width={500}
					height={320}
					className="object-cover w-full h-full"
				/>
			</div>

			{/* Phần văn bản và card bên phải */}
			<div className="w-[400px] flex flex-col gap-3">
				<div className="flex flex-col justify-start items-start gap-2">
					<h2 className="text-[#1d1f26] text-[24px] font-semibold leading-[32px]">
						Why you will join our team
					</h2>
					<p className="text-[#4d5565] text-sm leading-normal">
						Quisque leo leo, suscipit sed arcu sit amet, iaculis feugiat felis.
						Vestibulum non consectetur tortor. Morbi at orci vehicula, vehicula
						mi ut, vestibulum odio.
					</p>
				</div>

				{/* Các card */}
				<div className="flex flex-col justify-start items-start gap-3">
					<div className="p-4 bg-white shadow-md flex gap-3 items-start">
						<TbSquareRoundedCheckFilled className="text-[green] text-[32px] flex-shrink-0" />
						<div className="flex flex-col justify-start items-start gap-1">
							<div className="text-[#1d1f26] text-sm font-medium leading-snug">
								Ut justo ligula, vehicula sed egestas vel.
							</div>
							<div className="text-[#6e7484] text-xs leading-snug">
								Quisque leo leo, suscipit sed arcu sit amet, iaculis feugiat
								felis. Vestibulum non consectetur tortor. Morbi at orci
								vehicula, vehicula mi ut, vestibulum odio.
							</div>
						</div>
					</div>
					<div className="p-4 bg-white shadow-md flex gap-3 items-start">
						<TbSquareRoundedCheckFilled className="text-[green] text-[32px] flex-shrink-0" />
						<div className="flex flex-col justify-start items-start gap-1">
							<div className="text-[#1d1f26] text-sm font-medium leading-snug">
								Aenean vitae leo leo praesent ullamcorper ac.
							</div>
							<div className="text-[#6e7484] text-xs leading-snug">
								Aenean vitae leo leo. Praesent ullamcorper ac libero et mattis.
								Aenean vel erat at neque viverra feugiat.
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const Header = () => {
	return (
		<div className="overflow-hidden">
			<HeaderSection
				title="Career"
				breadcrumbs={[
					{ label: 'Home' },
					{ label: '/' },
					{ label: 'Career', active: true },
				]}
			/>
			<div className="w-full max-w-[1320px] h-auto px-5 bg-white flex justify-center items-center gap-20 mx-auto">
				<ContactInfo
					title="Join the most incredible & creative team."
					description="Proin gravida enim augue, dapibus ultrices eros feugiat et. Pellentesque bibendum orci felis, sit amet efficitur felis lacinia ac. Mauris gravida justo ac nunc consectetur."
					buttonText="View Open Positions"
				/>
				<Image
					src="/app/career/Career_01.png"
					alt="Career Visual"
					width={500}
					height={320}
					className="rounded-lg"
				/>
			</div>
			<div className="w-full opacity-50"></div>
			<WhyJoinUs />
		</div>
	);
};

export default Header;
