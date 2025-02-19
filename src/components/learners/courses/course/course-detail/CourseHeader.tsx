import Image from 'next/image';

import { StarIcon } from '@/components/commons/learners/StarIcon';

interface CourseHeaderProps {
	title: string;
	description: string;
	creators: string[];
	rating: number;
	reviews: number;
}

export default function CourseHeader({
	title,
	description,
	creators,
	rating,
	reviews,
}: Readonly<CourseHeaderProps>) {
	return (
		<header className="p-4 rounded-lg">
			<h1 className="text-2xl font-semibold text-neutral-800">{title}</h1>

			<p className="mt-2 text-gray-600">{description}</p>

			<div className="flex items-center gap-6 mt-3">
				<div className="flex items-center gap-2">
					<div className="flex -space-x-2">
						{creators.map((creator: string) => (
							<Image
								key={`creator-${creator}`}
								src="/app/lazyavt.png"
								alt={creator}
								width={32}
								height={32}
								className="w-8 h-8 rounded-full border-2 border-white"
							/>
						))}
					</div>
					<div className="flex items-center">
						<span className="text-sm text-gray-500 mr-1">Created by</span>
						<span className="text-sm font-medium">{creators.join(' • ')}</span>
					</div>
				</div>

				<div className="flex items-center gap-1">
					<div className="flex">
						{Array.from({ length: 5 }).map((_, i) => (
							<StarIcon
								key={`star-${i}-${rating}`}
								filled={i < Math.floor(rating)}
							/>
						))}
					</div>
					<span className="font-medium ml-1">{rating}</span>
					<span className="text-gray-500">
						({reviews.toLocaleString()} Rating)
					</span>
				</div>
			</div>
		</header>
	);
}
