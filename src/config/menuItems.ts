// /app/teachers/menuItems.ts
import {
	PiChartBarLight,
	PiChatCircleDots,
	PiCreditCard,
	PiGear,
	PiPlusCircleBold,
	PiStack,
} from 'react-icons/pi';

export interface MenuItem {
	path: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	badge?: string;
}

export const menuItems: MenuItem[] = [
	{ path: '/teachers/dashboard', label: 'Dashboard', icon: PiChartBarLight },
	{
		path: '/teachers/create-course',
		label: 'Create New Course',
		icon: PiPlusCircleBold,
	},
	{ path: '/teachers/courses', label: 'My Courses', icon: PiStack },
	{ path: '/earnings', label: 'Earnings', icon: PiCreditCard },
	{ path: '/messages', label: 'Messages', icon: PiChatCircleDots, badge: '3' },
	{ path: '/teachers/settings', label: 'Settings', icon: PiGear },
];
