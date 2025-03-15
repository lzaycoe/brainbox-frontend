'use client';

import { Metadata } from 'next';
import { useParams } from 'next/navigation';
import React from 'react';

import FormCreateLecture from '@/components/teachers/create-lecture/FormCreateLecture';

export const metadata: Metadata = {
	title: 'BrainBox | Teacher | Create Lecture',
};

export default function CreateLecture() {
	const { id: courseId, section: sectionId } = useParams<{
		id: string;
		section: string;
	}>();

	return (
		<div className="bg-slate-100 px-40 items-center">
			<FormCreateLecture courseId={courseId} sectionId={sectionId} />
		</div>
	);
}
