'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Footer } from '@/components/commons/teachers/Footer';
import { Header } from '@/components/commons/teachers/Header';
import { SideBar } from '@/components/commons/teachers/SideBar';

const TeacherLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	const pathname = usePathname();
	const [title, setTitle] = useState('Dashboard');

	useEffect(() => {
		if (pathname.includes('/teachers/dashboard')) {
			setTitle('Dashboard');
		} else if (pathname.includes('/teachers/settings')) {
			setTitle('Settings');
		} else if (pathname.includes('/teachers/courses')) {
			setTitle('My courses');
		} else {
			setTitle('Teacher Portal');
		}
	}, [pathname]);

	return (
		<div className="flex min-h-screen">
			<SideBar />
			<div className="flex flex-col flex-grow w-full">
				<Header title={title} />
				<main className="flex-grow bg-[#f5f7fa] ml-64">{children}</main>
				<Footer />
			</div>
		</div>
	);
};

export default TeacherLayout;
