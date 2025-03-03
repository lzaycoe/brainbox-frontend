import axios from 'axios';

import { Section } from '@/schemas/section.schema';

export const createSection = async (
	courseId: string,
	sectionData: Record<string, unknown>,
) => {
	try {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/sections`,
			sectionData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Failed to create section:', error);
		throw new Error('Failed to create section');
	}
};

export const getAllSections = async (courseId: string): Promise<Section[]> => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/sections`,
		);
		return response.data.sort((a: Section, b: Section) => a.id - b.id);
	} catch (error) {
		console.error('Failed to fetch sections:', error);
		throw new Error('Failed to fetch sections');
	}
};

export const deleteSection = async (courseId: string, sectionId: string) => {
	try {
		const response = await axios.delete(
			`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/sections/${sectionId}`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Failed to delete section:', error);
		throw new Error('Failed to delete section');
	}
};

export const updateSection = async (
	courseId: string,
	sectionId: string,
	sectionData: Record<string, unknown>,
) => {
	try {
		const response = await axios.put(
			`${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/sections/${sectionId}`,
			sectionData,
			{
				headers: {
					'Content-Type': 'application/json',
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error('Failed to update section:', error);
		throw new Error('Failed to update section');
	}
};
