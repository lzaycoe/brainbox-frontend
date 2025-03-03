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
				hostname: 'jxaztnbdaxoeftmzztcc.supabase.co',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'd3f1iyfxxz8i1e.cloudfront.net',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'encrypted-tbn0.gstatic.com',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'd2ms8rpfqc4h24.cloudfront.net',
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
