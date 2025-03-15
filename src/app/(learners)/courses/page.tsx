'use client';

import { useAuth } from '@clerk/nextjs';
import { Metadata } from 'next';

import NavigationBar from '@/components/commons/learners/NavigationBar';
import Profile from '@/components/commons/learners/Profile';
import CourseList from '@/components/learners/courses/CourseList';

export const metadata: Metadata = {
	title: 'BrainBox | Learner Courses',
};

export default function Courses() {
	const { userId } = useAuth();

	if (!userId) {
		return (
			<div className="flex justify-center mt-10">
				Please log in to view your courses.
			</div>
		);
	}

	return (
		<div>
			<Profile />
			<NavigationBar />
			<div className="flex flex-col justify-center items-center w-full px-6">
				<div className="w-full max-w-[1245px] mb-6">
					<CourseList userClerkId={userId} />
				</div>
			</div>
		</div>
	);
}
