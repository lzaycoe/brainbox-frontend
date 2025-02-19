import { Footer } from '@/components/commons/teachers/Footer';
import { SideBar } from '@/components/commons/teachers/SideBar';

const TeacherLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div className="flex min-h-screen">
			<div className="flex flex-col flex-grow w-full">
				<main className="flex-grow bg-[#f5f7fa] ml-64">{children}</main>
				<Footer />
			</div>
		</div>
	);
};

export default TeacherLayout;
