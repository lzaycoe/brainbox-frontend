'use client';

import { toNumber } from 'lodash';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
	PiCardsDuotone,
	PiChatCircleDotsDuotone,
	PiStarDuotone,
} from 'react-icons/pi';

import Loading from '@/components/commons/Loading';
import { RecentActivity } from '@/components/commons/teachers/RecentActivity';
import { RevenueChartCard } from '@/components/commons/teachers/RevenueChartCard';
import CourseDetailCard from '@/components/teachers/course-detail/CourseDetailCard';
import { ListSummaryCard } from '@/components/teachers/course-detail/ListSummaryCard';
import { CourseOverview } from '@/components/teachers/dashboard/CourseOverview';
import { ListSummaryCardDashboard } from '@/components/teachers/dashboard/ListSummaryCardDashboard';
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

	const chartDataCourse = [
		{ month: 'January', desktop: 100 },
		{ month: 'February', desktop: 200 },
		{ month: 'March', desktop: 300 },
		{ month: 'April', desktop: 400 },
		{ month: 'May', desktop: 500 },
		{ month: 'June', desktop: 600 },
	];

	const activitiesCourse = [
		{
			icon: <PiChatCircleDotsDuotone className="text-white" />,
			user: 'John',
			action: 'comments on your lecture 55',
			target: '“What is ux” in “2021 ui/ux design with figmaa”',
			time: 'Just  now',
		},
		{
			icon: <PiStarDuotone className="text-white" />,
			user: 'Joy',
			action: 'give a 5 star rating on your coursea',
			target: '“2021 ui/ux design with figma 5”',
			time: '2 mins ago',
		},
		{
			icon: <PiCardsDuotone className="text-white" />,
			user: 'Jennifer',
			action: 'purchase your coursee',
			target: '“2021 ui/ux design with figmaa 5”',
			time: '3 mins ago',
		},
		{
			icon: <PiCardsDuotone className="text-white" />,
			user: 'Arif',
			action: 'purchase your coursee',
			target: '“2021 ui/ux design with figmaa 5”',
			time: '4 mins ago',
		},
	];

	const chartConfigCourse = {
		desktop: {
			label: ' LazyCode',
			color: 'hsl(var(--chart-1))',
		},
	};

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
						status={course?.status ?? 'pending'}
					/>
					<div className="mt-9">
						<ListSummaryCardDashboard />
						<CourseOverview />
						<section className="flex flex-wrap gap-6 items-start mb-6 max-lg:flex-col mt-6">
							<div className="flex overflow-hidden flex-col min-w-[240px] w-[420px] max-md:w-full h-full mt-2">
								<RecentActivity
									title="Recent Activity"
									activities={activitiesCourse}
								/>
							</div>

							<div className="flex overflow-hidden flex-col min-w-[240px] w-[870px] max-md:w-full h-full mt-2">
								<RevenueChartCard
									title="Revenue"
									chartData={chartDataCourse}
									chartConfig={chartConfigCourse}
								/>
							</div>
						</section>
					</div>
				</div>
			)}
		</div>
	);
};

export default CourseDetail;
