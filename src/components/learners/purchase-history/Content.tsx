'use client';

import { useUser } from '@clerk/nextjs';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import PaginationCustom from '@/components/commons/PaginationCustom';
import { User } from '@/schemas/user.schema';
import { getCourse } from '@/services/api/course';
import { getPaymentsByUserId } from '@/services/api/payment';
import { getUserByClerkId, getUserClerk } from '@/services/api/user';
import { formatPrice } from '@/utils/formatPrice';

import FilterStatusSelects from './FilterStatusSelects';

interface Payment {
	id: number;
	userId: number;
	courseId: number;
	price: number;
	status: string;
	courseDetails?: Course | null;
}

interface Course {
	id: number;
	title: string;
	thumbnail: string;
	originPrice: number;
	salePrice: number;
	teacherId: number;
	teacherDetails?: User;
}

const PaymentList = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const paymentsPerPage = 5;
	const [payments, setPayments] = useState<Payment[]>([]);
	const [userData, setUserData] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { user } = useUser();
	const [selectedStatus, setSelectedStatus] = useState('all');

	const indexOfLastPayment = currentPage * paymentsPerPage;
	const indexOfFirstPayment = indexOfLastPayment - paymentsPerPage;

	const filteredPayments = payments.filter((payment) => {
		const matchStatus =
			selectedStatus === 'all' ||
			payment.status.toLowerCase() === selectedStatus.toLowerCase();
		return matchStatus;
	});

	const currentPayment = filteredPayments.slice(
		indexOfFirstPayment,
		indexOfLastPayment,
	);

	const totalPages = Math.ceil(filteredPayments.length / paymentsPerPage);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

	const fetchPayments = async () => {
		try {
			const response = await getPaymentsByUserId(userData?.id || 0);

			if (!response) {
				throw new Error('Failed to fetch payments');
			}

			const data = response;
			const filteredPayments = data.filter(
				(payment: Payment) =>
					payment.status === 'paid' || payment.status === 'canceled',
			);

			const paymentsWithCourses = await Promise.all(
				filteredPayments.map(async (payment: Payment) => {
					if (payment.courseId === null) {
						return { ...payment, courseDetails: null };
					}

					const course = await fetchCourseById(payment.courseId);
					if (course) {
						const teacher = await fetchTeacher(course.teacherId);
						if (teacher) {
							course.teacherDetails = teacher;
						}
					}
					return { ...payment, courseDetails: course };
				}),
			);

			const sortedPayments = paymentsWithCourses.sort((a, b) => b.id - a.id);

			setPayments(sortedPayments);
		} catch (err) {
			console.error(err);
			setError('Could not fetch payments. Please try again later.');
		}
	};

	const fetchCourseById = async (courseId: number): Promise<Course | null> => {
		try {
			const response = await getCourse(courseId);

			if (!response) {
				throw new Error(`Failed to fetch course with ID: ${courseId}`);
			}

			return response;
		} catch (error) {
			console.error('Failed to fetch course:', error);
			return null;
		} finally {
			setLoading(false);
		}
	};

	const fetchTeacher = async (teacherId: number): Promise<User | null> => {
		try {
			const response = await getUserClerk(teacherId);
			return response;
		} catch (error) {
			console.error('Failed to fetch teacher metadata:', error);
			return null;
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
		if (userData) {
			fetchPayments();
		}
	}, [userData?.id]);

	if (loading) {
		return <div>Loading payments...</div>;
	}

	if (error) {
		return <div className="text-red-500">{error}</div>;
	}

	if (payments.length === 0) {
		return <div>No payments found for user {user?.fullName}.</div>;
	}

	return (
		<section className="w-full mt-10 space-y-6">
			<FilterStatusSelects onStatusChange={setSelectedStatus} />

			{filteredPayments.length === 0 ? (
				<div className="col-span-4 mt-10 text-xl text-gray-500">
					No payment found for your search.
				</div>
			) : (
				currentPayment.map((payment) => (
					<div
						key={payment.id}
						className="border border-gray-300 shadow-md p-2 bg-white "
					>
						<article className="grid grid-cols-[55%_25%_20%] items-center max-w-full">
							{payment.courseDetails ? (
								<CourseItem course={payment.courseDetails} />
							) : (
								<section className="flex gap-5 items-start">
									<Image
										src="/app/become_a_teacher/become_a_teacher_1.png"
										alt="Become a Teacher"
										className="object-contain"
										width={160}
										height={90}
									/>
									<div className="flex flex-col justify-between min-h-[160px] w-full">
										<div>
											<h3 className="mt-2 text-lg text-black">
												Become a Teacher
											</h3>
										</div>
									</div>
								</section>
							)}

							<div className="text-left">
								<span className="text-orange-500 text-xl font-medium">
									{formatPrice(
										payment.courseDetails?.salePrice || payment.price,
									)}
								</span>
								{payment.courseDetails?.originPrice && (
									<span className="text-lg line-through text-gray-400 ml-2">
										{formatPrice(payment.courseDetails.originPrice)}
									</span>
								)}
							</div>

							<div className="flex justify-center items-center gap-2">
								<span className="text-gray-500 text-sm font-medium">
									Status:
								</span>
								<span
									className={`px-2 py-1 rounded text-sm font-semibold ${
										payment.status === 'paid'
											? 'bg-green-100 text-green-600'
											: 'bg-red-100 text-red-600'
									}`}
								>
									{payment.status.toUpperCase()}
								</span>
							</div>
						</article>
					</div>
				))
			)}

			{filteredPayments.length > 0 && (
				<PaginationCustom
					currentPage={currentPage}
					totalPages={totalPages}
					onPageChange={paginate}
					activeClassName="bg-[#FF6636] text-white"
					hoverClassName="hover:bg-[#FFEEE8] hover:text-[#FF6636]"
				/>
			)}
		</section>
	);
};

const CourseItem = ({ course }: { course: Course }) => {
	return (
		<section className="flex gap-5 items-center">
			<Image
				src={course.thumbnail}
				alt={course.title}
				className="object-contain"
				width={160}
				height={90}
			/>
			<div className="flex flex-col justify-between min-h-[120px] w-full">
				<div>
					<h3 className="mt-2 text-lg text-black">{course.title}</h3>
				</div>
				<p className="flex gap-1.5 mt-3 text-sm text-gray-800">
					<span className="text-gray-500">Created by:</span>{' '}
					{Boolean(course.teacherId) && (
						<span className="text-sm text-gray-600">
							{course.teacherDetails?.firstName}{' '}
							{course.teacherDetails?.lastName}
						</span>
					)}
				</p>
			</div>
		</section>
	);
};

export default PaymentList;
