import { PiChartBarLight, PiCreditCard, PiStack } from 'react-icons/pi';

export interface AdminMenuItem {
	path: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	badge?: string;
}

export const adminMenuItems: AdminMenuItem[] = [
	{ path: '/admins/dashboard', label: 'Dashboard', icon: PiChartBarLight },
	{ path: '/admins/check-courses', label: 'Check Courses', icon: PiStack },
	{
		path: '/admins/withdraw-requests',
		label: 'Withdraw Requests',
		icon: PiCreditCard,
	},
];
