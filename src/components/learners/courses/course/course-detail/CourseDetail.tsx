'use client';

import React, { useEffect, useState } from 'react';
import { HiChevronRight } from 'react-icons/hi';

import CourseCard from '@/components/learners/courses/course/course-detail/CourseCard';
import CourseHeader from '@/components/learners/courses/course/course-detail/CourseHeader';
import CurriculumSection from '@/components/learners/courses/course/course-detail/CurriculumSection';
import InstructorSection from '@/components/learners/courses/course/course-detail/InstructorSection';
import OverviewSection from '@/components/learners/courses/course/course-detail/OverviewSection';
import RelatedCourses from '@/components/learners/courses/course/course-detail/RelatedCourses';
import ReviewSection from '@/components/learners/courses/course/course-detail/ReviewSection';
import Tabs from '@/components/learners/courses/course/course-detail/Tabs';
import VideoSection from '@/components/learners/courses/course/course-detail/VideoSection';
import { CourseData } from '@/schemas/course.schema';
import { getCourse } from '@/services/api/course';

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

type CourseInfoType = {
	breadcrumbs: string[];
	title: string;
	subtitle: string;
	creators: string[];
	rating: number;
	reviews: number;
};

type CurriculumSectionType = {
	id: string;
	title: string;
	content: string;
	lectures: number;
	duration: string;
};

interface CourseDetailsPageProps {
	readonly courseId: string;
}

export default function CourseDetailsPage({
	courseId,
}: CourseDetailsPageProps) {
	const [activeTab, setActiveTab] = useState('overview');
	const [courseInfo, setCourseInfo] = useState<CourseInfoType | null>(null);
	const [coursePrice, setCoursePrice] = useState<{
		salePrice: number;
		originPrice: number;
	} | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const tabs = ['overview', 'curriculum', 'instructor', 'review'];

	useEffect(() => {
		const fetchCourseData = async () => {
			try {
				setLoading(true);
				const course: CourseData = await getCourse(courseId);
				setCourseInfo({
					breadcrumbs: [
						'Home',
						'Development',
						'Web Development',
						course.tag || 'Unknown',
					],
					title: course.title,
					subtitle: course.subtitle || 'No subtitle available',
					creators: ['Dionne Russell', 'Kristin Watson'],
					rating: 4.8,
					reviews: 161444,
				});
				setCoursePrice({
					salePrice: parseFloat(course.salePrice.toString()),
					originPrice: parseFloat(course.originPrice.toString()),
				});
			} catch (error) {
				console.error(`Failed to fetch course data for ID ${courseId}:`, error);
				setError('Failed to load course details.');
			} finally {
				setLoading(false);
			}
		};

		fetchCourseData();
	}, [courseId]);

	const whatYouLearn = [
		'Design beautiful websites using Figma, used by designers at Uber, Airbnb and Microsoft',
		'Learn secret tips of Freelance Web Designers for successful online freelancing',
		'Master both Jupyter Notebook and .py files creation',
		'Build powerful websites with Webflow, used by Dell, NASA and other major organizations',
		'Learn professional Python programming, covering both Python 2 and 3',
		'Create GUIs in the Jupyter Notebook system',
	];

	const instructors: Instructor[] = [
		{
			id: '1',
			name: 'Lazy Code',
			bio: 'Web Designer & Best-Selling Instructor',
			avatar: '/app/teacher/avt1.png',
			role: 'Web Designer & Best-Selling Instructor',
			rating: 4.8,
			students: 236568,
			courses: 8,
			description: 'Expert web designer with years of industry experience...',
		},
		{
			id: '2',
			name: 'Thunder',
			bio: 'Entrepreneur & Designer',
			avatar: '/app/teacher/avt2.png',
			role: 'Entrepreneur & Designer • Founder of ShiftRide',
			rating: 4.8,
			students: 5342,
			courses: 1,
			description:
				'Passionate entrepreneur & designer specializing in UI/UX...',
		},
	];

	const reviewData = {
		comments: [
			{
				id: 'review-1',
				user: { name: 'Guy Hawkins', avatar: '/app/teacher/avt1.png' },
				rating: 5,
				time: '1 week ago',
				comment:
					"Outstanding course content! The instructor's teaching method is exceptional and the practical examples really helped solidify my understanding.",
			},
			{
				id: 'review-2',
				user: { name: 'Sarah Johnson', avatar: '/app/teacher/avt2.png' },
				rating: 4,
				time: '2 weeks ago',
				comment:
					'Very comprehensive course. The step-by-step tutorials are easy to follow and the real-world projects are invaluable.',
			},
			{
				id: 'review-3',
				user: { name: 'Michael Chen', avatar: '/app/teacher/avt3.png' },
				rating: 5,
				time: '3 weeks ago',
				comment:
					"This course exceeded my expectations. The instructor's expertise and clear explanations made complex concepts accessible.",
			},
		],
	};

	const curriculumSections: CurriculumSectionType[] = [
		{
			id: '1',
			title: 'Getting Started',
			content: 'Introduction to web development fundamentals',
			lectures: 4,
			duration: '51m',
		},
	];

	if (loading) {
		return (
			<div className="max-w-7xl mx-auto px-6 py-2">
				<p className="text-gray-500">Loading course details...</p>
			</div>
		);
	}

	if (error || !courseInfo || !coursePrice) {
		return (
			<div className="max-w-7xl mx-auto px-6 py-2">
				<p className="text-red-500">{error ?? 'Course data not available.'}</p>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-6 py-2">
			<nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
				{courseInfo.breadcrumbs.map((item, index) => (
					<React.Fragment key={item}>
						<span className="hover:text-gray-700 cursor-pointer">{item}</span>
						{index < courseInfo.breadcrumbs.length - 1 && (
							<HiChevronRight className="w-4 h-4" />
						)}
					</React.Fragment>
				))}
			</nav>

			<CourseHeader
				breadcrumbs={courseInfo.breadcrumbs}
				title={courseInfo.title}
				subtitle={courseInfo.subtitle}
				creators={courseInfo.creators}
				rating={courseInfo.rating}
				reviews={courseInfo.reviews}
			/>

			<div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-4 mt-2">
				<div className="space-y-2">
					<VideoSection courseId={courseId} />

					<div className="border-t pt-2 mt-8 py-4">
						<Tabs
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							tabs={tabs}
						/>

						<div className="mt-4">
							{activeTab === 'overview' && (
								<OverviewSection
									learningOutcomes={whatYouLearn.map((desc, i) => ({
										id: String(i + 1),
										description: desc,
									}))}
								/>
							)}
							{activeTab === 'curriculum' && (
								<CurriculumSection courseSections={curriculumSections} />
							)}
							{activeTab === 'instructor' && (
								<InstructorSection instructors={instructors} />
							)}
							{activeTab === 'review' && (
								<ReviewSection reviews={reviewData.comments} />
							)}
						</div>
					</div>
				</div>

				<div>
					<CourseCard
						salePrice={coursePrice.salePrice}
						originPrice={coursePrice.originPrice}
						courseId={courseId}
					/>
				</div>
			</div>

			<RelatedCourses courseId={courseId} />
		</div>
	);
}
