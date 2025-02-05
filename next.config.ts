import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'standalone',
	images: {
		domains: ['contrib.rocks'],
		dangerouslyAllowSVG: true,
	},
	async redirects() {
		return [
			{
				source: '/teachers',
				destination: '/teachers/dashboard',
				permanent: false,
			},
		];
	},
};

export default nextConfig;
