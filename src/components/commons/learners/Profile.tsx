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
		<div className="bg-[#FFEEE8] pt-20">
			<div className="max-w-7xl mx-auto px-4">
				<div className="border border-[#FFDCD4] bg-white">
					<header className="flex items-center gap-4 p-6">
						<Image
							src="/app/lazyavt.png"
							alt="Lazy Code Logo"
							width={80}
							height={80}
							className="rounded-lg"
						/>
						<div>
							<h1 className="text-xl font-medium">Lazy Code</h1>
							<p className="text-gray-500 text-sm">
								Web Designer & Best-Selling Instructor
							</p>
						</div>
						<button className="ml-auto bg-[#FFF1EC] text-[#FF6636] px-6 py-2.5 rounded-lg hover:bg-[#FFE4DB] transition-colors flex items-center gap-2">
							Become Instructor
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M5 12h14m-7-7l7 7-7 7" />
							</svg>
						</button>
					</header>
				</div>
			</div>
		</div>
	);
}
