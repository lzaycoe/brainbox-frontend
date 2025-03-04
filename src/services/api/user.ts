import axios from 'axios';

import { User } from '@/schemas/user.schema';

export const getUserByClerkId = async (clerkId: string): Promise<User> => {
	try {
		const response = await axios.get<User>(
			`${process.env.NEXT_PUBLIC_API_URL}/users/${clerkId}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		return response.data;
	} catch (error) {
		console.error('Failed to fetch user:', error);
		throw new Error('Failed to fetch user');
	}
};

export const getUserClerk = async (id: number) => {
	try {
		const response = await axios.get<User>(
			`${process.env.NEXT_PUBLIC_API_URL}/users/clerk/${id}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		return response.data;
	} catch (error) {
		console.error('Failed to fetch user:', error);
		throw new Error('Failed to fetch user');
	}
};

export const getTopTeachers = async (top: number): Promise<User[]> => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/users/teachers/top/${top}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		return response.data;
	} catch (error) {
		console.error('Failed to fetch top teachers:', error);
		throw new Error('Failed to fetch top teachers');
	}
};
