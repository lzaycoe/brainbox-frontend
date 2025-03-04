import Image from 'next/image';

const WithdrawMoney = () => {
	return (
		<main className="flex flex-col justify-center items-center bg-white max-w-[536px] mr-4">
			<header className="flex flex-wrap gap-10 justify-between items-center px-5 py-4 w-full bg-white shadow-sm max-md:max-w-full">
				<h1 className="self-stretch my-auto text-base font-medium leading-none text-neutral-800">
					Withdraw your money
				</h1>
			</header>

			<section className="mt-8 text-sm leading-loose max-md:max-w-full">
				<p className="tracking-normal text-gray-400 max-md:max-w-full">
					Payment method:
				</p>

				<div className="flex overflow-hidden flex-wrap gap-4 justify-center items-center px-5 py-2 mt-3 tracking-normal bg-white border border-solid border-green-500 text-neutral-800 max-md:max-w-full">
					<Image
						src="/app/teacher/visa1.png"
						alt="Credit card"
						width={32}
						height={32}
						className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
					/>
					<span className="self-stretch my-auto w-40">4855 **** **** ****</span>
					<span className="self-stretch my-auto w-16">04/24</span>
					<span className="self-stretch my-auto w-[116px]">Lazy Code</span>
				</div>

				<div className="flex overflow-hidden flex-wrap gap-4 justify-center items-center px-5 py-2 mt-3 tracking-normal text-gray-600 bg-white border border-solid border-gray-100 max-md:max-w-full">
					<Image
						src="/app/teacher/visa2.png"
						alt="Credit card"
						width={32}
						height={32}
						className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
					/>
					<span className="self-stretch my-auto w-40">2855 **** **** ****</span>
					<span className="self-stretch my-auto w-16">04/24</span>
					<span className="self-stretch my-auto w-[116px]">Lazy Code</span>
				</div>

				<div className="flex overflow-hidden flex-wrap gap-4 justify-center items-center px-5 py-3 mt-3 text-xs leading-none text-gray-400 bg-white border border-solid border-gray-100 max-md:max-w-full">
					<Image
						src="/app/teacher/visa3.png"
						alt="PayPal"
						width={24}
						height={24}
						className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
					/>
					<p className="self-stretch my-auto w-[420px]">
						You will be redirected to the PayPal site after reviewing your
						order.
					</p>
				</div>
			</section>

			<footer className="flex flex-wrap gap-7 justify-between items-center p-5 mt-8 w-full bg-white shadow-sm max-md:max-w-full">
				<div className="flex flex-col justify-center self-stretch my-auto min-w-60 w-[292px]">
					<p className="text-2xl leading-none text-neutral-800">$16,593.00</p>
					<p className="mt-1.5 text-sm tracking-normal leading-loose text-gray-600">
						Current Balance
					</p>
				</div>
				<button className="gap-3 self-stretch px-6 my-auto text-base font-semibold tracking-normal leading-10 text-white capitalize bg-orange-500 max-md:px-5">
					Withdraw money
				</button>
			</footer>
		</main>
	);
};

export default WithdrawMoney;
