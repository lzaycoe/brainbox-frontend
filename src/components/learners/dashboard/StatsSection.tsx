import React from 'react';
import { FaUsersViewfinder } from 'react-icons/fa6';
import { MdOutlineSlowMotionVideo } from 'react-icons/md';
import { TiTickOutline } from 'react-icons/ti';
import { VscVmActive } from 'react-icons/vsc';

import Stat from './Stat';

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
		label: 'Course Teachers',
		bgColor: 'bg-orange-50',
		icon: <FaUsersViewfinder />,
	},
];

const StatsSection = () => (
	<div className="bg-white p-6 rounded-lg shadow-md max-w-7xl mt-10">
		<div className="grid grid-cols-4 gap-6">
			{stats.map((stat) => (
				<Stat
					key={stat.id}
					icon={stat.icon}
					value={stat.value}
					label={stat.label}
					bgColor={stat.bgColor}
				/>
			))}
		</div>
	</div>
);

export default StatsSection;
