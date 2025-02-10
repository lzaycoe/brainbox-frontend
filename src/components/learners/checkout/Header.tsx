import Head from 'next/head';
import Link from 'next/link';

export default function Header() {
	return (
		<>
			<Head>
				<title>Checkout</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link
					href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css"
					rel="stylesheet"
				/>
			</Head>
			<div className="box-border flex flex-col justify-center items-center px-72 py-10 w-full bg-slate-100 max-md:px-24 max-md:py-8 max-sm:p-5 max-sm:text-center">
				<h1 className="m-0 text-2xl font-semibold tracking-tight leading-none text-center text-neutral-800 max-sm:text-xl">
					Checkout
				</h1>
				<div className="flex gap-2 justify-center items-center mt-4 text-sm tracking-normal leading-loose text-gray-500 max-sm:flex-wrap max-sm:justify-center">
					<Link
						href="/"
						className="cursor-pointer duration-[0.2s] ease-[ease] transition-[color]"
						tabIndex={0}
					>
						Home
					</Link>
					<span className="text-gray-500">/</span>
					<Link
						href="/shopping-cart"
						className="cursor-pointer duration-[0.2s] ease-[ease] transition-[color]"
						tabIndex={0}
					>
						Shopping Cart
					</Link>
					<span className="text-gray-500">/</span>
					<span className="text-neutral-800">Checkout</span>
				</div>
			</div>
		</>
	);
}
