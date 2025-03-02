import React from 'react';

interface TabsProps {
	activeTab: string;
	setActiveTab: (tab: string) => void;
	tabs: string[];
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab, tabs }) => {
	return (
		<nav className="flex border-b">
			{tabs.map((tab) => (
				<button
					key={tab}
					className={`flex-grow pb-4 px-2 text-center capitalize ${activeTab === tab ? 'border-b-2 border-orange-500 text-orange-500' : 'text-gray-500'}`}
					onClick={() => setActiveTab(tab)}
				>
					{tab}
				</button>
			))}
		</nav>
	);
};

export default Tabs;
