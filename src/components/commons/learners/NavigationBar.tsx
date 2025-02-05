/*
 *  ======================================================================
 *  Copyright (C) 2025 - lzaycoe (Lazy Code)
 *  ======================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  ======================================================================
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

/*
 *  ======================================================================
 *  Copyright (C) 2025 - lzaycoe (Lazy Code)
 *  ======================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  ======================================================================
 */

export default function NavigationBar() {
	const pathname = usePathname();
	const navItems = [
		{ label: 'Dashboard', path: '/dashboard' },
		{ label: 'Courses', path: '/courses' },
		{ label: 'Teachers', path: '/teachers' },
		{ label: 'Message', path: '/message' },
		{ label: 'Wishlist', path: '/wishlist' },
		{ label: 'Purchase History', path: '/purchase-history' },
		{ label: 'Settings', path: '/setting' },
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
