'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { PiArrowCircleRightDuotone } from 'react-icons/pi';

import { useUserContext } from '@/contexts/UserContext';

export default function Profile() {
	const router = useRouter();
	const { user } = useUserContext();

	const navigate = () => {
		if (user?.role === 'teacher') {
			router.push('/teachers');
		} else {
			router.push('/become-instructor');
		}
	};

	return (
		<div className="bg-[#FFEEE8] pt-20">
			<div className="max-w-7xl mx-auto px-4">
				<div className="border border-[#FFDCD4] bg-white">
					<header className="flex items-center gap-4 p-6">
						<Image
							src="/app/lazyavt.png"
							alt="Lazy Code Logo"
							width={80}
							height={80}
							className="rounded-lg"
						/>
						<div>
							<h1 className="text-xl font-medium">Lazy Code</h1>
							<p className="text-gray-500 text-sm">
								Web Designer & Best-Selling Instructor
							</p>
						</div>
						<button
							className="ml-auto bg-[#FFF1EC] text-[#FF6636] px-6 py-2.5 rounded-lg hover:bg-[#FFE4DB] transition-colors flex items-center gap-2"
							onClick={navigate}
						>
							{user?.role === 'teacher'
								? 'Go to Teacher Dashboard'
								: 'Become Instructor'}
							<PiArrowCircleRightDuotone className="w-8 h-8" />
						</button>
					</header>
				</div>
			</div>
		</div>
	);
}
