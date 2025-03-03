import * as z from 'zod';

export const lectureSchema = z.object({
	title: z.string().nonempty({ message: 'Title is required' }),
	description: z.string().nonempty({ message: 'Description is required' }),
	content: z.string().nonempty({ message: 'Content is required' }),
	type: z.enum(['video', 'file']),
	note: z.string().optional(),
	attachments: z.array(z.string()).optional(),
	canPreview: z.boolean().optional(),
});

export type LectureData = z.infer<typeof lectureSchema>;

interface ClerkUser {
	id: string;
	firstName: string | null;
	lastName: string | null;
	imageUrl: string | null;
}

export interface Lecture extends LectureData {
	id: number;
	clerkUser?: ClerkUser;
	sectionId: number;
	createdAt: string;
	updatedAt: string;
}
