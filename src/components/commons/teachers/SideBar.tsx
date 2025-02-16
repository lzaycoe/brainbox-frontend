import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
	PiChartBarLight,
	PiChatCircleDots,
	PiCreditCard,
	PiGear,
	PiPlusCircleBold,
	PiStack,
} from 'react-icons/pi';

export const SideBar = () => {
	const pathname = usePathname();

	const getLinkClasses = (path: string) => {
		return pathname === path
			? 'flex items-center gap-3 px-6 py-3 bg-orange-500 text-white'
			: 'flex items-center gap-3 px-6 py-3 text-gray-400 hover:text-white';
	};

	return (
		<div className="flex flex-col bg-neutral-800 text-white shadow-sm sm:w-[300px] fixed top-0 left-0 h-full">
			<div className="px-6 py-5 text-2xl font-semibold">
				<div className="flex items-center gap-2">
					<Image
						loading="lazy"
						src="/app/logo.png"
						className="object-contain shrink-0 w-10 aspect-square"
						alt="BrainBox Logo"
						width={40}
						height={40}
					/>
					BrainBox
				</div>
			</div>
			<nav className="flex flex-col mt-4 space-y-2">
				<Link
					href="/teachers/dashboard"
					className={getLinkClasses('/teachers/dashboard')}
				>
					<PiChartBarLight className="w-8 h-8" />
					Dashboard
				</Link>
				<Link
					href="/create-course"
					className={getLinkClasses('/create-course')}
				>
					<PiPlusCircleBold className="w-8 h-8" />
					Create New Course
				</Link>
				<Link
					href="/teachers/courses"
					className={getLinkClasses('/teachers/courses')}
				>
					<PiStack className="w-8 h-8" />
					My Courses
				</Link>
				<Link href="/earnings" className={getLinkClasses('/earnings')}>
					<PiCreditCard className="w-8 h-8" />
					Earnings
				</Link>
				<Link href="/messages" className={getLinkClasses('/messages')}>
					<div className="flex items-center gap-3">
						<PiChatCircleDots className="w-8 h-8" />
						Messages
					</div>
					<div className="text-xs w-6 h-6 flex items-center justify-center bg-orange-500 rounded-full">
						3
					</div>
				</Link>
				<Link
					href="/teachers/settings"
					className={getLinkClasses('/teachers/settings')}
				>
					<PiGear className="w-8 h-8" />
					Settings
				</Link>
			</nav>
		</div>
	);
};
