'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

import { User } from '@/schemas/user.schema';
import { getUserByClerkId } from '@/services/api/user';

export const useUserMetadata = () => {
	const { user: clerkUser, isLoaded, isSignedIn } = useUser();
	const [userMetadata, setUserMetadata] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUserMetadata = async () => {
			if (!isLoaded || !isSignedIn || !clerkUser) {
				setUserMetadata(null);
				setLoading(false);
				return;
			}

			try {
				const clerkId = clerkUser.id;
				const role =
					(clerkUser.publicMetadata?.role as 'learner' | 'teacher') ||
					'learner';
				const backendUser = await getUserByClerkId(clerkId);

				const metadata: User = {
					id: backendUser.id,
					clerkId,
					role,
					clerkUser: {
						firstName: clerkUser.firstName ?? undefined,
						lastName: clerkUser.lastName ?? undefined,
						imageUrl: clerkUser.imageUrl,
						publicMetadata: {
							role,
							bank_account:
								clerkUser.publicMetadata?.bank_account &&
								typeof clerkUser.publicMetadata.bank_account === 'object'
									? {
											bank_name: (
												clerkUser.publicMetadata.bank_account as {
													bank_name: string;
												}
											).bank_name,
											account_number: (
												clerkUser.publicMetadata.bank_account as {
													account_number: string;
												}
											).account_number,
											account_holder: (
												clerkUser.publicMetadata.bank_account as {
													account_holder: string;
												}
											).account_holder,
										}
									: undefined,
						},
					},
				};

				setUserMetadata(metadata);
			} catch (error) {
				console.error('Failed to fetch user metadata:', error);
				setUserMetadata(null);
			} finally {
				setLoading(false);
			}
		};

		fetchUserMetadata();
	}, [isLoaded, isSignedIn, clerkUser]);

	return { userMetadata, loading };
};
