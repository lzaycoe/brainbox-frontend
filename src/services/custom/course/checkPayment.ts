import { toast } from '@/hooks/use-toast';
import { Payment } from '@/schemas/payment.schema';
import {
	getPaymentsFromCourse,
	getPaymentsFromUser,
} from '@/services/api/payment';

export const checkPaymentForCourse = async (
	courseId: number,
	userId: number,
	redirect: (url: string) => void,
): Promise<boolean> => {
	try {
		const payments = await getPaymentsFromCourse(courseId);
		const hasPaid = payments?.some(
			(payment) => payment.userId === userId && payment.status === 'paid',
		);

		if (!hasPaid) {
			redirect(`/checkout/${courseId}`);
			toast({
				title: 'Error',
				description: 'You need to purchase the course to watch it.',
				variant: 'destructive',
			});
			return false;
		}

		return true;
	} catch (error) {
		console.error('Failed to check payment:', error);
		toast({
			title: 'Error',
			description: 'Failed to verify payment status.',
			variant: 'destructive',
		});
		return false;
	}
};

export const getPaidPaymentsForUser = async (
	userId: number,
): Promise<Payment[] | null> => {
	try {
		const payments = await getPaymentsFromUser(userId);
		if (!payments) {
			toast({
				title: 'Error',
				description: 'No payments found for this user.',
				variant: 'destructive',
			});
			return null;
		}

		// Lọc các payment có status là "paid" và courseId không phải null
		const paidPayments = payments.filter(
			(payment) => payment.status === 'paid' && payment.courseId !== null,
		);

		return paidPayments;
	} catch (error) {
		console.error('Failed to fetch paid payments:', error);
		toast({
			title: 'Error',
			description: 'Failed to retrieve payment information.',
			variant: 'destructive',
		});
		return null;
	}
};
