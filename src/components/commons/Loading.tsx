'use client';

import React from 'react';

import { cn } from '@/lib/utils';

interface LoadingProps {
	className?: string;
	content?: string;
}

const Loading: React.FC<LoadingProps> = ({
	className,
	content = 'Loading',
}) => {
	return (
		<div className={cn('flex flex-col justify-center items-center', className)}>
			<div className="animate-spin rounded-full h-14 w-14 border-b-4 border-orange-500 mb-4" />
			<div className="text-orange-500 text-lg font-semibold">
				{content} <span className="animate-dots">...</span>
			</div>
		</div>
	);
};

export default Loading;
