'use client';

import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';

import Loading from '@/components/commons/Loading';
import PaginationCustom from '@/components/commons/PaginationCustom';
import FilterStatusSelects from '@/components/learners/purchase-history/FilterStatusSelects';
import PaymentCardLandscape from '@/components/learners/purchase-history/PaymentCardLandscape';
import { User } from '@/schemas/user.schema';
import { getCourse } from '@/services/api/course';
import { getPaymentsFromUser } from '@/services/api/payment';
import { getUserByClerkId, getUserClerk } from '@/services/api/user';

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
	const [userId, setUserId] = useState<number | null>(null);
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

	const chunkArray = (array: Payment[], size: number): Payment[][] => {
		const result: Payment[][] = [];
		for (let i = 0; i < array.length; i += size) {
			result.push(array.slice(i, i + size));
		}
		return result;
	};

	const paymentRows = chunkArray(currentPayment, 2);

	const fetchUser = async () => {
		try {
			if (!user) {
				throw new Error('User is undefined');
			}
			const response = await getUserByClerkId(user.id);
			setUserId(response.id);
		} catch (error) {
			console.error('Failed to fetch user metadata:', error);
		} finally {
			setLoading(false);
		}
	};

	const fetchPayments = async () => {
		try {
			if (!userId) {
				throw new Error('User data is undefined');
			}
			const response = await getPaymentsFromUser(userId);
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

			const sortedPayments = paymentsWithCourses.toSorted(
				(a, b) => b.id - a.id,
			);

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
		if (!userId) {
			fetchUser();
		} else fetchPayments();
	}, [userId]);

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <div className="text-red-500">{error}</div>;
	}

	if (payments.length === 0) {
		return (
			<div className="flex justify-center items-center h-full">
				No payments found for user {user?.fullName}.
			</div>
		);
	}

	return (
		<section className="w-full mt-10 space-y-6">
			<FilterStatusSelects onStatusChange={setSelectedStatus} />

			{filteredPayments.length === 0 ? (
				<div className="col-span-4 mt-10 text-xl text-gray-500">
					No payment found for your search.
				</div>
			) : (
				<div className="space-y-6">
					{paymentRows.map((row, rowIndex) => (
						<div
							key={rowIndex}
							className="flex flex-wrap gap-6 md:gap-6 max-md:flex-col"
						>
							{row.map((payment) => (
								<div
									key={payment.id}
									className="flex-1 min-w-[600px] max-w-[calc(50%-1.5rem)] max-md:max-w-full max-md:min-w-0"
								>
									<PaymentCardLandscape payment={payment} />
								</div>
							))}
						</div>
					))}
				</div>
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

export default PaymentList;
