'use client';

import {
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
	useClerk,
} from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import {
	PiArrowCircleRightDuotone,
	PiBell,
	PiCreditCardDuotone,
	PiGearDuotone,
	PiStackDuotone,
	PiUserCircleDuotone,
} from 'react-icons/pi';

import MenuItem from '@/components/commons/MenuItem';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
	const { signOut } = useClerk();

	const menuItems = [
		{
			label: 'My Profile',
			icon: PiUserCircleDuotone,
			action: () => console.log('Go to Profile'),
		},
		{
			label: 'My Courses',
			icon: PiStackDuotone,
			action: () => console.log('Đơn hàng của tôi'),
		},
		{
			label: 'Payments History',
			icon: PiCreditCardDuotone,
			action: () => console.log('Lịch sử thanh toán'),
		},
		{
			label: 'Setting',
			icon: PiGearDuotone,
			action: () => console.log('Settings'),
		},
		{ label: 'Sign Out', icon: PiArrowCircleRightDuotone, action: signOut },
	];

	return (
		<div className="flex flex-col justify-center items-center sticky top-0 z-50 bg-neutral-800">
			<nav
				className="flex flex-wrap gap-10 justify-between items-center px-8 w-full text-sm tracking-normal bg-neutral-800 max-md:px-5 max-md:max-w-full"
				aria-label="Top navigation"
			>
				<div className="flex flex-wrap gap-2 justify-center items-center self-stretch my-auto font-medium leading-none text-gray-400 min-w-[240px] max-md:max-w-full">
					<Link
						href="/"
						className="gap-2.5 self-stretch p-4 my-auto text-white whitespace-nowrap shadow-sm bg-neutral-800"
						aria-current="page"
					>
						Home
					</Link>
					<Link
						href="/courses"
						className="gap-2.5 self-stretch p-4 my-auto whitespace-nowrap bg-neutral-800"
					>
						Courses
					</Link>
					<Link
						href="/about"
						className="gap-2.5 self-stretch p-4 my-auto whitespace-nowrap bg-neutral-800"
					>
						About
					</Link>
					<Link
						href="/contact"
						className="gap-2.5 self-stretch p-4 my-auto whitespace-nowrap bg-neutral-800"
					>
						Contact
					</Link>
					<Link
						href="/become-instructor"
						className="gap-2.5 self-stretch p-4 my-auto bg-neutral-800"
					>
						Become an Instructor
					</Link>
				</div>
				<div className="flex gap-6 items-start self-stretch my-auto leading-loose text-gray-400 whitespace-nowrap">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								className="flex gap-1.5 justify-center items-center"
								aria-label="Select currency"
							>
								<span className="self-stretch my-auto text-gray-400 ">USD</span>
								<MdKeyboardArrowDown color="#fff" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>USD</DropdownMenuItem>
							<DropdownMenuItem>VNĐ</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								className="flex gap-1.5 justify-center items-center"
								aria-label="Select language"
							>
								<span className="self-stretch my-auto text-gray-400 ">
									English
								</span>
								<MdKeyboardArrowDown color="#fff" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>English</DropdownMenuItem>
							<DropdownMenuItem>Vietnamese</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</nav>
			<div className="flex flex-wrap gap-10 justify-between items-center px-8 py-6 w-full bg-white shadow-sm max-md:px-5 max-md:max-w-full">
				<div className="flex flex-wrap gap-10 justify-center items-center self-stretch my-auto min-w-[240px] max-md:max-w-full">
					<Link
						href="/"
						className="flex gap-2 items-center self-stretch my-auto text-3xl font-semibold tracking-tighter leading-none whitespace-nowrap text-neutral-800"
					>
						<Image
							loading="lazy"
							src="/app/logo.png"
							className="object-contain shrink-0 w-10 aspect-square"
							alt="BrainBox Logo"
							width={40}
							height={40}
						/>
						<span className="flex items-center">BrainBox</span>
					</Link>
					<div className="flex flex-wrap gap-4 items-start self-stretch my-auto text-base min-w-[240px] max-md:max-w-full">
						<form className="flex overflow-hidden flex-col justify-center items-start px-5 py-3 text-gray-400 bg-white border border-gray-200 border-solid min-w-[240px] w-[424px] max-md:pr-5 max-md:max-w-full">
							<div className="flex gap-3 items-center w-full">
								<FiSearch className="self-stretch my-auto w-5 h-5" />
								<label htmlFor="searchInput" className="sr-only">
									Search courses
								</label>
								<input
									type="search"
									id="searchInput"
									placeholder="What do you want to learn?"
									className="w-full bg-transparent border-none focus:outline-none"
								/>
							</div>
						</form>
					</div>
				</div>
				<div className="flex gap-4 items-center self-stretch my-auto text-base font-semibold tracking-normal leading-10 capitalize min-w-[240px] max-md:max-w-full">
					<div>
						<Button
							aria-label="Notifications"
							className="focus:outline-none"
							variant={'ghost'}
						>
							<PiBell />
						</Button>
						<Button
							aria-label="Messages"
							className="focus:outline-none"
							variant={'ghost'}
						>
							<FaRegHeart />
						</Button>
						<Button
							aria-label="Shopping cart"
							className="focus:outline-none"
							variant={'ghost'}
						>
							<FiShoppingCart />
						</Button>
					</div>
					<div className="flex gap-2 items-start self-stretch my-auto min-w-[240px]">
						<SignedOut>
							<div className="gap-3 self-stretch px-6 py-2 text-orange-500 bg-rose-100 rounded hover:bg-rose-200 focus:ring-2 focus:ring-orange-500 focus:outline-none max-md:px-5">
								<SignUpButton />
							</div>
							<div className="gap-3 self-stretch px-6 py-2 text-white bg-orange-500 rounded hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:outline-none max-md:px-5">
								<SignInButton />
							</div>
						</SignedOut>
						<SignedIn>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" className="p-0">
										<UserButton
											appearance={{
												elements: {
													avatarBox:
														'w-12 h-12 border border-orange-400 shadow-lg',
													userButtonPopoverCard:
														'bg-white shadow-xl rounded-lg p-4',
												},
											}}
										/>
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent
									align="end"
									className="bg-white shadow-lg rounded-lg p-2"
								>
									{menuItems.map((item) => (
										<MenuItem key={item.label} {...item} />
									))}
								</DropdownMenuContent>
							</DropdownMenu>
						</SignedIn>
					</div>
				</div>
			</div>
		</div>
	);
};
