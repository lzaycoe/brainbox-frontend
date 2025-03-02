import { toast } from '@/hooks/use-toast';
import { getPaymentsFromCourse } from '@/services/api/payment';

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
