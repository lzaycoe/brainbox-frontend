import Image from 'next/image';
import React from 'react';

interface CourseCardProps {
	title: string;
	thumbnail: string;
	completed: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
	title,
	thumbnail,
	completed,
}) => {
	const isCompletedZero = completed === '0%';

	return (
		<div className="p-6 bg-white border rounded-lg shadow-md mb-0 flex flex-col justify-between h-full hover:shadow-2xl hover:scale-105 transition-transform transform group w-72">
			<div>
				<div className="relative w-full h-40 mb-4">
					<Image
						src={thumbnail}
						alt={title}
						fill
						style={{ objectFit: 'cover' }}
						className="rounded-lg"
					/>
				</div>

				<h3 className="text-xl font-semibold text-gray-900 line-clamp-2 group-hover:text-orange-500">
					{title}
				</h3>
			</div>
			<div className="mt-auto">
				<hr className="my-4 border-gray-300 w-full" />
				<div className="mt-6">
					<div className="flex flex-col items-start space-y-4">
						<div className="w-full">
							<p
								className={`font-semibold mb-2 ${isCompletedZero ? 'text-gray-500' : ''}`}
							>
								{isCompletedZero ? 'Not Started' : `${completed} Completed`}
							</p>
							<div className="w-full h-2 bg-gray-300 rounded-full">
								<div
									className={`h-2 ${isCompletedZero ? 'bg-gray-300' : 'bg-green-600'} rounded-full`}
									style={{ width: isCompletedZero ? '100%' : completed }}
								></div>
							</div>
						</div>
						<button className="bg-orange-500 text-white w-full py-2 rounded-lg mt-0">
							Go to Course
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
