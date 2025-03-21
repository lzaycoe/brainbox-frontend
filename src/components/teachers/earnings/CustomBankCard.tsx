'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FiCopy, FiEye, FiEyeOff } from 'react-icons/fi';

import { useToast } from '@/hooks/use-toast';
import { Bank, BankAccountData } from '@/schemas/bank.schema';

interface CustomBankCardProps {
	bankAccount: BankAccountData | null;
	banks: Bank[];
}

export const CustomBankCard = ({ bankAccount, banks }: CustomBankCardProps) => {
	const { toast } = useToast();
	const [showAccountNumber, setShowAccountNumber] = useState(false);

	if (!bankAccount) {
		return null;
	}

	const { bank_name, account_number, account_holder } = bankAccount;

	const selectedBank = banks.find((bank) => bank.shortName === bank_name);
	const bankLogo = selectedBank?.logo;
	const bankDisplayName = selectedBank?.name ?? bank_name;

	const maskedAccountNumber = showAccountNumber
		? account_number
		: `${account_number.slice(0, 7)}${'*'.repeat(account_number.length - 7)}`;

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(account_number);
			toast({
				title: 'Copied!',
				description: 'Account number copied to clipboard.',
				variant: 'success',
			});
		} catch {
			toast({
				title: 'Error',
				description: 'Failed to copy account number.',
				variant: 'destructive',
			});
		}
	};

	return (
		<div className="w-[400px] h-[200px] bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white shadow-lg flex flex-col justify-between">
			<div className="flex items-center space-x-4">
				{bankLogo && (
					<div className="flex-shrink-0">
						<Image
							src={bankLogo}
							alt={bankDisplayName}
							width={100}
							height={32}
							className="object-contain"
						/>
					</div>
				)}
				<div
					className="text-lg font-semibold line-clamp-2"
					title={bankDisplayName}
				>
					{bankDisplayName}
				</div>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center space-x-2">
					<span className="text-xl font-mono">{maskedAccountNumber}</span>
					<button
						onClick={() => setShowAccountNumber(!showAccountNumber)}
						className="text-white hover:text-gray-300"
					>
						{showAccountNumber ? <FiEyeOff size={20} /> : <FiEye size={20} />}
					</button>
				</div>
				<button onClick={handleCopy} className="text-white hover:text-gray-300">
					<FiCopy size={20} />
				</button>
			</div>
			<div>
				<p className="text-sm opacity-80">CARD NAME</p>
				<p className="text-lg font-medium truncate">{account_holder}</p>
			</div>
		</div>
	);
};
