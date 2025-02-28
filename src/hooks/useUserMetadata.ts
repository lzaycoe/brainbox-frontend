'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

import { User } from '@/schemas/user.schema';
import { getUser } from '@/services/api/user';

export const useUserMetadata = () => {
	const { user, isLoaded, isSignedIn } = useUser();
	const [userMetadata, setUserMetadata] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUserMetadata = async () => {
			if (!isLoaded || !isSignedIn || !user) {
				setUserMetadata(null);
				setLoading(false);
				return;
			}

			try {
				const clerkId = user.id;
				const role =
					(user.publicMetadata?.role as 'learner' | 'teacher') || 'learner';
				const backendUser = await getUser(clerkId);

				const metadata: User = {
					id: backendUser.id,
					clerkId,
					role,
				};

				setUserMetadata(metadata);
				console.log('User:', user);
				console.log('User metadata after successful sign-in:', metadata);
			} catch (error) {
				console.error('Failed to fetch user metadata:', error);
				setUserMetadata(null);
			} finally {
				setLoading(false);
			}
		};

		fetchUserMetadata();
	}, [isLoaded, isSignedIn, user]);

	return { userMetadata, loading };
};
