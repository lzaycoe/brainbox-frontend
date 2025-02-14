import Image from 'next/image';
import Link from 'next/link';

import { Footer } from '@/components/commons/Footer';
import { Header } from '@/components/commons/Header';

export default function NotFound() {
	return (
		<div>
			<Header />

			{/* Main Content */}
			<main className="flex z-10 flex-wrap gap-10 justify-center items-center mt-0 font-semibold max-md:pl-5 max-md:max-w-full">
				<div className="flex flex-col self-stretch my-auto min-w-[240px] w-[534px] max-md:max-w-full">
					<div className="flex flex-col max-w-full w-[534px]">
						<h1 className="text-7xl tracking-tighter leading-none text-gray-200 max-md:text-4xl">
							Error 404
						</h1>
						<h2 className="mt-4 text-5xl tracking-tighter leading-none text-neutral-800 max-md:max-w-full max-md:text-4xl">
							Oops! Page Not Found
						</h2>
					</div>
					<p className="mt-8 text-xl leading-8 text-gray-600 max-md:max-w-full">
						Something went wrong. It looks like the link is broken or the page
						has been removed.
					</p>
					<Link
						href="/"
						className="gap-3 self-start px-8 mt-8 text-lg tracking-normal text-white capitalize bg-orange-500 leading-[56px] max-md:px-5"
					>
						Go Back
					</Link>
				</div>
				<Image
					loading="lazy"
					src="/app/not-found.svg"
					alt="not-found"
					// className="object-cover max-w-full h-auto rounded-md shadow-lg"
					width={600}
					height={600}
				/>
			</main>

			<Footer />
		</div>
	);
}
