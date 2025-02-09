import React from 'react';

import { Footer } from '@/components/commons/teachers/Footer';
import { Header } from '@/components/commons/teachers/Header';
import { SideBar } from '@/components/commons/teachers/SideBar';

const TeacherLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div className="flex">
			<SideBar />
			<div
				className="flex flex-col flex-grow w-full"
				style={{ marginLeft: '300px' }}
			>
				<Header />
				<main className="flex-grow bg-[#f5f7fa]">{children}</main>
				<Footer />
			</div>
		</div>
	);
};

export default TeacherLayout;
