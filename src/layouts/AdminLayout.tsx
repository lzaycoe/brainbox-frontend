'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { Header } from '@/components/commons/admins/Header';
import { SideBar } from '@/components/commons/admins/SideBar';
import { Footer } from '@/components/commons/teachers/Footer';
import { routeConfig } from '@/config/routerConfig';
import { getAdminInfo } from '@/utils/adminInfo';

interface AdminLayoutProps {
	children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
	const pathname = usePathname();
	const [title, setTitle] = useState('Dashboard');
	const adminInfo = getAdminInfo();

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

		setTitle(
			matchedRoute
				? routeConfig[matchedRoute].title
				: adminInfo?.username || 'Guest',
		);
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

export default AdminLayout;
