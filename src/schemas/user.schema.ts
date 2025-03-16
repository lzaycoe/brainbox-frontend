interface BankAccount {
	bank_name: string;
	account_number: string;
	account_holder: string;
}

interface PublicMetadata {
	role?: 'learner' | 'teacher';
	bank_account?: BankAccount;
}

interface ClerkUser {
	firstName?: string;
	lastName?: string;
	imageUrl?: string;
	publicMetadata?: PublicMetadata;
	[key: string]: unknown;
}

export interface User {
	id: number;
	clerkId: string;
	role?: 'learner' | 'teacher';
	imageUrl?: string;
	firstName?: string;
	lastName?: string;
	students?: number;
	clerkUser?: ClerkUser;
}
