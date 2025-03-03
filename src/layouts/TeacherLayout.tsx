'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Footer } from '@/components/commons/teachers/Footer';
import { Header } from '@/components/commons/teachers/Header';
import { SideBar } from '@/components/commons/teachers/SideBar';
import { routeConfig } from '@/config/routerConfig';

interface TeacherLayoutProps {
	children: React.ReactNode;
}

const TeacherLayout: React.FC<TeacherLayoutProps> = ({ children }) => {
	const pathname = usePathname();
	const [title, setTitle] = useState('Dashboard');

	useEffect(() => {
		const matchedRoute = Object.keys(routeConfig).find((route) => {
			if (routeConfig[route].dynamic) {
				const routeParts = route.split('/');
				const pathParts = pathname.split('/');
				if (routeParts.length !== pathParts.length) {
					return false;
				}
				return routeParts.every((part, index) => {
					if (part.startsWith('[') && part.endsWith(']')) {
						return true;
					}
					return part === pathParts[index];
				});
			}
			return pathname.includes(route);
		});

		setTitle(matchedRoute ? routeConfig[matchedRoute].title : 'Teacher Portal');
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
