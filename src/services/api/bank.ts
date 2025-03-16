import axios from 'axios';

import { Bank } from '@/schemas/bank.schema';

export const getAllBanks = async (): Promise<Bank[]> => {
	try {
		const response = await axios.get('https://api.vietqr.io/v2/banks');
		return response.data.data;
	} catch (error) {
		console.error('Failed to fetch VietQR banks:', error);
		throw new Error('Failed to fetch VietQR banks');
	}
};
