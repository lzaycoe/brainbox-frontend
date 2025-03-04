'use client';

import { toNumber } from 'lodash';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Loading from '@/components/commons/Loading';
import CourseDetailCard from '@/components/teachers/course-detail/CourseDetailCard';
import { ListSummaryCard } from '@/components/teachers/course-detail/ListSummaryCard';
import { Course } from '@/schemas/course.schema';
import { User } from '@/schemas/user.schema';
import { getCourse } from '@/services/api/course';
import { getUserClerk } from '@/services/api/user';

const CourseDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [course, setCourse] = useState<Course | null>(null);
	const [creators, setCreators] = useState<User | null>(null);

	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchCourse = async () => {
			setLoading(true);
			try {
				const course = await getCourse(Number(id));
				console.log('CourseDetail:', course);
				setCourse(course);
				const creators = await getUserClerk(Number(course.teacherId));
				setCreators(creators);
			} catch (error) {
				console.error('Error fetching course or creators:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchCourse();
	}, [id]);

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="flex flex-wrap justify-center p-4">
			<ListSummaryCard id={id} />;
			<CourseDetailCard
				creators={`${creators?.firstName ?? ''} ${creators?.lastName ?? ''}`.trim()}
				avatarImages={creators?.imageUrl || ''}
				id={+id}
				teacherId={course?.teacherId || 0}
				title={course?.title || ''}
				subtitle={course?.subtitle || ''}
				tag={course?.tag || ''}
				description={course?.description || ''}
				thumbnail={course?.thumbnail || ''}
				originPrice={toNumber(course?.originPrice) || 0}
				salePrice={toNumber(course?.salePrice) || 0}
				createdAt={
					course?.createdAt
						? new Date(course.createdAt).toISOString().split('T')[0]
						: ''
				}
				updatedAt={
					course?.updatedAt
						? new Date(course.updatedAt).toISOString().split('T')[0]
						: ''
				}
				public={false}
			/>
			;
		</div>
	);
};

export default CourseDetail;
