'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

import NavigationBar from '@/components/commons/learners/NavigationBar';
import Profile from '@/components/commons/learners/Profile';
import CourseList from '@/components/learners/courses/CourseList';
import { getUserByClerkId } from '@/services/api/user';

export default function Courses() {
	const [userId, setUserId] = useState<number | null>(null);
	const { user } = useUser();

	const fetchUser = async () => {
		try {
			if (!user) {
				throw new Error('User is undefined');
			}

			const response = await getUserByClerkId(user?.id);
			setUserId(response.id);
		} catch (error) {
			console.error('Failed to fetch user metadata:', error);
			setUserId(null);
		}
	};

	useEffect(() => {
		if (!userId) {
			fetchUser();
		}
	}, [userId]);

	if (!userId) {
		return <div>Please log in to view your courses.</div>;
	}

	return (
		<div>
			<Profile />
			<NavigationBar />
			<div className="flex flex-col justify-center items-center w-full px-6">
				<div className="w-full max-w-[1245px] mb-6">
					<CourseList userId={userId} />
				</div>
			</div>
		</div>
	);
}
