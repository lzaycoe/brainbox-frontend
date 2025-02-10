import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'standalone',
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'contrib.rocks',
				pathname: '/**',
			},
		],
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
