import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import '@/app/globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'BrainBox | Admin Dashboard',
	description: 'An e-learning platform built with Next.js and Shadcn UI',
};

export default function AdminPageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen`}
			>
				{/* <AdminLayout>{children}</AdminLayout> */}
				{children}
			</body>
		</html>
	);
}
