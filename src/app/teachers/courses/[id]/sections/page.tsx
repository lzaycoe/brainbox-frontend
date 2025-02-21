'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import CreateSectionDialog from '@/components/teachers/create-section/CreateSectionDialog';
import SectionTab from '@/components/teachers/create-section/SectionTab';
import { Section } from '@/schemas/section.schema';
import { getAllSections } from '@/services/api/section';

export default function CourseSections() {
	const params = useParams();
	const courseId = params.id?.toString() || '';
	const [sections, setSections] = useState<Section[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (courseId) {
			getAllSections(courseId)
				.then((data) => {
					setSections(data);
					setLoading(false);
				})
				.catch((error) => {
					console.error(error);
					setLoading(false);
				});
		}
	}, [courseId]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="bg-slate-100 my-6 px-40 flex flex-col items-center">
			<div className="w-[1320px] px-10 py-6 bg-white shadow-[inset_0px_-1px_0px_0px_rgba(233,234,240,1.00)] flex justify-between items-center">
				<div className="text-[#1d1f26] text-2xl font-semibold leading-loose">
					Course Curriculum
				</div>
				<CreateSectionDialog courseId={courseId} />
			</div>

			{sections.map((section, index) => (
				<SectionTab
					key={section.id}
					section={section}
					index={index + 1}
					courseId={courseId}
				/>
			))}
		</div>
	);
}
