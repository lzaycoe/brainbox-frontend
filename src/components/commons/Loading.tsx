'use client';

import React from 'react';

const Loading: React.FC = () => {
	return (
		<div className="flex flex-col justify-center items-center">
			<div className="animate-spin rounded-full h-14 w-14 border-b-4 border-orange-500 mb-4"></div>
			<div className="text-orange-500 text-lg font-semibold">
				Loading <span className="animate-dots">...</span>
			</div>
		</div>
	);
};

export default Loading;
