'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { PiClipboardTextDuotone, PiStackDuotone } from 'react-icons/pi';

import FormAdvanceInfo from '@/components/teachers/create-course/FormAdvanceInfo';
import FormBasicInfo from '@/components/teachers/create-course/FormBasicInfo';
import TabGroup from '@/components/teachers/create-course/TabGroup';
import { useUserContext } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { courseSchema } from '@/schemas/course.schema';
import type { CourseData } from '@/schemas/course.schema';
import { createCourse } from '@/services/api/course';
import { uploadImage } from '@/services/supabase/upload';

const CreateCourse = () => {
	const methods = useForm<CourseData>({
		resolver: zodResolver(courseSchema),
	});

	const router = useRouter();

	const [activeTab, setActiveTab] = useState(0);
	const { toast } = useToast();
	const { user, loading } = useUserContext();

	const onSubmit = async (data: CourseData, file: File | null) => {
		if (!user || loading) return;

		try {
			if (data.salePrice > data.originPrice) {
				methods.setError('salePrice', {
					type: 'manual',
					message: 'Sale price cannot be greater than original price',
				});
				return;
			}

			if (file) {
				const publicUrl = await uploadImage(file);
				if (publicUrl) {
					data.thumbnail = publicUrl;
				}
			}

			const teacherId = user.id;

			await createCourse(data, teacherId);
			toast({
				title: 'Course created successfully!',
				description: 'Your course has been created.',
				variant: 'success',
			});
			router.push('/teachers/courses');
		} catch (error) {
			console.error('Failed to create course:', error);
			toast({
				title: 'Failed to create course.',
				description: 'There was a problem creating your course.',
				variant: 'destructive',
			});
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
				/>
			),
		},
	];

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

export default CreateCourse;
