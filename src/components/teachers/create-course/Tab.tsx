import React from 'react';

interface TabProps {
	icon: React.ReactNode;
	title: string;
	isActive: boolean;
	onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ icon, title, isActive, onClick }) => {
	return (
		<button
			className={`w-[312px] h-16 p-5 bg-white flex justify-center items-center gap-2 cursor-pointer ${
				isActive ? 'shadow-[inset_0px_-2px_0px_0px_rgba(255,102,54,1.00)]' : ''
			}`}
			onClick={onClick}
			role="button"
		>
			<div className="flex items-center gap-2">
				{icon}
				<div
					className={`text-base font-medium ${isActive ? 'text-[#1d1f26]' : 'text-[#6e7484]'}`}
				>
					{title}
				</div>
			</div>
		</button>
	);
};

export default Tab;
