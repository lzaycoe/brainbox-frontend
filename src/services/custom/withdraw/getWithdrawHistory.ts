import { WithdrawHistory } from '@/schemas/withdraw.schema';
import { getAllWithdrawals } from '@/services/api/withdraw';

export const getWithdrawHistory = async (
	teacherId: number,
): Promise<WithdrawHistory[]> => {
	try {
		const allWithdrawals = await getAllWithdrawals();
		return allWithdrawals.filter(
			(withdrawal) => withdrawal.teacherId === teacherId,
		);
	} catch (error) {
		console.error('Error filtering withdraw history:', error);
		throw error;
	}
};
