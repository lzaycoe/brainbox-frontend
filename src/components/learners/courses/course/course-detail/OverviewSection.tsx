import React from 'react';

interface OverviewProps {
	description: string;
}

const OverviewSection: React.FC<OverviewProps> = ({ description }) => {
	return (
		<div>
			<h2 className="text-lg font-semibold mb-4">Course Overview</h2>
			<p className="text-gray-700">{description}</p>
		</div>
	);
};

export default OverviewSection;
