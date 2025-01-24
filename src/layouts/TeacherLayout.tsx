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
import React from 'react';

import { Footer } from '@/components/commons/teachers/Footer';
import { Header } from '@/components/commons/teachers/Header';
import { SideBar } from '@/components/commons/teachers/SideBar';

const TeacherLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<div className="flex">
			<SideBar />
			<div
				className="flex flex-col flex-grow w-full"
				style={{ marginLeft: '300px' }}
			>
				<Header />
				<main className="flex-grow bg-[#f5f7fa]">{children}</main>
				<Footer />
			</div>
		</div>
	);
};

export default TeacherLayout;
