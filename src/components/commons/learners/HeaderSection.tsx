import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface Breadcrumb {
	label: string;
	href?: string;
	active?: boolean;
}

interface HeaderSectionProps {
	title: string;
	breadcrumbs: Breadcrumb[];
}

const HeaderSection = ({ title, breadcrumbs }: HeaderSectionProps) => (
	<div className="w-full px-8 py-6 bg-[#F5F7FA] flex flex-col justify-center items-center gap-2 mx-auto">
		<div className="text-center text-[#1D2026] text-2xl font-semibold">
			{title}
		</div>
		<Breadcrumb>
			<BreadcrumbList>
				{breadcrumbs.map((item, index) => (
					<BreadcrumbItem key={item.label}>
						{item.href && !item.active ? (
							<BreadcrumbLink
								href={item.href}
								className="text-[#6E7485] hover:text-[#1D2026]"
							>
								{item.label}
							</BreadcrumbLink>
						) : (
							<span className="text-[#1D2026] font-medium">{item.label}</span>
						)}
						{index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
					</BreadcrumbItem>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	</div>
);

export default HeaderSection;
