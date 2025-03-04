import axios from 'axios';

import { Payment } from '@/schemas/payment.schema';

export const getPaymentsFromCourse = async (
	courseId: number,
): Promise<Payment[] | null> => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/payments/course/${courseId}`,
		);
		return response.data;
	} catch (error) {
		console.error('Failed to fetch payments:', error);
		throw new Error('Failed to fetch payments');
	}
};

export const getPaymentsFromUser = async (
	userId: number,
): Promise<Payment[] | null> => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/payments/user/${userId}`,
		);
		return response.data;
	} catch (error) {
		console.error('Failed to fetch payments:', error);
		throw new Error('Failed to fetch payments');
	}
};

export const createPayment = async (
	userId: number,
	courseId: number,
	price: number,
) => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/payments`,
			{ userId, courseId, price },
			{
				headers: {
					'Content-Type': 'application/json',
				},
				// body: JSON.stringify(paymentData),
			},
		);
		return response.data;
	} catch (error) {
		console.error('Failed to create payment:', error);
		throw new Error('Failed to create payment');
	}
};

export const fetchPaidStudentsCount = async (
	courseId: number,
): Promise<number> => {
	try {
		const payments = await getPaymentsFromCourse(courseId);
		return (payments ?? []).filter(
			(payment: Payment) => payment.status === 'paid',
		).length;
	} catch (error) {
		console.error(`Error fetching payments for course ${courseId}:`, error);
		return 0;
	}
};
