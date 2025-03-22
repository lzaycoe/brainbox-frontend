/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Geist, Geist_Mono } from 'next/font/google';
import { useEffect } from 'react';

import '@/app/globals.css';
import { Toaster } from '@/components/ui/toaster';
import MainLayout from '@/layouts/MainLayout';

/* eslint-disable @typescript-eslint/no-explicit-any */

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			(window as any).chatbaseConfig = {
				chatbotId: process.env.NEXT_PUBLIC_CHATBOT_ID,
			};

			const script = document.createElement('script');
			script.src = process.env.NEXT_PUBLIC_CHATBOT_URL || '';
			script.defer = true;
			document.body.appendChild(script);
		}
	}, []);

	return (
		<div suppressHydrationWarning>
			<div
				suppressHydrationWarning
				className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen`}
			>
				<MainLayout>{children}</MainLayout>
				<Toaster />
			</div>
		</div>
	);
}
