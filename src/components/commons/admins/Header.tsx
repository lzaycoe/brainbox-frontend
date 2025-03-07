'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
	PiArrowCircleRightDuotone,
	PiBell,
	PiMagnifyingGlass,
} from 'react-icons/pi';

import { Button } from '@/components/ui/button';

interface HeaderProps {
	title: string;
}

const getTimeOfDayGreeting = () => {
	const currentHour = new Date().getHours();
	if (currentHour < 12) {
		return 'Good Morning,';
	} else if (currentHour < 18) {
		return 'Good Afternoon,';
	} else {
		return 'Good Evening,';
	}
};

export const Header: React.FC<HeaderProps> = ({ title }) => {
	const greeting = getTimeOfDayGreeting();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const handleSignOut = () => {
		localStorage.removeItem('access_token');
		localStorage.removeItem('admin_info');

		router.push('/admins/login');

		setIsLoading(true);
	};

	return (
		<header
			className="flex flex-wrap gap-10 justify-between items-center px-40 py-6 bg-white max-md:px-5 ml-64"
			role="banner"
			aria-label="Dashboard Header"
		>
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

			<div className="flex gap-4 items-center self-stretch my-auto min-w-[240px] max-md:w-full">
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

				<button
					className="flex gap-2.5 items-center p-3 w-12 h-full bg-slate-100 max-md:w-auto"
					aria-label="Notifications"
				>
					<PiBell className="w-8 h-8" />
				</button>

				<Button
					variant="ghost"
					className="flex gap-2 items-center px-4 py-2 text-red-600 border border-red-600 rounded-md shadow-sm hover:bg-red-100"
					onClick={handleSignOut}
				>
					{isLoading ? (
						<div className="flex justify-center items-center">
							<div className="animate-spin rounded-full h-5 w-5 border-b-4 border-orange-500"></div>
						</div>
					) : (
						<>
							<PiArrowCircleRightDuotone className="w-6 h-6" />
							<span>Sign Out</span>
						</>
					)}
				</Button>
			</div>
		</header>
	);
};
