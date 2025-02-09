import { LogOut, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PiBell, PiMagnifyingGlass } from 'react-icons/pi';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
	title: string;
}

const getTimeOfDayGreeting = () => {
	const currentHour = new Date().getHours();
	if (currentHour < 12) {
		return 'Good Morning';
	} else if (currentHour < 18) {
		return 'Good Afternoon';
	} else {
		return 'Good Evening';
	}
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
	const greeting = getTimeOfDayGreeting();

	return (
		<header
			className="flex flex-wrap gap-10 justify-between items-center px-40 py-6 bg-white max-md:px-5"
			role="banner"
			aria-label="Dashboard Header"
		>
			{/* Greeting Section */}
			<div className="flex flex-col self-stretch my-auto min-w-[240px] w-[312px] max-md:w-full">
				<div
					className="text-sm font-medium tracking-normal leading-none text-gray-500"
					aria-label="Time of Day Greeting"
				>
					{greeting}
				</div>
				<div
					className="mt-1.5 text-xl font-semibold leading-tight text-neutral-800"
					aria-label="Current Section"
				>
					{title}
				</div>
			</div>

			{/* Search and Actions Section */}
			<div className="flex gap-4 items-start self-stretch my-auto min-w-[240px] max-md:w-full">
				{/* Search Bar */}
				<form
					className="flex overflow-hidden flex-col justify-center items-start px-5 py-3 text-base text-gray-400 whitespace-nowrap bg-slate-100 min-w-[240px] w-[312px] max-md:w-full"
					role="search"
				>
					<div className="flex gap-3 items-center">
						<PiMagnifyingGlass className="w-8 h-8" />
						<label htmlFor="searchInput" className="sr-only">
							Search Dashboard
						</label>
						<input
							type="search"
							id="searchInput"
							className="bg-transparent border-none outline-none w-full"
							placeholder="Search"
							aria-label="Search Dashboard"
						/>
					</div>
				</form>

				{/* Notifications Button */}
				<button
					className="flex gap-2.5 items-center p-3 w-12 h-full bg-slate-100 max-md:w-auto"
					aria-label="Notifications"
				>
					<PiBell className="w-8 h-8" />
				</button>

				{/* User Profile Dropdown */}
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Image
							loading="lazy"
							src="/app/lazyavt.png"
							className="object-contain shrink-0 w-12 rounded-full aspect-square cursor-pointer"
							alt="User Profile Picture"
							width={48}
							height={48}
						/>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-36">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<User />
								<Link href="/teachers/profile">Profile</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<LogOut />
							<Link href="/">Log out</Link>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};
