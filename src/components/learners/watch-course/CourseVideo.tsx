import Image from 'next/image';
import React from 'react';

interface CourseVideoProps {
	videoURL?: string;
	title?: string;
	poster?: string;
	teacherAvatarUrl?: string;
	teacherName?: string;
	lastUpdated?: string;
	comments?: number;
}

const CourseVideo: React.FC<CourseVideoProps> = ({
	videoURL,
	title = 'Lecture Video',
	poster,
	teacherAvatarUrl = '/app/watch-course/avatar.png',
	teacherName = 'Unknown Teacher',
	lastUpdated = 'Unknown Date',
	comments = 0,
}) => {
	const getYouTubeId = (url: string): string | null => {
		const regex =
			/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^"&?/\s]{11})/i;
		const match = regex.exec(url);
		return match ? match[1] : null;
	};

	const youtubeId = videoURL ? getYouTubeId(videoURL) : null;
	const isYouTube = !!youtubeId;

	return (
		<div className="flex flex-col bg-white p-5">
			{videoURL && (
				<div className="mb-5 w-full">
					{isYouTube ? (
						<iframe
							width="100%"
							height="450"
							src={`https://www.youtube.com/embed/${youtubeId}?enablejsapi=1`}
							title={title}
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
							className="rounded-lg"
						/>
					) : (
						<video
							controls
							className="w-full h-[450px] rounded-lg"
							poster={poster}
						>
							<source src={videoURL} type="video/mp4" />
							<track default kind="captions" srcLang="en" src="SUBTITLE_PATH" />
							Your browser does not support the video tag.
						</video>
					)}
				</div>
			)}
			<h2 className="text-3xl font-semibold tracking-tight leading-none text-neutral-800">
				{title}
			</h2>
			<div className="flex flex-wrap gap-10 justify-between items-end mt-5 w-full">
				<div className="flex gap-3 items-center">
					<div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
						<Image
							src={teacherAvatarUrl}
							alt="Teacher avatar"
							width={48}
							height={48}
							className="object-cover w-full h-full"
						/>
					</div>
					<div className="flex flex-col">
						<div className="text-sm font-semibold tracking-normal leading-none text-neutral-800">
							{teacherName}
						</div>
						<div className="text-xs leading-none text-gray-500">Teacher</div>
					</div>
				</div>
				<div className="flex gap-6 items-start text-sm tracking-normal leading-loose min-w-[240px]">
					<div className="flex items-center">
						<span className="text-gray-500">Last updated:</span>
						<span className="ml-2 text-neutral-800">{lastUpdated}</span>
					</div>
					<div className="flex items-center">
						<span className="text-gray-500">Comments:</span>
						<span className="ml-2 text-neutral-800">{comments}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CourseVideo;
