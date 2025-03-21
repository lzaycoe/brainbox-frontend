import * as z from 'zod';

import { Message } from '@/schemas/message.schema';

export const conversationSchema = z.object({
	userAId: z
		.number()
		.int()
		.positive({ message: 'UserA ID must be a positive integer' }),
	userBId: z
		.number()
		.int()
		.positive({ message: 'UserB ID must be a positive integer' }),
});

export type ConversationData = z.infer<typeof conversationSchema>;

export interface Conversation extends ConversationData {
	id: number;
	messages: Message[];
}
