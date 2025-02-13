import { SignedIn, UserButton, useClerk } from '@clerk/nextjs';
import {
	PiArrowCircleRightDuotone,
	PiBell,
	PiMagnifyingGlass,
} from 'react-icons/pi';

import MenuItem from '@/components/commons/MenuItem';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
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
	const { signOut } = useClerk();

	const menuItems = [
		{ label: 'Sign Out', icon: PiArrowCircleRightDuotone, action: signOut },
	];
	return (
		<header
			className="flex flex-wrap gap-10 justify-between items-center px-40 py-6 bg-white max-md:px-5 ml-64"
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
				<SignedIn>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="m-2 p-0">
								<UserButton
									appearance={{
										elements: {
											avatarBox:
												'w-14 h-14 border border-orange-400 shadow-lg cursor-pointer',
											userButtonPopoverCard:
												'bg-white shadow-xl rounded-lg p-4',
										},
									}}
								/>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							className="bg-white shadow-lg rounded-lg p-2 mt-2"
						>
							{menuItems.map((item) => (
								<MenuItem key={item.label} {...item} />
							))}
						</DropdownMenuContent>
					</DropdownMenu>
				</SignedIn>
			</div>
		</header>
	);
};
