'use client';

import { useParams } from 'next/navigation';
import React from 'react';

import { ListSummaryCard } from '@/components/teachers/course-detail/ListSummaryCard';

const CourseDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	return (
		<div className="flex flex-wrap justify-center p-4">
			<ListSummaryCard id={id} />;
		</div>
	);
};

export default CourseDetail;
