import axios from 'axios';

import { Revenue } from '@/schemas/revenue.schema';

export const getTeacherRevenue = async (
	teacherId: number,
): Promise<Revenue> => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/revenues/teacher/${teacherId}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		return response.data as Revenue;
	} catch (error) {
		console.error('Error fetching revenue:', error);
		throw error;
	}
};
