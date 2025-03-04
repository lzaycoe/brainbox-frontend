'use client';

import { useAuth } from '@clerk/nextjs';

import NavigationBar from '@/components/commons/learners/NavigationBar';
import Profile from '@/components/commons/learners/Profile';
import CourseList from '@/components/learners/courses/CourseList';

export default function Courses() {
	const { userId } = useAuth();

	if (!userId) {
		return <div>Please log in to view your courses.</div>;
	}

	const parsedUserId = parseInt(userId, 10) || 1;

	return (
		<div>
			<Profile />
			<NavigationBar />
			<div className="flex flex-col justify-center items-center w-full px-6">
				<div className="w-full max-w-[1245px] mb-6">
					<CourseList userId={parsedUserId} />
				</div>
			</div>
		</div>
	);
}
