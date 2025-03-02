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
