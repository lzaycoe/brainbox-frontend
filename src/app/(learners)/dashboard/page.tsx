import NavigationBar from '@/components/commons/learners/NavigationBar';
import Profile from '@/components/commons/learners/Profile';
import CoursesSection from '@/components/learners/dashboard/CoursesSection';
import StatsSection from '@/components/learners/dashboard/StatsSection';

export default function Home() {
	return (
		<div>
			<Profile />
			<NavigationBar />
			<div className="flex flex-col justify-center items-center w-full px-6 pb-10">
				<div className="w-full max-w-[1245px] mb-6">
					<StatsSection />
				</div>
				<div className="w-full max-w-[1245px]">
					<CoursesSection />
				</div>
			</div>
		</div>
	);
}
