import React from 'react';

interface CategoryCardProps {
	icon: React.ReactElement<{ className?: string; color?: string }>;
	title: string;
	courseCount: string;
	bgColor: string;
	iconColor?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
	icon,
	title,
	courseCount,
	bgColor,
	iconColor,
}) => {
	const cloneIcon = React.cloneElement(icon, {
		className: 'object-contain w-8 h-8 transition-colors duration-300',
		color: iconColor,
	});

	return (
		<article
			className={`flex gap-5 justify-center items-center p-5 ${bgColor} min-w-[240px] hover:shadow-2xl`}
		>
			<div className="flex gap-2.5 items-center self-stretch p-4 my-auto w-16 h-16 bg-white">
				{cloneIcon}
			</div>
			<div className="flex flex-col self-stretch my-auto w-[188px]">
				<h3 className="text-base font-medium leading-none text-neutral-800">
					{title}
				</h3>
				<p className="mt-2 text-sm tracking-normal leading-loose text-gray-500">
					{courseCount} Courses
				</p>
			</div>
		</article>
	);
};

export default CategoryCard;
