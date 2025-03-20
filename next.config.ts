import type { NextConfig } from 'next';

import { allowedHostnames } from '@/config/allowedHostnames';

const remotePatterns = allowedHostnames.map((hostname) => ({
	protocol: 'https' as const,
	hostname,
	pathname: '/**',
}));

const nextConfig: NextConfig = {
	output: 'standalone',
	images: {
		remotePatterns,
		dangerouslyAllowSVG: true,
	},
	async redirects() {
		return [
			{
				source: '/teachers',
				destination: '/teachers/dashboard',
				permanent: false,
			},
			{
				source: '/admins',
				destination: '/admins/dashboard',
				permanent: false,
			},
		];
	},
};

export default nextConfig;
