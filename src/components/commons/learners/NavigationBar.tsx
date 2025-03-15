'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function NavigationBar() {
	const pathname = usePathname();
	const navItems = [
		{ label: 'Dashboard', path: '/dashboard' },
		{ label: 'Courses', path: '/courses' },
		{ label: 'Teachers', path: '/teacher' },
		{ label: 'Message', path: '/message' },
		{ label: 'Wishlist', path: '/wishlist' },
		{ label: 'Purchase History', path: '/purchase-history' },
		{ label: 'Settings', path: '/settings' },
	];

	return (
		<div className="bg-white">
			<div className="max-w-7xl mx-auto px-4">
				<nav className="bg-white w-full border border-[#FFDCD4]">
					<div className="flex justify-between items-center">
						{navItems.map((item) => (
							<Link
								key={item.label}
								href={item.path}
								className={`px-4 py-4 text-sm font-medium transition-colors ${
									pathname === item.path
										? 'text-[#FF6636] border-b-2 border-[#FF6636]'
										: 'text-gray-600 hover:text-gray-900'
								}`}
							>
								{item.label}
							</Link>
						))}
					</div>
				</nav>
			</div>
		</div>
	);
}
