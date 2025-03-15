'use client';

import { Metadata } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Loading from '@/components/commons/Loading';
import FormCreateLecture from '@/components/teachers/create-lecture/FormCreateLecture';
import { useToast } from '@/hooks/use-toast';
import { Lecture } from '@/schemas/lecture.schema';
import { getLecture } from '@/services/api/lecture';

export const metadata: Metadata = {
	title: 'BrainBox | Teacher | Edit Lecture',
};

const EditLecture = () => {
	const router = useRouter();
	const { toast } = useToast();
	const [isLoading, setIsLoading] = useState(true);
	const [initialData, setInitialData] = useState<Lecture | null>(null);

	const pathname = usePathname();
	const pathParts = pathname.split('/');
	const courseId = pathParts[3];
	const sectionId = pathParts[5];
	const lectureId = pathParts[7];

	useEffect(() => {
		const loadLectureData = async () => {
			try {
				console.log('Fetching lecture data with params:', {
					courseId,
					sectionId,
					lectureId,
				});
				const lectureData = await getLecture(courseId, sectionId, lectureId);
				setInitialData(lectureData);
			} catch (error) {
				console.error('Failed to load lecture:', error);
				toast({
					title: 'Failed to load lecture',
					description: 'Could not fetch lecture data.',
					variant: 'destructive',
				});
				router.push(`/teachers/courses/${courseId}/sections`);
			} finally {
				setIsLoading(false);
			}
		};

		if (courseId && sectionId && lectureId) {
			loadLectureData();
		}
	}, [courseId, sectionId, lectureId, router, toast]);

	if (isLoading || !initialData) {
		return <Loading />;
	}

	return (
		<div className="bg-slate-100 px-40 items-center">
			<FormCreateLecture
				initialData={initialData}
				isEdit={true}
				courseId={courseId}
				sectionId={sectionId}
				lectureId={lectureId}
			/>
		</div>
	);
};

export default EditLecture;
