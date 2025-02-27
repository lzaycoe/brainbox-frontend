'use client';

import { ReactNode, createContext, useContext } from 'react';

import { useUserMetadata } from '@/hooks/useUserMetadata';
import { User } from '@/schemas/user.schema';

type UserContextType = {
	user: User | null;
	loading: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const { userMetadata, loading } = useUserMetadata();

	return (
		<UserContext.Provider value={{ user: userMetadata, loading }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUserContext must be used within a UserProvider');
	}
	return context;
};
