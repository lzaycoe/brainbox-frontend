import { Metadata } from 'next';

import Header from '@/components/learners/FAQs/Header';

export const metadata: Metadata = {
	title: 'BrainBox | FAQs',
};
export default function Home() {
	return (
		<div>
			<Header />
		</div>
	);
}
