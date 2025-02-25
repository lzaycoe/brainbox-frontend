import * as z from 'zod';

export const sectionSchema = z.object({
	title: z.string().nonempty({ message: 'Section name is required' }),
});

export type SectionData = z.infer<typeof sectionSchema>;

export interface Section extends SectionData {
	id: number;
}
