import axios from 'axios';

import { WithdrawData, WithdrawHistory } from '@/schemas/withdraw.schema';

export const createWithdrawRequest = async (
	data: WithdrawData,
): Promise<void> => {
	try {
		const payload = {
			teacherId: data.teacherId,
			amount: data.amount,
			status: 'pending',
			reason: data.reason || undefined,
		};

		await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/withdrawals`,
			payload,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
	} catch (error) {
		console.error('Error creating withdraw request:', error);
		throw error;
	}
};

export const getAllWithdrawals = async (): Promise<WithdrawHistory[]> => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/withdrawals`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data as WithdrawHistory[];
	} catch (error) {
		console.error('Error fetching all withdrawals:', error);
		throw error;
	}
};

export const updateWithdrawStatus = async (
	withdrawId: number,
	status: 'approved' | 'rejected',
): Promise<WithdrawHistory> => {
	try {
		const response = await axios.put(
			`${process.env.NEXT_PUBLIC_API_URL}/withdrawals/${withdrawId}`,
			{ status },
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data as WithdrawHistory;
	} catch (error) {
		console.error('Error updating withdraw status:', error);
		throw error;
	}
};
