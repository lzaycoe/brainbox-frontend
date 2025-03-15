import * as z from 'zod';

export const messageSchema = z.object({
	conversationId: z
		.number()
		.int()
		.positive({ message: 'Conversation ID must be a positive integer' }),
	senderId: z
		.number()
		.int()
		.positive({ message: 'Sender ID must be a positive integer' }),
	content: z.string().optional(),
	attachments: z.array(z.string()).optional(),
	messageType: z.enum(['text', 'image', 'file']).default('text'),
	status: z.enum(['sent', 'received', 'seen']).default('sent'),
});

export type MessageData = z.infer<typeof messageSchema>;
