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
	const styles = {
		wrapper:
			'w-full max-w-[1320px] h-auto px-5 py-10 bg-[#f4f7f9] flex justify-center items-start gap-10 mx-auto',
		leftColumn:
			'w-[450px] h-[250px] flex-shrink-0 rounded overflow-hidden shadow-lg', // Ảnh cố định 450x250
		rightColumn: 'w-[400px] flex flex-col gap-3', // Thu nhỏ chiều rộng cột văn bản
		heading: 'text-[#1d1f26] text-[24px] font-semibold leading-[32px]', // Giảm kích thước tiêu đề
		subheading: 'text-[#4d5565] text-sm leading-normal', // Giữ nguyên kích thước phụ đề
		card: 'p-4 bg-white shadow-md rounded-lg flex gap-3 items-start', // Card gọn hơn
		title: 'text-[#1d1f26] text-sm font-medium leading-snug',
		description: 'text-[#6e7484] text-xs leading-snug',
		icon: 'text-[#4d5565] text-[32px] flex-shrink-0', // Style cho icon
	};
	return (
		<div className={styles.wrapper}>
			{/* Hình ảnh bên trái */}
			<div className={styles.leftColumn}>
				<Image
					src="/app/career/Career_02.png"
					alt="Vietnam"
					width={450}
					height={250}
					className="object-cover w-full h-full"
				/>
			</div>

			{/* Phần văn bản và card bên phải */}
			<div className={styles.rightColumn}>
				{/* Phần văn bản */}
				<div className="flex flex-col justify-start items-start gap-2">
					<h2 className={styles.heading}>Why you will join our team</h2>
					<p className={styles.subheading}>
						Quisque leo leo, suscipit sed arcu sit amet, iaculis feugiat felis.
						Vestibulum non consectetur tortor. Morbi at orci vehicula, vehicula
						mi ut, vestibulum odio.
					</p>
				</div>

				{/* Các card */}
				<div className="flex flex-col justify-start items-start gap-3">
					<div className={styles.card}>
						{/* Thay bằng icon TbAward */}
						<TbSquareRoundedCheckFilled className={styles.icon} />
						<div className="flex flex-col justify-start items-start gap-1">
							<div className={styles.title}>
								Ut justo ligula, vehicula sed egestas vel.
							</div>
							<div className={styles.description}>
								Quisque leo leo, suscipit sed arcu sit amet, iaculis feugiat
								felis. Vestibulum non consectetur tortor. Morbi at orci
								vehicula, vehicula mi ut, vestibulum odio.
							</div>
						</div>
					</div>
					<div className={styles.card}>
						{/* Thay bằng icon TbRocket */}
						<TbSquareRoundedCheckFilled className={styles.icon} />
						<div className="flex flex-col justify-start items-start gap-1">
							<div className={styles.title}>
								Aenean vitae leo leo praesent ullamcorper ac.
							</div>
							<div className={styles.description}>
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
