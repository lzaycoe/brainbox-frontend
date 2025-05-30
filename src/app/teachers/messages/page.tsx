import { Metadata } from 'next';

import ChatApp from '@/components/learners/message/ChatApp';

export const metadata: Metadata = {
	title: 'BrainBox | Teacher | Messages',
};

export default function Home() {
	return (
		<div className="flex pl-16 pr-4">
			<ChatApp />
		</div>
	);
}
