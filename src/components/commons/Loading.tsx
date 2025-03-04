// 'use client';

const Loading: React.FC = () => {
	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="animate-spin rounded-full h-14 w-14 border-b-4 border-orange-500"></div>
		</div>
	);
};

export default Loading;
