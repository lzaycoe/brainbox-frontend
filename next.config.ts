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
			{
				protocol: 'https',
				hostname: 'img.clerk.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'cdn.builder.io',
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
