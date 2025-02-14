import React from 'react';

import { Footer } from '@/components/commons/Footer';
import { Header } from '@/components/commons/Header';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow">{children}</main>
			<Footer />
		</div>
	);
};

export default MainLayout;
