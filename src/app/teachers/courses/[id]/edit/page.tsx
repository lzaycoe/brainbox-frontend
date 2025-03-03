'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { PiClipboardTextDuotone, PiStackDuotone } from 'react-icons/pi';

import FormAdvanceInfo from '@/components/teachers/create-course/FormAdvanceInfo';
import FormBasicInfo from '@/components/teachers/create-course/FormBasicInfo';
import TabGroup from '@/components/teachers/create-course/TabGroup';
import { useUserContext } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { CourseData, courseSchema } from '@/schemas/course.schema';
import { getCourse, updateCourse } from '@/services/api/course';
import { deleteImage } from '@/services/supabase/delete';
import { uploadImage } from '@/services/supabase/upload';

const EditCourse = () => {
	const { id } = useParams<{ id: string }>();
	const router = useRouter();
	const { user, loading: userLoading } = useUserContext();
	const { toast } = useToast();
	const [activeTab, setActiveTab] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isFetching, setIsFetching] = useState(true);
	const [originalThumbnail, setOriginalThumbnail] = useState<string | null>(
		null,
	);

	const methods = useForm<CourseData>({
		resolver: zodResolver(courseSchema),
	});

	useEffect(() => {
		if (!id || !user || userLoading) return;

		const loadCourseData = async () => {
			try {
				const courseData = await getCourse(Number(id));
				if (courseData.teacherId !== user.id) {
					throw new Error('You are not authorized to edit this course');
				}

				methods.reset({
					title: courseData.title,
					subtitle: courseData.subtitle,
					description: courseData.description,
					tag: courseData.tag,
					thumbnail: courseData.thumbnail,
					originPrice: courseData.originPrice,
					salePrice: courseData.salePrice,
					public: courseData.public,
				});

				setOriginalThumbnail(courseData.thumbnail);
			} catch (error) {
				console.error('Failed to load course:', error);
				toast({
					title: 'Failed to load course',
					description: 'Could not fetch course data.',
					variant: 'destructive',
				});
				router.push('/teachers/courses');
			} finally {
				setIsFetching(false);
			}
		};

		loadCourseData();
	}, [id, user, userLoading, methods, router, toast]);

	const onSubmit = async (data: CourseData, file: File | null) => {
		if (!user || userLoading || !id) return;

		setIsLoading(true);
		try {
			if (data.salePrice > data.originPrice) {
				methods.setError('salePrice', {
					type: 'manual',
					message: 'Sale price cannot be greater than original price',
				});
				return;
			}

			if (file && originalThumbnail) {
				await deleteImage(originalThumbnail);
				const publicUrl = await uploadImage(file);
				if (publicUrl) {
					data.thumbnail = publicUrl;
				} else {
					throw new Error('Failed to upload new thumbnail');
				}
			}

			const teacherId = user.id;

			await updateCourse(id, data, teacherId);
			toast({
				title: 'Course updated successfully!',
				description: 'Your course has been updated.',
				variant: 'success',
			});
			router.push('/teachers/courses');
		} catch (error) {
			console.error('Failed to update course:', error);
			toast({
				title: 'Failed to update course',
				description: 'There was a problem updating your course.',
				variant: 'destructive',
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleNextTab = () => {
		setActiveTab((prevTab) => Math.min(prevTab + 1, 1));
	};

	const handlePreviousTab = () => {
		setActiveTab((prevTab) => Math.max(prevTab - 1, 0));
	};

	const tabs = [
		{
			icon: <PiStackDuotone className="w-8 h-8" />,
			title: 'Basic Information',
			content: <FormBasicInfo onNextTab={handleNextTab} />,
		},
		{
			icon: <PiClipboardTextDuotone className="w-8 h-8" />,
			title: 'Advance Information',
			content: (
				<FormAdvanceInfo
					onPreviousTab={handlePreviousTab}
					onSubmit={onSubmit}
					isLoading={isLoading}
					isEdit={true}
					initialThumbnail={originalThumbnail}
				/>
			),
		},
	];

	if (isFetching || userLoading) {
		return <div className="px-40 flex justify-center mt-10">Loading...</div>;
	}

	return (
		<FormProvider {...methods}>
			<div className="flex flex-wrap justify-center py-6">
				<TabGroup
					tabs={tabs}
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
			</div>
		</FormProvider>
	);
};

export default EditCourse;
