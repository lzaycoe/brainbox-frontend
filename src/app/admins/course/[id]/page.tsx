'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaCheck, FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa';

import CourseDetailsPage from '@/components/learners/courses/course/course-detail/CourseDetail';
import { getCourse, updateCourseStatus } from '@/services/api/course';

export default function AdminCourseDetailsPage() {
	const params = useParams();
	const courseId = params.id as string;
	const [isUpdating, setIsUpdating] = useState(false);
	const [updateError, setUpdateError] = useState<string | null>(null);
	const [courseStatus, setCourseStatus] = useState<string>('pending');

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
		// Fetch current course status when component mounts
		const fetchCourseStatus = async () => {
			try {
				const course = await getCourse(+courseId);
				setCourseStatus(course.status || 'pending');
			} catch (error) {
				console.error('Failed to fetch course status:', error);
			}
		};

		fetchCourseStatus();
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
			<div className="bg-white shadow-md p-4 ml-12 mb-4 flex justify-start gap-4 sticky top-0 z-10">
				{renderStatusButton()}
			</div>

			{updateError && (
				<div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
					<p className="text-red-700">{updateError}</p>
				</div>
			)}

			<div className="ml-16 mb-10 mt-10">
				<CourseDetailsPage courseId={courseId} isAdminView={true} />
			</div>
		</div>
	);
}
