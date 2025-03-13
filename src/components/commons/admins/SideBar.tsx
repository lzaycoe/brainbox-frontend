'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { adminMenuItems } from '@/config/adminMenuItems';

export const SideBar = () => {
	const pathnameAdmin = usePathname();

	const getLinkClasses = (pathAdmin: string) =>
		clsx(
			'flex items-center gap-4 px-6 py-3',
			pathnameAdmin.startsWith(pathAdmin)
				? 'bg-orange-500 text-white font-semibold'
				: 'text-gray-400 hover:text-white font-semibold',
		);

	return (
		<div className="flex flex-col bg-neutral-800 text-white shadow-sm sm:w-[300px] fixed top-0 left-0 h-full">
			<div className="px-6 py-5 text-2xl font-semibold">
				<div className="flex items-center gap-3">
					<Image
						loading="lazy"
						src="/app/logo.png"
						className="object-contain shrink-0 w-11 aspect-square"
						alt="Logo"
						width={42}
						height={42}
					/>
					BrainBox
				</div>
			</div>
			<nav className="flex flex-col mt-5 space-y-2">
				{adminMenuItems.map((itemMenu) => (
					<Link
						key={itemMenu.path}
						href={itemMenu.path}
						className={getLinkClasses(itemMenu.path)}
					>
						<itemMenu.icon className="w-8 h-8" />
						{itemMenu.label}
						{itemMenu.badge && (
							<div className="text-xs w-6 h-6 flex items-center justify-center bg-orange-500">
								{itemMenu.badge}
							</div>
						)}
					</Link>
				))}
			</nav>
		</div>
	);
};
