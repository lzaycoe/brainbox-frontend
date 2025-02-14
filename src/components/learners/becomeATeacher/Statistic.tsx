import {
	PiCheckCircle,
	PiGlobeHemisphereWest,
	PiNotebook,
	PiStack,
	PiUsers,
} from 'react-icons/pi';

import StatisticItem from '@/components/learners/becomeATeacher/StatisticItem';

export default function Statistic() {
	return (
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
	);
}
