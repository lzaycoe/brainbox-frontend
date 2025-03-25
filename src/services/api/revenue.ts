import axios from 'axios';

import { Revenue, SystemReport, TeacherReport } from '@/schemas/revenue.schema';

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

export const getSystemReport = async (): Promise<SystemReport> => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/revenues/system-report`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		return response.data as SystemReport;
	} catch (error) {
		console.error('Error fetching revenue:', error);
		throw error;
	}
};

export const getTeacherReport = async (
	teacherId: number,
): Promise<TeacherReport> => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/revenues/teacher-report/${teacherId}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);

		return response.data as TeacherReport;
	} catch (error) {
		console.error('Error fetching revenue:', error);
		throw error;
	}
};
