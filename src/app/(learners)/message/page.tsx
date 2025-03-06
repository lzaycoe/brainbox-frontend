import NavigationBar from '@/components/commons/learners/NavigationBar';
import Profile from '@/components/commons/learners/Profile';
import ChatApp from '@/components/learners/message/ChatApp';

export default function Home() {
	return (
		<div>
			<Profile />
			<NavigationBar />
			<div className="flex flex-col justify-center items-center w-full px-6 pb-10">
				<div className="max-w-7xl mb-6 flex gap-6">
					<ChatApp />
				</div>
			</div>
		</div>
	);
}
