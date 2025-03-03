import React from 'react';

type CourseSection = {
	id: string;
	title: string;
	content: string;
	lectures: number;
	duration: string;
};

interface CurriculumProps {
	courseSections: CourseSection[];
}

const CurriculumSection: React.FC<CurriculumProps> = ({ courseSections }) => {
	return (
		<div>
			<h2 className="text-lg font-semibold mb-4">Nội dung khóa học</h2>
			<ul className="space-y-4">
				{courseSections.map((section) => (
					<li key={section.id} className="p-4 border rounded-lg">
						<h3 className="font-semibold">{section.title}</h3>
						<p className="text-gray-700">{section.content}</p>
						<p className="text-sm text-gray-500">
							Bài giảng: {section.lectures} - Thời lượng: {section.duration}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default CurriculumSection;
