import axios from 'axios';

import { BankAccount, BankAccountData } from '@/schemas/bank.schema';
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

export const createBankAccount = async (
	teacherId: number,
	data: BankAccountData,
): Promise<BankAccount> => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/users/teachers/${teacherId}/create-bank-account`,
			data,
		);
		return response.data;
	} catch (error) {
		console.error('Failed to create bank account:', error);
		throw new Error('Failed to create bank account');
	}
};

export const updateBankAccount = async (
	teacherId: number,
	data: BankAccountData,
): Promise<BankAccount> => {
	try {
		const response = await axios.put(
			`${process.env.NEXT_PUBLIC_API_URL}/users/teachers/${teacherId}/update-bank-account`,
			data,
		);
		return response.data;
	} catch (error) {
		console.error('Failed to update bank account:', error);
		throw new Error('Failed to update bank account');
	}
};

export const getAllClerkUsers = async () => {
	try {
		const response = await axios.get<User[]>(
			`${process.env.NEXT_PUBLIC_API_URL}/users`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		return response.data;
	} catch (error) {
		console.error('Failed to fetch users:', error);
		throw new Error('Failed to fetch users');
	}
};
