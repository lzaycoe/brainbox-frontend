import * as z from 'zod';

export const bankAccountSchema = z.object({
	bank_name: z.string().nonempty({ message: 'Bank name is required' }),
	account_number: z
		.string()
		.nonempty({ message: 'Account number is required' })
		.regex(/^\d+$/, { message: 'Account number must contain only digits' })
		.min(8, { message: 'Account number must be at least 8 digits' })
		.max(20, { message: 'Account number must be less than 20 digits' }),
	account_holder: z
		.string()
		.nonempty({ message: 'Account holder name is required' })
		.max(100, {
			message: 'Account holder name must be less than 100 characters',
		}),
});

export type BankAccountData = z.infer<typeof bankAccountSchema>;

export interface BankAccount extends BankAccountData {
	id?: number;
	teacherId: number;
	createdAt?: string;
	updatedAt?: string;
}

export interface Bank {
	id: number;
	name: string;
	code: string;
	bin: string;
	shortName: string;
	logo: string;
	transferSupported: number;
	lookupSupported: number;
}
