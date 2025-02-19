'use client';

import React from 'react';

import Tab from '@/components/teachers/create-course/Tab';
import { Separator } from '@/components/ui/separator';

interface TabGroupProps {
	tabs: {
		icon: React.ReactNode;
		title: string;
		content: React.ReactNode;
	}[];
	activeTab: number;
	setActiveTab: (index: number) => void;
}

const TabGroup: React.FC<TabGroupProps> = ({
	tabs,
	activeTab,
	setActiveTab,
}) => {
	return (
		<div className="px-40 w-[1245px]">
			<div className="flex bg-white shadow-[inset_0px_-1px_0px_0px_rgba(233,234,240,1.00)]">
				{tabs.map((tab, index) => (
					<Tab
						key={index}
						icon={tab.icon}
						title={tab.title}
						isActive={activeTab === index}
						onClick={() => setActiveTab(index)}
					/>
				))}
			</div>
			<Separator />
			<div className="p-8 bg-white shadow-[inset_0px_-1px_0px_0px_rgba(233,234,240,1.00)]">
				{tabs[activeTab].content}
			</div>
		</div>
	);
};

export default TabGroup;
