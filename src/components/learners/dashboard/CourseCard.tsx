import Image from 'next/image';
import React from 'react';

// Import Image từ next/image

interface CourseCardProps {
	title: string;
	currentLesson: string;
	thumbnail: string;
	completed: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
	title,
	currentLesson,
	thumbnail,
	completed,
}) => {
	// Kiểm tra nếu completed là "0%"
	const isCompletedZero = completed === '0%';

	return (
		<div className="p-6 bg-white border rounded-lg shadow-md mb-0 flex flex-col justify-between h-full">
			{/* Phần 1: Hình ảnh và nội dung */}
			<div>
				{/* Sử dụng Image thay cho img */}
				<div className="relative w-full h-40 mb-4">
					<Image
						src={thumbnail}
						alt={title}
						layout="fill" // Đặt layout fill để tự động phù hợp với container
						objectFit="cover" // Đảm bảo hình ảnh không bị méo
						className="rounded-lg"
					/>
				</div>

				<h3 className="text-xl font-semibold text-gray-900">{title}</h3>
				<p className="text-gray-500 mt-1">{currentLesson}</p>
			</div>

			{/* Phần 2: Nút và tiến độ (được đẩy xuống dưới cùng) */}
			<div className="mt-auto">
				<hr className="my-4 border-gray-300 w-full" />

				<div className="mt-6">
					<div className="flex flex-col items-start space-y-4">
						{/* Thanh tiến độ */}
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
							Watch Lecture
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
