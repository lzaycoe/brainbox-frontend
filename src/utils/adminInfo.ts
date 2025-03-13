// utils/admin.ts

// Key constants for localStorage
const ACCESS_TOKEN_KEY = 'access_token';
const ADMIN_INFO_KEY = 'admin_info';

export type AdminInfo = {
	username: string;
	role: string;
};

/**
 * Save admin information to localStorage.
 * @param token - The access token for the admin.
 * @param adminInfo - Additional admin details to save.
 */
export const saveAdminInfo = (token: string, adminInfo: AdminInfo): void => {
	localStorage.setItem(ACCESS_TOKEN_KEY, token);
	localStorage.setItem(ADMIN_INFO_KEY, JSON.stringify(adminInfo));
};

/**
 * Get the access token of the logged-in admin.
 * @returns The access token or null if not available.
 */
export const getAccessToken = (): string | null => {
	return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * Get the admin information from localStorage.
 * @returns The admin info object or null if not available.
 */
export const getAdminInfo = (): AdminInfo | null => {
	const adminInfo = localStorage.getItem(ADMIN_INFO_KEY);
	return adminInfo ? JSON.parse(adminInfo) : null;
};

/**
 * Clear admin information from localStorage (logout functionality).
 */
export const clearAdminInfo = (): void => {
	localStorage.removeItem(ACCESS_TOKEN_KEY);
	localStorage.removeItem(ADMIN_INFO_KEY);
};
