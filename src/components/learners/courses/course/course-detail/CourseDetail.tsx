'use client';

import { ChevronRightIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';

import CourseCard from './CourseCard';
import CourseHeader from './CourseHeader';
import CurriculumSection from './CurriculumSection';
import InstructorSection from './InstructorSection';
import OverviewSection from './OverviewSection';
import RelatedCourses from './RelatedCourses';
import ReviewSection from './ReviewSection';
import Tabs from './Tabs';
import VideoSection from './VideoSection';

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
	description: string;
	creators: string[];
	rating: number;
	reviews: number;
};

type CurriculumSection = {
	id: string;
	title: string;
	content: string;
	lectures: number;
	duration: string;
};

const CourseDetailsPage = () => {
	const [activeTab, setActiveTab] = useState('overview');
	const tabs = ['overview', 'curriculum', 'instructor', 'review'];

	const courseInfo: CourseInfoType = {
		breadcrumbs: ['Home', 'Development', 'Web Development', 'Webflow'],
		title:
			'Complete Website Responsive Design: from Figma to Webflow to Website Design',
		description:
			'3 in 1 Course: Learn to design websites with Figma, build with Webflow, and make a living freelancing.',
		creators: ['Dionne Russell', 'Kristin Watson'],
		rating: 4.8,
		reviews: 161444,
	};

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
				id: 'review-1', // Added unique ID
				user: {
					name: 'Guy Hawkins',
					avatar: '/app/teacher/avt1.png',
				},
				rating: 5,
				time: '1 week ago',
				comment:
					"Outstanding course content! The instructor's teaching method is exceptional and the practical examples really helped solidify my understanding.",
			},
			{
				id: 'review-2', // Added unique ID
				user: {
					name: 'Sarah Johnson',
					avatar: '/app/teacher/avt2.png',
				},
				rating: 4,
				time: '2 weeks ago',
				comment:
					'Very comprehensive course. The step-by-step tutorials are easy to follow and the real-world projects are invaluable.',
			},
			{
				id: 'review-3', // Added unique ID
				user: {
					name: 'Michael Chen',
					avatar: '/app/teacher/avt3.png',
				},
				rating: 5,
				time: '3 weeks ago',
				comment:
					"This course exceeded my expectations. The instructor's expertise and clear explanations made complex concepts accessible.",
			},
		],
	};

	const curriculumSections: CurriculumSection[] = [
		{
			id: '1',
			title: 'Getting Started',
			content: 'Introduction to web development fundamentals',
			lectures: 4,
			duration: '51m',
		},
		// Add more sections as needed
	];

	return (
		<div className="max-w-7xl mx-auto px-6 py-2">
			<nav className="flex items-center gap-2 text-sm text-gray-500 mb-2">
				{courseInfo.breadcrumbs.map((item, index) => (
					<React.Fragment key={item}>
						<span className="hover:text-gray-700 cursor-pointer">{item}</span>
						{index < courseInfo.breadcrumbs.length - 1 && (
							<ChevronRightIcon className="w-4 h-4" />
						)}
					</React.Fragment>
				))}
			</nav>

			<CourseHeader {...courseInfo} />

			<div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-4 mt-2">
				<div className="space-y-2">
					<VideoSection />

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
					<CourseCard />
				</div>
			</div>

			<RelatedCourses />
		</div>
	);
};

export default CourseDetailsPage;
