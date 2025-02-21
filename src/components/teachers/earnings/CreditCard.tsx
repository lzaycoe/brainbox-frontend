// import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import React from 'react';

export const CreditCard = () => {
	return (
		// 	<Card className="flex flex-col flex-1 ">
		// 	<div className="flex gap-10 justify-between items-center px-5 py-4 w-full bg-white shadow-sm max-md:max-w-full">
		// 		<CardTitle>Cards</CardTitle>
		// 	</div>
		// 	<CardContent className="mt-4 py-3">

		// 	</CardContent>
		// 	<CardFooter className="flex-col items-start gap-2 text-sm">

		// 		<div className="leading-none text-muted-foreground">
		// 			USD Dollar you earned.
		// 		</div>
		// 	</CardFooter>
		// </Card>
		<section className="overflow-hidden max-w-[424px]">
			<article className="flex flex-col items-center pb-5 w-full bg-white">
				<header className="flex gap-10 justify-between items-center self-stretch px-5 py-4 w-full whitespace-nowrap bg-white shadow-sm">
					<h1 className="self-stretch my-auto text-base font-medium leading-none text-black">
						Cards
					</h1>
					<button className="flex gap-2 items-center self-stretch my-auto text-sm tracking-normal leading-loose text-right text-black">
						<span className="self-stretch my-auto">Revenue</span>
						<svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
							<path
								d="M6 9l6 6 6-6"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</header>

				<main className="flex flex-col mt-5 w-full max-w-sm">
					<section className="flex z-10 w-full">
						<div className="flex z-10 gap-10 justify-between items-center px-6 mr-0">
							<Image
								src="https://cdn.builder.io/api/v1/image/assets/2d262c75856d4619867d10ab6fef12bc/da372c575d3f3b0c8cf77796788e8f1737f4307c503d7ccc837f5eee22f5c70c?placeholderIfAbsent=true"
								width={84}
								height={84}
								alt="Credit card logo"
								className="object-contain shrink-0 self-stretch my-auto aspect-square"
							/>
							<button className="flex shrink-0 self-stretch my-auto w-6 h-6">
								<svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
									<path
										d="M12 13a1 1 0 100-2 1 1 0 000 2zm7 0a1 1 0 100-2 1 1 0 000 2zM5 13a1 1 0 100-2 1 1 0 000 2z"
										fill="currentColor"
									/>
								</svg>
							</button>
						</div>
						<div className="flex shrink-0 self-start rounded-full bg-white bg-opacity-10 h-[54px] w-[90px]"></div>
					</section>

					<section className="flex self-end mt-0 w-full text-black max-w-[360px]">
						<div className="z-10 grow shrink-0 my-auto mr-0 basis-0 w-fit">
							<div className="flex gap-6 justify-center items-center pr-16 text-2xl leading-none">
								<p className="self-stretch my-auto">4855 **** **** ****</p>
								<button className="flex shrink-0 self-stretch my-auto w-6 h-6">
									<svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
										<path
											d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-2M8 5v14h12V5H8z"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</button>
							</div>

							<div className="flex gap-6 items-start mt-6 font-medium">
								<div className="whitespace-nowrap w-[156px]">
									<p className="text-xs leading-tight uppercase opacity-40">
										Expires
									</p>
									<p className="mt-1 text-sm tracking-normal leading-none">
										04/24
									</p>
								</div>
								<div className="w-[156px]">
									<p className="text-xs leading-tight uppercase opacity-40">
										Card name
									</p>
									<p className="mt-1 text-sm tracking-normal leading-none">
										Lazy Code
									</p>
								</div>
							</div>
						</div>
						<div className="flex shrink-0 rounded-full bg-white bg-opacity-10 h-[147px] w-[180px]"></div>
					</section>
				</main>

				<section className="flex gap-10 justify-between items-center mt-8 w-full max-w-sm">
					<div className="flex gap-1.5 items-start my-auto">
						<span className="flex shrink-0 w-2.5 h-2.5 bg-orange-500 rounded-full"></span>
						<span className="flex shrink-0 w-2.5 h-2.5 bg-rose-200 rounded-full"></span>
					</div>
					<div className="flex gap-2 items-start my-auto">
						<button className="flex shrink-0 w-6 h-6">
							<svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
								<path
									d="M15 18l-6-6 6-6"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
						<button className="flex shrink-0 w-6 h-6 rotate-180">
							<svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
								<path
									d="M15 18l-6-6 6-6"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
					</div>
				</section>

				<button className="flex gap-2 justify-center items-center px-12 py-8 mt-9 w-full max-w-sm text-base font-medium leading-none text-black bg-white border border-dashed border-[#E9EAF0]">
					<svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
						<path
							d="M12 8v8m-4-4h8m6 0a10 10 0 11-20 0 10 10 0 0120 0z"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						/>
					</svg>
					<span>Add new card</span>
				</button>
			</article>
		</section>
	);
};
