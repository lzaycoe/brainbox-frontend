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
import { FaUsersViewfinder } from 'react-icons/fa6';
import { MdOutlineSlowMotionVideo } from 'react-icons/md';
import { TiTickOutline } from 'react-icons/ti';
import { VscVmActive } from 'react-icons/vsc';

const stats = [
	{
		id: 1,
		value: 957,
		label: 'Enrolled Courses',
		bgColor: 'bg-rose-100',
		icon: <MdOutlineSlowMotionVideo />,
	},
	{
		id: 2,
		value: 6,
		label: 'Active Courses',
		bgColor: 'bg-violet-100',
		icon: <VscVmActive />,
	},
	{
		id: 3,
		value: 951,
		label: 'Completed Courses',
		bgColor: 'bg-green-100',
		icon: <TiTickOutline />,
	},
	{
		id: 4,
		value: 241,
		label: 'Course Instructors',
		bgColor: 'bg-orange-50',
		icon: <FaUsersViewfinder />,
	},
];

const courses = [
	{
		id: 1,
		title: 'Reiki Level I, II and Master/Teacher Program',
		currentLesson: '1. Introductions',
		thumbnail:
			'https://cdn.builder.io/api/v1/image/assets/TEMP/076c43f572a1bb2153aeabe1ee1d173d2e6375be60948b27852c91ac77bcf73e?placeholderIfAbsent=true&apiKey=eb47009d56d84332945ecb583277e964',
		completed: null,
	},
	{
		id: 2,
		title: 'The Complete 2021 Web Development Bootcamp',
		currentLesson: "167. What You'll Need to Get Started",
		thumbnail:
			'https://cdn.builder.io/api/v1/image/assets/TEMP/846987ebaa81cdd131e6a90c437bde2bbce3794c85ca9e5bfb0eb02c5531e1bb?placeholderIfAbsent=true&apiKey=eb47009d56d84332945ecb583277e964',
		completed: '61%',
	},
	{
		id: 3,
		title: 'Copywriting - Become a Freelance Copywriter',
		currentLesson: '1. How to get started with figma',
		thumbnail:
			'https://cdn.builder.io/api/v1/image/assets/TEMP/fc2a4232c972981e306b9ddc865cd2b0925db44ce042c2a47cdf6099d61eca2e?placeholderIfAbsent=true&apiKey=eb47009d56d84332945ecb583277e964',
		completed: null,
	},
	{
		id: 4,
		title: '2021 Complete Python Bootcamp From Zero to Mastery',
		currentLesson: '9. Advanced CSS - Selector Priority',
		thumbnail:
			'https://cdn.builder.io/api/v1/image/assets/TEMP/7d3b47aa0f5db644a45cae11fe354e53122d2e9f0bdf3cc1165e71381c98df79?placeholderIfAbsent=true&apiKey=eb47009d56d84332945ecb583277e964',
		completed: '12%',
	},
];

const ProfileSection = () => (
	<div className="bg-white p-6 rounded-lg shadow-md">
		<div className="flex justify-between items-center bg-rose-100 p-10 rounded-lg">
			<div className="flex items-center space-x-6">
				<img
					src="https://cdn.builder.io/api/v1/image/assets/TEMP/ab1faf3c475c67dc299d76494d7bafc2e2cad9516ff598f284a321bcbc1afaf5?placeholderIfAbsent=true&apiKey=eb47009d56d84332945ecb583277e964"
					alt="Profile"
					className="rounded-full w-24 h-24 object-cover"
				/>
				<div>
					<h1 className="text-2xl font-semibold">Lazy Code</h1>
					<p className="text-gray-500">
						Web Designer & Best-Selling Instructor
					</p>
				</div>
			</div>
			<button className="bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold">
				Become Instructor
			</button>
		</div>
	</div>
);

const StatsSection = () => (
	<div className="bg-white p-6 rounded-lg shadow-md">
		<div className="grid grid-cols-4 gap-6">
			{stats.map(({ id, value, label, bgColor, icon }) => (
				<div
					key={id}
					className={`p-6 rounded-lg ${bgColor} flex items-center space-x-4`}
				>
					<div className="bg-white p-4 rounded-full text-orange-500 text-2xl">
						{icon}
					</div>
					<div>
						<h2 className="text-xl font-semibold">{value}</h2>
						<p className="text-gray-500">{label}</p>
					</div>
				</div>
			))}
		</div>
	</div>
);

const CoursesSection = () => (
	<div className="bg-white p-6 rounded-lg shadow-md">
		<h2 className="text-2xl font-semibold">Let's start learning</h2>
		<div className="grid grid-cols-4 gap-6 mt-4">
			{courses.map(({ id, title, currentLesson, thumbnail, completed }) => (
				<div key={id} className="p-6 bg-white border rounded-lg">
					<img src={thumbnail} alt={title} className="w-full rounded-lg mb-4" />
					<h3 className="text-lg font-semibold">{title}</h3>
					<p className="text-gray-500 mt-2">{currentLesson}</p>
					{completed ? (
						<div className="mt-4 flex items-center space-x-4">
							<div className="w-1/2">
								<p className="text-green-600 font-semibold mb-1">
									{completed} Completed
								</p>
								<div className="w-full h-1 bg-gray-300 rounded-full mb-5">
									<div
										className="h-1 bg-orange-500 rounded-full"
										style={{ width: completed }}
									></div>
								</div>
							</div>
							<button className="bg-orange-500 text-white w-1/2 py-2 rounded-lg mb-5">
								Watch Lecture
							</button>
						</div>
					) : (
						<button className="mt-4 bg-orange-500 text-white w-full py-2 rounded-lg mb-5">
							Watch Lecture
						</button>
					)}
				</div>
			))}
		</div>
	</div>
);

const NavigationMenu = () => (
	<div className="bg-white p-6 rounded-lg shadow-md">
		<nav className="flex justify-center space-x-6 border-t border-b py-4">
			{[
				'Dashboard',
				'Courses',
				'Teachers',
				'Message',
				'Wishlist',
				'Purchase History',
				'Settings',
			].map((item, index) => (
				<button
					key={index}
					className="px-4 py-2 text-gray-700 hover:text-orange-500"
				>
					{item}
				</button>
			))}
		</nav>
	</div>
);

export const Dashboard = () => (
	<div className="flex flex-col px-20 py-10 space-y-10">
		<ProfileSection />
		<NavigationMenu />
		<StatsSection />
		<CoursesSection />
	</div>
);
