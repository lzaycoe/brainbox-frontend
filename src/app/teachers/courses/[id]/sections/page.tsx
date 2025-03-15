'use client';

import { Metadata } from 'next';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Loading from '@/components/commons/Loading';
import CreateSectionDialog from '@/components/teachers/create-section/CreateSectionDialog';
import SectionTab from '@/components/teachers/create-section/SectionTab';
import { Section } from '@/schemas/section.schema';
import { getAllSections } from '@/services/api/section';

export const metadata: Metadata = {
	title: 'BrainBox | Teacher | Sections of Course',
};

export default function CourseSections() {
	const params = useParams();
	const courseId = params.id?.toString() || '';
	const [sections, setSections] = useState<Section[]>([]);
	const [loading, setLoading] = useState(true);

	const handleSectionDeleted = (deletedSectionId: string) => {
		setSections((prevSections) =>
			prevSections.filter((section) => section.id !== Number(deletedSectionId)),
		);
	};

	const handleSectionCreated = (newSection: Section) => {
		setSections((prevSections) => [...prevSections, newSection]);
	};

	const handleSectionUpdated = (updatedSection: Section) => {
		setSections((prevSections) =>
			prevSections.map((section) =>
				section.id === updatedSection.id ? updatedSection : section,
			),
		);
	};

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
		return <Loading />;
	}

	return (
		<div className="bg-slate-100 my-6 px-40 flex flex-col items-center">
			<div className="w-[1320px] px-10 py-6 bg-white shadow-[inset_0px_-1px_0px_0px_rgba(233,234,240,1.00)] flex justify-between items-center">
				<div className="text-[#1d1f26] text-2xl font-semibold leading-loose">
					Course Curriculum
				</div>
				<CreateSectionDialog
					courseId={courseId}
					onSectionCreated={handleSectionCreated}
				/>
			</div>
			<div className="w-[1320px] px-10 py-6 bg-white shadow-[inset_0px_-1px_0px_0px_rgba(233,234,240,1.00)] justify-between items-center">
				{sections.map((section, index) => (
					<SectionTab
						key={section.id}
						section={section}
						index={index + 1}
						courseId={courseId}
						onSectionDeleted={handleSectionDeleted}
						onSectionUpdated={handleSectionUpdated}
					/>
				))}
			</div>
		</div>
	);
}
