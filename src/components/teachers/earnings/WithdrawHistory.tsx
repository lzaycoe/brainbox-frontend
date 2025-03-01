import transactions from '@/data/transactionsData';

const WithdrawHistory = () => {
	return (
		<section className="px-3 bg-white max-w-[784px]">
			<header className="flex flex-wrap gap-10 justify-between items-center px-5 py-4 w-full bg-white shadow-sm max-md:max-w-full">
				<h2 className="self-stretch my-auto text-base font-medium leading-none text-neutral-800">
					Withdraw History
				</h2>
			</header>

			<div className="flex flex-wrap gap-3 justify-center items-center px-5 py-2.5 text-xs font-medium leading-tight text-gray-500 uppercase whitespace-nowrap bg-slate-100">
				<div className="self-stretch my-auto w-[200px]">Date</div>
				<div className="self-stretch my-auto w-40">Method</div>
				<div className="self-stretch my-auto w-[200px]">Amount</div>
				<div className="self-stretch my-auto w-[124px]">Status</div>
			</div>

			{transactions.map((transaction, index) => (
				<div
					key={index}
					className="flex flex-wrap gap-3 justify-center items-center px-5 py-3 text-sm tracking-normal leading-loose text-gray-600"
				>
					<div className="self-stretch my-auto w-[200px]">
						{transaction.date}
					</div>
					<div className="self-stretch my-auto w-[200px]">
						{transaction.method}
					</div>
					<div className="self-stretch my-auto w-40">{transaction.amount}</div>
					<div
						className={`self-stretch my-auto font-medium leading-none w-[88px] ${transaction.statusColor}`}
					>
						{transaction.status}
					</div>
					<button
						className="flex shrink-0 self-stretch my-auto w-6 h-6"
						aria-label="More options"
					></button>
				</div>
			))}
		</section>
	);
};

export default WithdrawHistory;
