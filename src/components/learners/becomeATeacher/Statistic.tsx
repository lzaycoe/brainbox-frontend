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
import Head from 'next/head';
import {
	PiCheckCircle,
	PiGlobeHemisphereWest,
	PiNotebook,
	PiStack,
	PiUsers,
} from 'react-icons/pi';

import StatisticItem from './StatisticItem';

export default function Statistic() {
	return (
		<>
			<Head>
				<title>Section</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link
					href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
					rel="stylesheet"
				/>
			</Head>

			<div className="flex justify-center items-center px-10 py-10 bg-rose-100">
				<div className="flex flex-wrap justify-between gap-8 max-w-5xl w-full">
					<StatisticItem
						icon={PiUsers}
						iconColor="#FF6636"
						alt="Students Icon"
						text1="67.1k"
						text2="Students"
					/>
					<StatisticItem
						icon={PiNotebook}
						iconColor="#564FFD"
						alt="Certified Instructor Icon"
						text1="26k"
						text2="Certified Instructors"
					/>
					<StatisticItem
						icon={PiGlobeHemisphereWest}
						iconColor="#E34444"
						alt="Country Language Icon"
						text1="72"
						text2="Country Languages"
					/>
					<StatisticItem
						icon={PiCheckCircle}
						iconColor="#23BD33"
						alt="Success Rate Icon"
						text1="99.9%"
						text2="Success Rate"
					/>
					<StatisticItem
						icon={PiStack}
						iconColor="#FD8E1F"
						alt="Trusted Companies Icon"
						text1="57"
						text2="Trusted Companies"
					/>
				</div>
			</div>
		</>
	);
}
