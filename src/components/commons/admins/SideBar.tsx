'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { adminMenuItems } from '@/config/adminMenuItems';

export const SideBar = () => {
	const pathname = usePathname();

	const getLinkClasses = (path: string) =>
		clsx(
			'flex items-center gap-3 px-6 py-3',
			pathname.startsWith(path)
				? 'bg-orange-500 text-white'
				: 'text-gray-400 hover:text-white',
		);

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
				{adminMenuItems.map((item) => (
					<Link
						key={item.path}
						href={item.path}
						className={getLinkClasses(item.path)}
					>
						<item.icon className="w-8 h-8" />
						{item.label}
						{item.badge && (
							<div className="text-xs w-6 h-6 flex items-center justify-center bg-orange-500 rounded-full">
								{item.badge}
							</div>
						)}
					</Link>
				))}
			</nav>
		</div>
	);
};
