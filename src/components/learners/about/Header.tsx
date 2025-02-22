interface Breadcrumb {
	label: string;
	active?: boolean;
}

interface HeaderSectionProps {
	title: string;
	breadcrumbs: Breadcrumb[];
}

const HeaderSection = ({ title, breadcrumbs }: HeaderSectionProps) => (
	<div className="w-full px-[300px] py-[30px] bg-[#F5F7FA] flex flex-col justify-center items-center gap-2 mx-auto">
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

const Header = () => {
	return (
		<div className="overflow-hidden">
			<HeaderSection
				title="About"
				breadcrumbs={[
					{ label: 'Home' },
					{ label: '/' },
					{ label: 'About', active: true },
				]}
			/>
		</div>
	);
};

export default Header;
