'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { PiClipboardTextDuotone, PiStackDuotone } from 'react-icons/pi';

import FormAdvanceInfo from '@/components/teachers/create-course/FormAdvanceInfo';
import FormBasicInfo from '@/components/teachers/create-course/FormBasicInfo';
import TabGroup from '@/components/teachers/create-course/TabGroup';
import { useUserContext } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { CourseData, courseSchema } from '@/schemas/course.schema';
import { createCourse, getCourse, updateCourse } from '@/services/api/course';
import { deleteImage } from '@/services/supabase/delete';
import { uploadImage } from '@/services/supabase/upload';

interface CourseFormProps {
	courseId?: string;
	isEdit?: boolean;
}

const CourseForm: React.FC<CourseFormProps> = ({
	courseId,
	isEdit = false,
}) => {
	const methods = useForm<CourseData>({
		resolver: zodResolver(courseSchema),
	});

	const router = useRouter();
	const { toast } = useToast();
	const { user, loading: userLoading } = useUserContext();
	const [activeTab, setActiveTab] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isFetching, setIsFetching] = useState(isEdit);
	const [originalThumbnail, setOriginalThumbnail] = useState<string | null>(
		null,
	);

	useEffect(() => {
		if (!isEdit || !courseId || !user || userLoading) return;

		const loadCourseData = async () => {
			try {
				const courseData = await getCourse(Number(courseId));
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
	}, [courseId, user, userLoading, methods, router, toast, isEdit]);

	const onSubmit = async (data: CourseData, file: File | null) => {
		if (!user || userLoading || (isEdit && !courseId)) return;

		setIsLoading(true);
		try {
			if (data.salePrice > data.originPrice) {
				methods.setError('salePrice', {
					type: 'manual',
					message: 'Sale price cannot be greater than original price',
				});
				return;
			}

			if (file) {
				if (isEdit && originalThumbnail) {
					await deleteImage(originalThumbnail);
				}
				const publicUrl = await uploadImage(file);
				if (publicUrl) {
					data.thumbnail = publicUrl;
				} else {
					throw new Error('Failed to upload new thumbnail');
				}
			}

			const teacherId = user.id;

			if (isEdit && courseId) {
				await updateCourse(courseId, data, teacherId);
				toast({
					title: 'Course updated successfully!',
					description: 'Your course has been updated.',
					variant: 'success',
				});
			} else {
				await createCourse(data, teacherId);
				toast({
					title: 'Course created successfully!',
					description: 'Your course has been created.',
					variant: 'success',
				});
			}

			router.push('/teachers/courses');
		} catch (error) {
			console.error(`Failed to ${isEdit ? 'update' : 'create'} course:`, error);
			toast({
				title: `Failed to ${isEdit ? 'update' : 'create'} course`,
				description: `There was a problem ${isEdit ? 'updating' : 'creating'} your course.`,
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
					isEdit={isEdit}
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

export default CourseForm;
