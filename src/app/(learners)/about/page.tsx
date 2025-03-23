import { Metadata } from 'next';

import Content from '@/components/learners/about/Content';

export const metadata: Metadata = {
	title: 'BrainBox | About',
};

export default function Home() {
	return (
		<div>
			<Content />
		</div>
	);
}
