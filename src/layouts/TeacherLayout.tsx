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
		let title = 'Teacher Portal';

		switch (true) {
			case pathname.includes('/teachers/dashboard'):
				title = 'Dashboard';
				break;
			case pathname.includes('/teachers/create-course'):
				title = 'Create course';
				break;
			case pathname.includes('/teachers/courses'):
				title = 'My courses';
				break;
			case pathname.includes('/teachers/earnings'):
				title = 'My earnings';
				break;
			case pathname.includes('/teachers/messages'):
				title = 'My messages';
				break;
			case pathname.includes('/teachers/settings'):
				title = 'Settings';
				break;
			default:
				title = 'Teacher Portal';
		}

		setTitle(title);
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
