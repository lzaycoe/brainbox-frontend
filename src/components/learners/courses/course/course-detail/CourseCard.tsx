'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
	FaArchive,
	FaCheckCircle,
	FaClock,
	FaEnvelope,
	FaFileAlt,
	FaHeart,
	FaLink,
	FaLinkedin,
	FaLock,
	FaMobile,
	FaTwitter,
	FaVideo,
} from 'react-icons/fa';

import { fetchPaidStudentsCount } from '@/services/api/payment';
import { formatCurrency } from '@/utils/currency';

type SocialButtonProps = {
	icon: React.ElementType;
};

const SocialButton = ({ icon: Icon }: SocialButtonProps) => (
	<button className="p-2 bg-gray-50 rounded-md text-gray-600 hover:bg-gray-100">
		<Icon className="w-5 h-5" />
	</button>
);

interface CourseCardProps {
	readonly salePrice: number;
	readonly originPrice: number;
	readonly courseId: string;
}

export default function CourseCard({
	salePrice,
	originPrice,
	courseId,
}: CourseCardProps) {
	const router = useRouter();
	const discountPercentage = Math.round(
		((originPrice - salePrice) / originPrice) * 100,
	);
	const [isCopied, setIsCopied] = useState(false);
	const [students, setStudents] = useState<number>(0);

	useEffect(() => {
		const fetchStudents = async () => {
			try {
				const studentCount = await fetchPaidStudentsCount(Number(courseId));
				setStudents(studentCount);
			} catch (error) {
				console.error('Failed to fetch student count:', error);
			}
		};

		fetchStudents();
	}, [courseId]);

	const handleCopyLink = async () => {
		try {
			const currentUrl = window.location.href;
			await navigator.clipboard.writeText(currentUrl);
			setIsCopied(true);
			setTimeout(() => setIsCopied(false), 2000);
		} catch (error) {
			console.error('Failed to copy link:', error);
		}
	};

	const handleBuyNow = () => {
		router.push(`/checkout/${courseId}`);
	};

	return (
		<div className="border border-gray-200 rounded-lg bg-white p-6">
			<div className="flex justify-between items-start">
				<div className="flex items-center gap-2">
					<span className="text-2xl font-medium">
						{formatCurrency(salePrice)}
					</span>
					<span className="text-gray-400 line-through">
						{formatCurrency(originPrice)}
					</span>
				</div>
				<span className="px-2 py-1 bg-orange-50 text-orange-500 text-xs font-medium rounded">
					{discountPercentage}% OFF
				</span>
			</div>

			<div className="flex items-center gap-2 mt-3 text-red-500 text-sm">
				<FaClock className="w-4 h-4" />
				<span>2 days left at this price!</span>
			</div>

			<div className="mt-6 space-y-4">
				<div className="flex justify-between">
					<span className="text-gray-600">Course Duration</span>
					<span>Life-time</span>
				</div>
				<div className="flex justify-between">
					<span className="text-gray-600">Course Level</span>
					<span>Coming soon</span>
				</div>
				<div className="flex justify-between">
					<span className="text-gray-600">Students Enrolled</span>
					<span>{students.toLocaleString()}</span>
				</div>
				<div className="flex justify-between">
					<span className="text-gray-600">Language</span>
					<span>English</span>
				</div>
				<div className="flex justify-between">
					<span className="text-gray-600">Subtitle Language</span>
					<span>English</span>
				</div>
			</div>

			<button
				onClick={handleBuyNow}
				className="w-full bg-orange-500 text-white py-3 rounded-md mt-6 hover:bg-orange-600 transition-colors"
			>
				Buy Now
			</button>
			<button className="w-full bg-orange-50 text-orange-500 py-3 rounded-md mt-3 hover:bg-orange-100 transition-colors">
				Add To Cart
			</button>

			<div className="flex gap-3 mt-3">
				<button className="flex-1 py-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
					<div className="flex items-center justify-center gap-2">
						<FaHeart className="w-4 h-4" />
						Add To Wishlist
					</div>
				</button>
				<button className="flex-1 py-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
					<div className="flex items-center justify-center gap-2">
						<FaArchive className="w-4 h-4" />
						Gift Course
					</div>
				</button>
			</div>

			<p className="mt-4 text-sm text-gray-500">
				<span className="font-medium text-gray-700">Note:</span> all courses
				have 30-days money-back guarantee
			</p>

			<div className="mt-6">
				<h3 className="font-medium mb-4">This course includes:</h3>
				<ul className="space-y-3 text-sm text-gray-600">
					<li className="flex items-center gap-2">
						<FaCheckCircle className="w-4 h-4" />
						Lifetime access
					</li>
					<li className="flex items-center gap-2">
						<FaLock className="w-4 h-4" />
						30-days money-back guarantee
					</li>
					<li className="flex items-center gap-2">
						<FaFileAlt className="w-4 h-4" />
						Free exercises file & downloadable resources
					</li>
					<li className="flex items-center gap-2">
						<FaCheckCircle className="w-4 h-4" />
						Shareable certificate of completion
					</li>
					<li className="flex items-center gap-2">
						<FaMobile className="w-4 h-4" />
						Access on mobile, tablet and TV
					</li>
					<li className="flex items-center gap-2">
						<FaVideo className="w-4 h-4" />
						100% online course
					</li>
				</ul>
			</div>

			<div className="mt-6">
				<h3 className="font-medium mb-4">Share this course:</h3>
				<div className="flex gap-2">
					<button
						onClick={handleCopyLink}
						className="px-4 py-2 bg-gray-50 rounded-md text-gray-600 hover:bg-gray-100 transition-colors flex items-center gap-2"
					>
						<FaLink className="w-4 h-4" />
						{isCopied ? 'Link copied' : 'Copy link'}
					</button>
					<SocialButton icon={FaLinkedin} />
					<SocialButton icon={FaTwitter} />
					<SocialButton icon={FaEnvelope} />
				</div>
			</div>
		</div>
	);
}
