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
import {
	FaFacebookF,
	FaInstagram,
	FaLinkedinIn,
	FaTwitter,
	FaYoutube,
} from 'react-icons/fa';
import { IoStarOutline } from 'react-icons/io5';
import { MdVideoLibrary } from 'react-icons/md';
import { PiStudentDuotone } from 'react-icons/pi';
import { TfiWorld } from 'react-icons/tfi';

import CoursesSection from './CoursesSection';

// Reusable stat item component
interface StatItemProps {
	icon: React.ReactNode;
	value: string | number;
	label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label }) => (
	<div className="flex gap-1.5 items-center">
		{icon === 'star' ? (
			<IoStarOutline size={24} className="text-yellow-500" />
		) : (
			icon
		)}
		<div className="flex items-center">
			<span className="text-base font-medium text-neutral-800">{value}</span>
			<span className="text-sm text-gray-500 ml-1">{label}</span>
		</div>
	</div>
);

// Reusable social link component
interface SocialLinkProps {
	link: string;
	icon: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ link, icon }) => (
	<a
		href={link}
		target="_blank"
		rel="noopener noreferrer"
		className="p-3.5 w-12 h-12 bg-slate-100 flex items-center justify-center"
	>
		{icon}
	</a>
);

// AboutMe Component
const AboutMe: React.FC = () => (
	<div className="flex flex-col justify-center items-center p-6 bg-white border border-gray-200 border-solid max-w-[424px]">
		<h2 className="text-lg font-medium leading-none uppercase text-neutral-800">
			About Me
		</h2>
		<div className="mt-4 text-sm tracking-normal leading-6 text-gray-500">
			<p>
				One day Vako had enough with the 9-to-5 grind, or more like 9-to-9 in
				his case, and quit his job, or more like got himself fired from his own
				startup.
			</p>
			<p className="mt-4">
				He decided to work on his dream: be his own boss, travel the world, only
				do the work he enjoyed, and make a lot more money in the process.
			</p>
			<p className="mt-4">
				Vako realizes that people who take courses on Udemy want to transform
				their lives. Today with his courses and mentoring, Vako is helping
				thousands of people transform their lives, just like he did once.
			</p>
		</div>
	</div>
);

const ProfileCard: React.FC = () => {
	const stats = [
		{ icon: 'star', value: '4.8', label: '(134,633 review)' },
		{
			icon: <PiStudentDuotone size={24} />,
			value: '430,117',
			label: 'students',
		},
		{ icon: <MdVideoLibrary size={24} />, value: '7', label: 'courses' },
	];

	const socialLinks = [
		{ link: 'https://facebook.com', icon: <FaFacebookF size={20} /> },
		{ link: 'https://twitter.com', icon: <FaTwitter size={20} /> },
		{ link: 'https://instagram.com', icon: <FaInstagram size={20} /> },
		{ link: 'https://youtube.com', icon: <FaYoutube size={20} /> },
		{ link: 'https://linkedin.com', icon: <FaLinkedinIn size={20} /> },
	];

	return (
		<div className="flex flex-col pb-20">
			<div className="flex flex-col items-center px-6 pt-10 w-full bg-rose-100">
				<div className="flex flex-wrap gap-10 justify-between items-center p-10 w-full bg-white border border-rose-200 max-w-[1320px]">
					<div className="flex flex-wrap gap-6 justify-between items-center">
						<Image
							src="/app/teacher/avatar.png"
							alt="Profile picture of instructor"
							width={200}
							height={200}
							className="rounded-full"
						/>
						<div className="flex flex-col justify-center py-6">
							<h1 className="text-3xl font-semibold text-neutral-800">
								hardingadonis
							</h1>
							<p className="mt-2.5 text-base text-gray-500">
								Web Designer & Best-Selling Instructor
							</p>
							<div className="flex gap-5 mt-6">
								{stats.map((stat, index) => (
									<StatItem key={index} {...stat} />
								))}
							</div>
						</div>
					</div>
					<div className="flex flex-col items-end">
						<a
							href="https://github.com/hardingadonis"
							className="text-sm font-medium text-indigo-600 flex items-center"
							target="_blank"
							rel="noopener noreferrer"
						>
							<TfiWorld size={20} className="mr-2" />
							https://github.com/hardingadonis
						</a>

						<div className="flex gap-2 mt-4">
							{socialLinks.map((social, index) => (
								<SocialLink key={index} {...social} />
							))}
						</div>
					</div>
				</div>
			</div>

			{/* AboutMe and CourseSection */}
			<div className="flex justify-between items-start w-full px-16 mt-10 max-w-[1320px]">
				<AboutMe />
				<div className="flex-1">
					<CoursesSection />
				</div>
			</div>
		</div>
	);
};

export default ProfileCard;
