import { AiFillStar } from 'react-icons/ai';

interface CourseHeaderProps {
	breadcrumbs: string[];
	title: string;
	subtitle: string;
	creators: string[];
	rating: number;
	reviews: number;
}

export default function CourseHeader({
	title,
	subtitle,
	creators,
	rating,
	reviews,
	// Kept but unused (no ESLint warning since it's part of props)
}: Readonly<CourseHeaderProps>) {
	return (
		<div className="course-header mb-10">
			<h1 className="text-2xl font-bold mb-2">{title}</h1>
			<p className="text-gray-600 mb-4">{subtitle}</p>
			<div className="text-gray-500 mb-4">
				<span>Created by {creators.join(' • ')}</span>
			</div>
			<div className="flex items-center space-x-2">
				<div className="flex">
					{Array.from({ length: 5 }).map((_, i) => (
						<AiFillStar
							key={`star-${rating}-${i}`}
							className="w-5 h-5"
							color={i < Math.round(rating) ? '#FFD700' : '#CCC'}
						/>
					))}
				</div>
				<span className="font-bold">{rating.toFixed(1)}</span>
				<span className="text-gray-500">
					({reviews.toLocaleString()} Ratings)
				</span>
			</div>
		</div>
	);
}
