import { Metadata } from 'next';

import Header from '@/components/learners/contact/Header';

export const metadata: Metadata = {
	title: 'BrainBox | Contact',
};

export default function Home() {
	return (
		<div>
			<Header />
		</div>
	);
}
