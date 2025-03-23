import { Metadata } from 'next';

import ProfileSettings from '@/components/learners/settings/ProfileSettings';

export const metadata: Metadata = {
	title: 'BrainBox | Learner Profile Settings',
};

export default function Home() {
	return (
		<div>
			<ProfileSettings />
		</div>
	);
}
