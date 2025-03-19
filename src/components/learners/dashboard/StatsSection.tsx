'use client';

import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import { MdOutlineSlowMotionVideo } from 'react-icons/md';
import { TiTickOutline } from 'react-icons/ti';
import { VscVm, VscVmActive } from 'react-icons/vsc';

import Loading from '@/components/commons/Loading';
import { getProgressByUserId } from '@/services/api/progress';
import { getUserByClerkId } from '@/services/api/user';

import Stat from './Stat';

const StatsSection = () => {
	const [userId, setUserId] = useState<number | null>(null);
	const { user } = useUser();
	const [fetchLoading, setFetchLoading] = useState(true);
	const fetchUser = async () => {
		try {
			if (!user) {
				throw new Error('User is undefined');
			}

			const response = await getUserByClerkId(user?.id);
			setUserId(response.id);
		} catch (error) {
			console.error('Failed to fetch user metadata:', error);
			setUserId(null);
		} finally {
			setFetchLoading(false);
		}
	};

	const [stats, setStats] = useState([
		{
			id: 1,
			value: 0,
			label: 'Enrolled Courses',
			bgColor: 'bg-rose-100',
			icon: <MdOutlineSlowMotionVideo />,
		},
		{
			id: 2,
			value: 0,
			label: 'Active Courses',
			bgColor: 'bg-violet-100',
			icon: <VscVmActive />,
		},
		{
			id: 3,
			value: 0,
			label: 'Inactive Courses',
			bgColor: 'bg-orange-50',
			icon: <VscVm />,
		},
		{
			id: 4,
			value: 0,
			label: 'Completed Courses',
			bgColor: 'bg-green-100',
			icon: <TiTickOutline />,
		},
	]);

	const fetchData = async () => {
		try {
			if (!userId) {
				setFetchLoading(false);
				return;
			}
			const data = await getProgressByUserId(userId);

			const enrolledCourses = data.length;
			const activeCourses = data.filter(
				(course: { courseProgress: number }) => course.courseProgress > 0,
			).length;
			const completedCourses = data.filter(
				(course: { courseProgress: number }) => course.courseProgress === 100,
			).length;
			const inactiveCourses = enrolledCourses - activeCourses;

			setStats((prevStats) => [
				{ ...prevStats[0], value: enrolledCourses },
				{ ...prevStats[1], value: activeCourses },
				{ ...prevStats[2], value: inactiveCourses },
				{ ...prevStats[3], value: completedCourses },
			]);
		} catch (error) {
			console.error('Error fetching stats:', error);
		} finally {
			setFetchLoading(false);
		}
	};

	useEffect(() => {
		if (!userId) {
			fetchUser();
		} else fetchData();
	}, [userId]);

	if (fetchLoading) {
		return <Loading />;
	}

	return (
		<div className="bg-white p-6 rounded-lg shadow-md max-w-7xl mt-10">
			<div className="grid grid-cols-4 gap-6">
				{stats.map((stat) => (
					<Stat
						key={stat.id}
						icon={stat.icon}
						value={stat.value}
						label={stat.label}
						bgColor={stat.bgColor}
					/>
				))}
			</div>
		</div>
	);
};

export default StatsSection;
