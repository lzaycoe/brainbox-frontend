import React from 'react';

type LearningOutcome = {
	id: string;
	description: string;
};

interface OverviewProps {
	learningOutcomes: LearningOutcome[];
}

const OverviewSection: React.FC<OverviewProps> = ({ learningOutcomes }) => {
	return (
		<div>
			<h2 className="text-lg font-semibold mb-4">Mục tiêu khóa học</h2>
			<ul className="list-disc pl-5 space-y-2">
				{learningOutcomes.map((outcome) => (
					<li key={outcome.id} className="text-gray-700">
						{outcome.description}
					</li>
				))}
			</ul>
		</div>
	);
};

export default OverviewSection;
