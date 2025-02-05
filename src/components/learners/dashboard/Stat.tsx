import React from 'react';

interface StatProps {
	icon: React.ReactNode;
	value: string | number;
	label: string;
	bgColor: string;
}

const Stat: React.FC<StatProps> = ({ icon, value, label, bgColor }) => (
	<div className={`p-6 rounded-lg ${bgColor} flex items-center space-x-4`}>
		<div className="bg-white p-4 rounded-full text-orange-500 text-2xl">
			{icon}
		</div>
		<div>
			<h2 className="text-xl font-semibold">{value}</h2>
			<p className="text-gray-500">{label}</p>
		</div>
	</div>
);

export default Stat;
