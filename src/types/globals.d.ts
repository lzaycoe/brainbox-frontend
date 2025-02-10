export {};

export type Roles = 'admin' | 'teacher' | 'learner';

declare global {
	interface CustomJwtSessionClaims {
		metadata: {
			role?: Roles;
		};
	}
}
