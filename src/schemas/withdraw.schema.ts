import * as z from 'zod';

export const withdrawSchema = z.object({
	teacherId: z
		.number()
		.int()
		.positive({ message: 'Teacher ID must be a positive integer' }),
	amount: z
		.number()
		.int()
		.min(1000, { message: 'Amount must be at least 1000 VND' }),
	status: z.enum(['pending', 'approved', 'rejected']).optional(),
	reason: z.string().optional(),
});

export type WithdrawData = z.infer<typeof withdrawSchema>;

export interface WithdrawHistory extends WithdrawData {
	id: number;
	adminId: number | null;
	createAt: string;
	updateAt: string;
}
