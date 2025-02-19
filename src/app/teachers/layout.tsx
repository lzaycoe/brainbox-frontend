import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import '@/app/globals.css';
import TeacherLayout from '@/layouts/TeacherLayout';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'BrainBox | Teacher Dashboard',
	description: 'An e-learning platform built with Next.js and Shadcn UI',
};

export default function TeacherPageLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div>
			<div
				className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen`}
			>
				<TeacherLayout>{children}</TeacherLayout>
			</div>
		</div>
	);
}
