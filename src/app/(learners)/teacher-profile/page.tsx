import { Metadata } from 'next';

import ProfileCard from '@/components/learners/teacher-profile/ProfileCard';

export const metadata: Metadata = {
	title: 'BrainBox | Teacher Profile',
};

export default function Home() {
	return (
		<div>
			<ProfileCard />
		</div>
	);
}
