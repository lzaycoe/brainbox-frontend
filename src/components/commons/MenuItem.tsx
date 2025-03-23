import React, { useState } from 'react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface MenuItemProps {
	label: string;
	icon: React.ComponentType<{
		className?: string;
		style?: React.CSSProperties;
	}>;
	action: () => void | Promise<void>;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, icon: Icon, action }) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = async () => {
		setIsLoading(true);
		try {
			await action();
		} catch (error) {
			console.error('Error in menu item action:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<DropdownMenuItem
			onClick={handleClick}
			className="text-base flex items-center gap-2 hover:cursor-pointer"
			disabled={isLoading}
		>
			<Icon
				className="text-orange-500"
				style={{ width: '2rem', height: '2rem' }}
			/>
			<span>{isLoading ? 'Processing...' : label}</span>
		</DropdownMenuItem>
	);
};

export default MenuItem;
