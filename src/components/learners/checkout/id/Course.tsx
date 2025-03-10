'use client';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Loading from '@/components/commons/Loading';
import { Course } from '@/schemas/course.schema';
import { User } from '@/schemas/user.schema';
import { getCourse } from '@/services/api/course';
import { createPayment } from '@/services/api/payment';
import { getUserByClerkId, getUserClerk } from '@/services/api/user';
import { formatPrice } from '@/utils/formatPrice';

export default function CourseList() {
	const [course, setCourse] = useState<Course | null>(null);
	const [loading, setLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [teacherData, setTeacherData] = useState<User | null>(null);
	const [showPopup, setShowPopup] = useState(false);
	const [userData, setUserData] = useState<User | null>(null);

	const { id } = useParams<{ id: string }>();
	const { user } = useUser();
	const router = useRouter();

	const fetchUser = async () => {
		try {
			if (!user) {
				throw new Error('User is undefined');
			}

			const userData = await getUserByClerkId(user?.id);
			setUserData(userData);
		} catch (error) {
			console.error('Failed to fetch user metadata:', error);
			setUserData(null);
		} finally {
			setLoading(false);
		}
	};

	const fetchTeacher = async () => {
		try {
			if (!course) {
				throw new Error('Course is undefined');
			}

			const teacher = await getUserClerk(course?.teacherId);
			setTeacherData(teacher);
		} catch (error) {
			console.error('Failed to fetch teacher metadata:', error);
			setTeacherData(null);
		} finally {
			setLoading(false);
		}
	};

	const fetchCourse = async () => {
		try {
			const courseData = await getCourse(parseInt(id));
			setCourse(courseData);
		} catch (error) {
			console.error('Failed to fetch course data:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (user) {
			fetchUser();
		}
	}, [user?.id]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			fetchCourse();
		}
	}, [id]);

	useEffect(() => {
		if (course?.teacherId) {
			fetchTeacher();
		}
	}, [course?.teacherId]);

	const handlePayment = async () => {
		if (!course) return;

		const userId = userData?.id || 0;
		const courseId = course.id;
		const price = +course.salePrice;

		console.log('paymentData', userId, courseId, price);

		setIsSubmitting(true);
		try {
			const response = await createPayment(userId, courseId, price);

			console.log('response', response);

			if (response.status === 409) {
				setShowPopup(true);
				return;
			}
			router.push(response);
		} catch (error) {
			console.error('Error during payment:', error);
		} finally {
			setIsSubmitting(false);
		}
	};

	const orderSummary = {
		subtotal: course ? course.originPrice : 0,
		discount: course ? course.originPrice - course.salePrice : 0,
		total: course ? course.salePrice : 0,
	};

	if (loading) {
		return <Loading />;
	}

	if (!course) {
		return <div>No course found.</div>;
	}

	return (
		<div className="flex flex-col md:flex-row justify-center items-center gap-8">
			<div className="flex-1 max-w-[600px] flex flex-col justify-center items-center">
				<div className="w-full lg:w-[500px] h-full bg-white border border-gray-200 p-8 shadow-lg rounded-lg flex flex-col">
					<div className="flex flex-col items-center flex-grow">
						<Image
							src={course.thumbnail}
							alt={`Course: ${course.title}`}
							width={500}
							height={300}
							className="object-cover rounded-md w-full"
						/>
						<div className="mt-4 text-center">
							<div className="text-sm text-gray-500">
								<span>Created by: </span>
								<span className="text-gray-700 font-medium">
									{teacherData?.firstName} {teacherData?.lastName}
								</span>
							</div>
							<p className="font-semibold text-lg text-gray-900 mt-2">
								{course.title}
							</p>
							<p className="text-orange-500 font-bold text-lg mt-3">
								{formatPrice(course.originPrice)}
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="flex-1 max-w-[600px] flex flex-col justify-center items-center">
				<div className="w-full lg:w-[500px] h-full bg-white border border-gray-200 p-8 shadow-lg rounded-lg flex flex-col">
					<h2 className="text-2xl font-bold mb-6 text-gray-800">
						Complete your payment for the course
					</h2>

					<div className="mt-6 border-t pt-4 flex-grow">
						<h2 className="text-lg font-semibold mb-4">Order Summary</h2>
						<div className="flex justify-between mb-2">
							<p className="text-sm text-gray-600">Subtotal</p>
							<p className="font-medium text-gray-800">
								{formatPrice(orderSummary.subtotal)}
							</p>
						</div>
						<div className="flex justify-between mb-2">
							<p className="text-sm text-gray-600">Coupon Discount</p>
							<p className="font-medium text-gray-800">
								{formatPrice(orderSummary.discount)}
							</p>
						</div>
						<div className=" flex justify-between text-lg font-bold mt-4">
							<p>Total:</p>
							<p className="text-orange-500">
								{formatPrice(orderSummary.total)}
							</p>
						</div>
						<button
							onClick={handlePayment}
							disabled={isSubmitting}
							className={`w-full mt-8 py-3 text-lg font-semibold rounded-lg transition-all duration-200 ${
								isSubmitting
									? 'bg-gray-300 text-gray-500 cursor-not-allowed'
									: 'bg-orange-500 text-white hover:bg-orange-600 shadow-md'
							}`}
						>
							{isSubmitting ? 'Processing...' : 'Complete Payment'}
						</button>

						{showPopup && (
							<div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
								<div className="bg-white p-6 rounded-lg shadow-lg text-center">
									<h3 className="text-lg font-bold text-gray-800 mb-4">
										Payment Error
									</h3>
									<p className="text-gray-600">
										You have already purchased this course.
									</p>
									<button
										onClick={() => setShowPopup(false)}
										className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
									>
										Close
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
