'use client';

import { toNumber } from 'lodash';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaCheck, FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';

import Loading from '@/components/commons/Loading';
import CourseDetail from '@/components/teachers/course-detail/CourseDetail';
import CourseDetailCard from '@/components/teachers/course-detail/CourseDetailCard';
import { Course } from '@/schemas/course.schema';
import { User } from '@/schemas/user.schema';
import { getCourse, updateCourseStatus } from '@/services/api/course';
import { getUserClerk } from '@/services/api/user';

export default function AdminCourseDetailsPage() {
	const params = useParams();
	const courseId = params.id as string;
	const [isUpdating, setIsUpdating] = useState(false);
	const [updateError, setUpdateError] = useState<string | null>(null);
	const [courseStatus, setCourseStatus] = useState<string>('pending');
	const [course, setCourse] = useState<Course | null>(null);
	const [creators, setCreators] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	// Render appropriate button based on course status
	const renderStatusButton = () => {
		if (courseStatus === 'approved') {
			return (
				<button
					disabled
					className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-md cursor-not-allowed"
				>
					<FaCheckCircle className="w-4 h-4" />
					Course Approved
				</button>
			);
		} else if (courseStatus === 'rejected') {
			return (
				<button
					disabled
					className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-800 rounded-md cursor-not-allowed"
				>
					<FaTimesCircle className="w-4 h-4" />
					Course Rejected
				</button>
			);
		} else {
			return (
				<>
					<button
						onClick={() => handleStatusUpdate('approved')}
						disabled={isUpdating}
						className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<FaCheck className="w-4 h-4" />
						Approve Course
					</button>
					<button
						onClick={() => handleStatusUpdate('rejected')}
						disabled={isUpdating}
						className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<FaTimes className="w-4 h-4" />
						Reject Course
					</button>
				</>
			);
		}
	};

	useEffect(() => {
		// Fetch current course status and course details when component mounts
		const fetchCourseData = async () => {
			setLoading(true);
			try {
				const courseData = await getCourse(+courseId);
				setCourse(courseData);
				setCourseStatus(courseData.status || 'pending');

				if (courseData?.teacherId) {
					const creatorData = await getUserClerk(Number(courseData.teacherId));
					setCreators(creatorData);
				}
			} catch (error) {
				console.error('Failed to fetch course data:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchCourseData();
	}, [courseId]);

	const handleStatusUpdate = async (newStatus: 'approved' | 'rejected') => {
		try {
			setIsUpdating(true);
			setUpdateError(null);

			await updateCourseStatus(courseId, newStatus);

			// Update local status after successful API call
			setCourseStatus(newStatus);
		} catch (error) {
			console.error('Failed to update course status:', error);
			setUpdateError('Failed to update course status. Please try again.');
		} finally {
			setIsUpdating(false);
		}
	};

	return (
		<div className="relative">
			<div className="bg-white shadow-md p-4 ml-12 mb-4 flex justify-between items-center sticky top-0 z-10">
				<h1 className="text-xl font-semibold">Course Review</h1>
				<div className="flex gap-4">{renderStatusButton()}</div>
			</div>

			{updateError && (
				<div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
					<p className="text-red-700">{updateError}</p>
				</div>
			)}

			<div className="ml-16 mb-10 mt-10">
				{loading ? (
					<Loading />
				) : (
					<>
						<div className="flex flex-wrap justify-center p-4">
							<CourseDetailCard
								creators={`${creators?.firstName ?? ''} ${creators?.lastName ?? ''}`.trim()}
								avatarImages={creators?.imageUrl ?? ''}
								id={+courseId}
								teacherId={course?.teacherId ?? 0}
								title={course?.title ?? ''}
								subtitle={course?.subtitle ?? ''}
								tag={course?.tag ?? ''}
								description={course?.description ?? ''}
								thumbnail={course?.thumbnail ?? ''}
								originPrice={toNumber(course?.originPrice) || 0}
								salePrice={toNumber(course?.salePrice) || 0}
								createdAt={course?.createdAt ?? ''}
								updatedAt={course?.updatedAt ?? ''}
								public={false}
								status={course?.status ?? 'pending'}
								isAdminView={true}
							/>
						</div>
						<div className="flex justify-center w-full">
							<CourseDetail isAdminView={true} />
						</div>
					</>
				)}
			</div>
		</div>
	);
}
