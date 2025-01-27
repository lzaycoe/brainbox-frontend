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
		{ label: 'Settings', path: '/settings' },
	];

	return (
		<nav className="flex justify-center items-center gap-8 border-b border-gray-200 mb-8">
			{navItems.map((item) => (
				<Link
					key={item.label}
					href={item.path}
					className={`py-4 ${
						pathname === item.path
							? 'text-rose-500 border-b-2 border-rose-500'
							: 'text-gray-500 hover:text-gray-900'
					}`}
				>
					{item.label}
				</Link>
			))}
		</nav>
	);
}
