'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import '@/app/globals.css';
import Loading from '@/components/commons/Loading';
import { Toaster } from '@/components/ui/toaster';
import AdminLayout from '@/layouts/AdminLayout';
import { getAdminInfo } from '@/utils/adminInfo';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export default function AdminPageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();
	const isLoginRoute = pathname === '/admins/login';

	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	useEffect(() => {
		const checkAdminInfo = () => {
			const adminInfo = getAdminInfo();
			if (adminInfo?.username) {
				setIsAuthenticated(true);
			}
			setIsLoading(false);
		};

		checkAdminInfo();
	}, []);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen mt-20">
				<Loading />
			</div>
		);
	}

	if (!isAuthenticated && !isLoginRoute) {
		if (typeof window !== 'undefined') {
			window.location.href = '/admins/login';
		}
		return null;
	}

	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen`}
			>
				{isLoginRoute ? children : <AdminLayout>{children}</AdminLayout>}
				<Toaster />
			</body>
		</html>
	);
}
