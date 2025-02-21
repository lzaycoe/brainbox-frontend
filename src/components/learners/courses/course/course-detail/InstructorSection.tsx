import Image from 'next/image';
import React from 'react';

type Instructor = {
	id: string;
	name: string;
	bio: string;
	avatar: string;
	role: string;
	rating: number;
	students: number;
	courses: number;
	description: string;
};

interface InstructorProps {
	instructors: Instructor[];
}

const InstructorSection: React.FC<InstructorProps> = ({ instructors }) => {
	return (
		<div>
			<h2 className="text-lg font-semibold mb-4">Giảng viên</h2>
			<div className="space-y-4">
				{instructors.map((instructor) => (
					<div
						key={instructor.id}
						className="flex items-center space-x-4 p-4 border rounded-lg"
					>
						<Image
							src={instructor.avatar}
							alt={instructor.name}
							width={40}
							height={40}
							className="w-10 h-10 rounded-full"
						/>
						<div>
							<h3 className="font-semibold">
								{instructor.name} ({instructor.role})
							</h3>
							<p className="text-sm text-gray-500">
								⭐ {instructor.rating} | {instructor.students} học viên |{' '}
								{instructor.courses} khóa học
							</p>
							<p className="text-gray-700">{instructor.description}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default InstructorSection;
