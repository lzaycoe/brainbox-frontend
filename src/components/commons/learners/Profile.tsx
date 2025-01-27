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
import Image from 'next/image';

export default function Profile() {
	return (
		<header className="relative bg-white flex items-center gap-4 py-8 max-w-7xl mx-auto px-4">
			<Image
				src="/app/lazyavt.png"
				alt="Lazy Code Logo"
				width={150}
				height={150}
				className="w-24 h-24 rounded-lg"
			/>
			<div>
				<h1 className="text-xl font-medium">Lazy Code</h1>
				<p className="text-gray-500">Web Designer & Best-Selling Instructor</p>
			</div>
			<button className="ml-auto bg-rose-100 text-rose-500 px-4 py-2 rounded-lg hover:bg-rose-200 transition-colors">
				Become Instructor
			</button>
		</header>
	);
}
