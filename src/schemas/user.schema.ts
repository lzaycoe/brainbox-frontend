export interface User {
	id: number;
	clerkId: string;
	role?: 'learner' | 'teacher';
	imageUrl?: string;
	firstName?: string;
	lastName?: string;
}
