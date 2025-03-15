import { auth } from '@clerk/nextjs/server';
import { Metadata } from 'next';

import NavigationBar from '@/components/commons/learners/NavigationBar';
import Profile from '@/components/commons/learners/Profile';
import CoursesSection from '@/components/learners/dashboard/CoursesSection';
import StatsSection from '@/components/learners/dashboard/StatsSection';

export const metadata: Metadata = {
	title: 'BrainBox | Learner Dashboard',
};

export default async function Home() {
	const authData = await auth(); // Dùng await để lấy dữ liệu từ Promise
	const userId = authData.userId; // Lấy userId từ authData

	if (!userId) {
		return <div>Please log in to view your dashboard.</div>;
	}

	const parsedUserId = parseInt(userId, 10) || 1;

	return (
		<div>
			<Profile />
			<NavigationBar />
			<div className="flex flex-col justify-center items-center w-full px-6 pb-10">
				<div className="w-full max-w-[1245px] mb-6">
					<StatsSection />
				</div>
				<div className="w-full max-w-[1245px]">
					<CoursesSection userId={parsedUserId} />
				</div>
			</div>
		</div>
	);
}
