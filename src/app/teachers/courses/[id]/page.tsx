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
import { getAllLecturesInCourse } from '@/services/api/lecture';
import {
	fetchPaidStudentsCount,
	fetchTotalEarnings,
} from '@/services/api/payment';
import { getAllSections } from '@/services/api/section';
import { getUserClerk } from '@/services/api/user';

const CourseDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [course, setCourse] = useState<Course | null>(null);
	const [creators, setCreators] = useState<User | null>(null);
	const [revenue, setRevenue] = useState(0);
	const [studentsEnrolled, setStudentsEnrolled] = useState(0);
	const [sections, setSections] = useState(0);
	const [lectures, setLectures] = useState(0);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const [
					courseData,
					revenueData,
					studentsData,
					sectionsData,
					lecturesData,
				] = await Promise.all([
					getCourse(Number(id)),
					fetchTotalEarnings(+id),
					fetchPaidStudentsCount(+id),
					getAllSections(id),
					getAllLecturesInCourse(id),
				]);

				setCourse(courseData);
				setRevenue(revenueData);
				setStudentsEnrolled(studentsData);
				setSections(sectionsData.length);
				setLectures(lecturesData.length);

				if (courseData?.teacherId) {
					const creatorData = await getUserClerk(Number(courseData.teacherId));
					setCreators(creatorData);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

	return (
		<div>
			{loading ? (
				<Loading />
			) : (
				<div className="flex flex-wrap justify-center p-4">
					<ListSummaryCard
						revenue={revenue}
						studentsEnrolled={studentsEnrolled}
						sections={sections}
						lectures={lectures}
					/>
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
				</div>
			)}
		</div>
	);
};

export default CourseDetail;
