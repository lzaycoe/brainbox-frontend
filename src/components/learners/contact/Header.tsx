import Image from 'next/image';
import { GoMail } from 'react-icons/go';

import Content from './Content';
import Footer from './Footer';

// Component tiêu đề section
interface Breadcrumb {
	label: string;
	active?: boolean;
}

interface HeaderSectionProps {
	title: string;
	breadcrumbs: Breadcrumb[];
}

const HeaderSection = ({ title, breadcrumbs }: HeaderSectionProps) => (
	<div className="w-full max-w-[1920px] px-[300px] py-[30px] bg-[#F5F7FA] flex flex-col justify-center items-center gap-2 mx-auto">
		<div className="w-[1320px] text-center text-[#1D2026] text-2xl font-semibold">
			{title}
		</div>
		<div className="flex gap-1 text-sm text-[#6E7485]">
			{breadcrumbs.map((item) => (
				<span key={item.label} className={item.active ? 'text-[#1D2026]' : ''}>
					{item.label}
				</span>
			))}
		</div>
	</div>
);

// Component hiển thị thông tin liên hệ
interface ContactInfoProps {
	title: string;
	description: string;
	buttonText: string;
}

const ContactInfo = ({ title, description, buttonText }: ContactInfoProps) => (
	<div className="flex flex-col items-start gap-6">
		<h2 className="text-5xl font-semibold text-[#1D2026]">{title}</h2>
		<p className="text-lg text-[#4E5566] w-[424px]">{description}</p>
		<button className="inline-flex items-center bg-[#FF6636] text-white px-7 py-2 rounded-lg text-lg font-semibold min-w-fit whitespace-nowrap gap-1">
			<GoMail /> {buttonText}
		</button>
	</div>
);

// Component card hiển thị chi nhánh
interface BranchCardProps {
	image: string;
	location: string;
	address: string;
}

const BranchCard = ({ image, location, address }: BranchCardProps) => (
	<div className="flex relative flex-col px-6 pt-60 pb-6 aspect-[0.857] min-w-60 w-[312px] max-md:px-5 max-md:pt-24">
		<Image
			src={image}
			alt={`${location} branch`}
			layout="fill"
			className="object-cover absolute inset-0 size-full"
		/>
		<article className="flex relative flex-col justify-center items-center py-4 max-w-full bg-white border border-solid border-gray-100 w-[264px]">
			<h3 className="font-medium leading-none text-neutral-800">{location}</h3>
			<address className="mt-2 leading-6 text-gray-500 not-italic">
				{address}
			</address>
		</article>
	</div>
);

// Component chứa danh sách các chi nhánh
const BranchesSection = () => (
	<section className="flex flex-col justify-center items-center px-72 py-14 text-center max-md:px-5 mb-4">
		<header className="flex flex-col justify-center items-center max-md:max-w-full">
			<h2 className="text-4xl font-semibold tracking-tight leading-tight text-neutral-800 max-md:max-w-full">
				Our branches all over the world.
			</h2>
			<p className="mt-5 text-lg tracking-tight leading-6 text-gray-600 max-md:max-w-full">
				Phasellus sed quam eu eros faucibus cursus. Quisque mauris urna,
				imperdiet id leo quis, luctus auctor nisi.
			</p>
		</header>
		<div className="flex flex-nowrap gap-6 items-start mt-10 text-sm tracking-normal max-md:max-w-full">
			<BranchCard
				image="/app/contact/branch01.png"
				location="Binh Dinh, Viet Nam"
				address="FPT University Campus, An Phu Thinh, Quy Nhon City, Quy Nhon"
			/>
			<BranchCard
				image="/app/contact/branch02.png"
				location="Tokyo, Japan"
				address="901 N Pitt Str., Suite 170, Tokyo, VA 22314, Japan"
			/>
			<BranchCard
				image="/app/contact/branch03.png"
				location="Moscow, Russia"
				address="Anjeliersstraat 470H, 1015 NL, Moscow, Russia"
			/>
			<BranchCard
				image="/app/contact/branch04.png"
				location="Mumbai, India"
				address="36 East 20th St, 6th Floor, Mumbai, India"
			/>
		</div>
	</section>
);

// Component chính chứa tất cả
const Header = () => {
	return (
		<div className="overflow-hidden">
			<HeaderSection
				title="Contact"
				breadcrumbs={[
					{ label: 'Home' },
					{ label: '/' },
					{ label: 'Contact', active: true },
				]}
			/>
			<div className="w-full max-w-[1920px] h-auto px-[300px] py-12 bg-white border-t border-[#FFDDD1] flex justify-center items-center gap-[136px] mx-auto">
				<ContactInfo
					title="Connect with us"
					description="Want to chat? We’d love to hear from you! Get in touch with our Customer Success Team..."
					buttonText="Copy Email"
				/>
				<Image
					src="/app/contact/contact1.png"
					alt="Contact Visual"
					width={760}
					height={400}
					className="shadow-2xl"
				/>
			</div>
			<div className="w-full border-t border-gray-300 opacity-50"></div>
			<BranchesSection />
			<Content />
			<Footer />
		</div>
	);
};

export default Header;
