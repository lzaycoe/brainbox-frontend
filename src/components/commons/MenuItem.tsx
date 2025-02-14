import React from 'react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface MenuItemProps {
	label: string;
	icon: React.ComponentType<{
		className?: string;
		style?: React.CSSProperties;
	}>;
	action: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, icon: Icon, action }) => (
	<DropdownMenuItem onClick={action} className="text-base">
		<Icon
			className="text-orange-500"
			style={{ width: '2rem', height: '2rem' }}
		/>
		{label}
	</DropdownMenuItem>
);

export default MenuItem;
