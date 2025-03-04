export interface ClerkUser {
	firstName?: string;
	lastName?: string;
	imageUrl?: string;
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
