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
	const pathnameAdmin = usePathname();
	const [titleAdmin, setTitleAdmin] = useState('Dashboard');
	const adminInfo = getAdminInfo();

	useEffect(() => {
		const matchedRouteAdmin = Object.keys(routeConfig).find((route) => {
			if (routeConfig[route].dynamic) {
				const routePartsAdmin = route.split('/');
				const pathPartsAdmin = pathnameAdmin.split('/');
				if (routePartsAdmin.length !== pathPartsAdmin.length) {
					return false;
				}
				return routePartsAdmin.every((part, index) => {
					if (part.startsWith('[') && part.endsWith(']')) {
						return true;
					}
					return part === pathPartsAdmin[index];
				});
			}
			return pathnameAdmin.includes(route);
		});

		setTitleAdmin(
			matchedRouteAdmin
				? routeConfig[matchedRouteAdmin].title
				: (adminInfo?.username ?? 'Guest'),
		);
	}, [pathnameAdmin, adminInfo?.username]);

	return (
		<div className="flex min-h-screen">
			<SideBar />
			<div className="flex flex-col flex-grow w-full">
				<Header title={titleAdmin} />
				<main className="flex-grow bg-[#f5f7fa] ml-64">{children}</main>
				<Footer />
			</div>
		</div>
	);
};

export default AdminLayout;
