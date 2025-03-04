import * as z from 'zod';

export const courseSchema = z.object({
	title: z
		.string()
		.nonempty({ message: 'Title is required' })
		.max(80, { message: 'Title must be less than 80 characters' }),
	subtitle: z
		.string()
		.max(120, { message: 'Subtitle must be less than 120 characters' }),
	tag: z.string().nonempty({ message: 'Category is required' }),
	description: z.string().nonempty({ message: 'Description is required' }),
	thumbnail: z.string().nonempty({ message: 'Thumbnail is required' }),
	originPrice: z
		.number()
		.min(0, { message: 'Original price must be a positive number' }),
	salePrice: z
		.number()
		.min(0, { message: 'Sale price must be a positive number' }),
	public: z.boolean().optional().default(false),
});

export type CourseData = z.infer<typeof courseSchema>;

export interface Course extends CourseData {
	id: number;
	teacherId: number;
	students?: number;
	status: 'pending' | 'approved' | 'rejected';
}
