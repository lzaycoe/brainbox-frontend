import { Metadata } from 'next';

import JobPosting from '@/components/learners/career-detail/JobPosting';

export const metadata: Metadata = {
	title: 'BrainBox | Career Detail',
};

export default function Home() {
	return (
		<div>
			<JobPosting />
		</div>
	);
}
