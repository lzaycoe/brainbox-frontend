'use client';

import { useEffect, useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import { FiEdit } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';

import Loading from '@/components/commons/Loading';
import {
	Sheet,
	SheetContent,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { useUserContext } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { Bank, BankAccountData } from '@/schemas/bank.schema';
import { getAllBanks } from '@/services/api/bank';
import { createBankAccount, updateBankAccount } from '@/services/api/user';

import { BankAccountForm } from './BankAccountForm';
import { CustomBankCard } from './CustomBankCard';

export const CreditCard = () => {
	const { user, loading } = useUserContext();
	const { toast } = useToast();
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const [banks, setBanks] = useState<Bank[]>([]);
	const [bankAccount, setBankAccount] = useState<BankAccountData | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const bankList = await getAllBanks();
			setBanks(bankList);

			if (user?.id && user.clerkUser?.publicMetadata?.bank_account) {
				const bankData = user.clerkUser.publicMetadata.bank_account;
				const selectedBank = bankList.find(
					(bank) => bank.name === bankData.bank_name,
				);
				setBankAccount({
					bank_name: selectedBank ? selectedBank.shortName : bankData.bank_name,
					account_number: bankData.account_number,
					account_holder: bankData.account_holder,
				});
			}
		};
		fetchData();
	}, [user]);

	const handleSubmit = async (data: BankAccountData) => {
		if (!user?.id) return;

		setIsSubmitting(true);
		try {
			if (bankAccount) {
				await updateBankAccount(user.id, data);
				toast({
					title: 'Success',
					description: 'Bank account updated successfully!',
					variant: 'success',
				});
			} else {
				await createBankAccount(user.id, data);
				toast({
					title: 'Success',
					description: 'Bank account created successfully!',
					variant: 'success',
				});
			}
			setBankAccount(data);
			setIsSheetOpen(false);
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: 'Failed to process bank account';
			console.error('Error submitting bank account:', error);
			toast({
				title: 'Error',
				description: errorMessage,
				variant: 'destructive',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	if (loading) {
		return <Loading content="Loading card" />;
	}

	return (
		<section className="overflow-hidden max-w-[600px] h-auto flex flex-col items-center">
			<div className="flex flex-col items-center pb-3 w-full bg-white">
				<header className="flex gap-10 justify-between items-center self-stretch px-5 py-3 w-full whitespace-nowrap bg-white shadow-sm">
					<h2 className="text-base font-medium text-neutral-800">Cards</h2>
					<div className="flex gap-2 items-center text-sm text-gray-500">
						<span>Revenue</span>
						<IoIosArrowDown className="w-4 h-4" />
					</div>
				</header>
				{bankAccount && (
					<figure className="mt-3 w-full flex justify-center">
						<CustomBankCard bankAccount={bankAccount} banks={banks} />
					</figure>
				)}

				<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
					<SheetTrigger asChild>
						<button className="flex gap-2 justify-center items-center px-12 py-6 mt-6 w-full max-w-sm text-base font-medium bg-white border border-dashed border-[#E9EAF0] text-neutral-800">
							{bankAccount ? (
								<>
									<FiEdit className="w-8 h-8 text-orange-500" />
									<span>Update Bank Account</span>
								</>
							) : (
								<>
									<CiCirclePlus className="w-8 h-8 text-orange-500" />
									<span>Add new card</span>
								</>
							)}
						</button>
					</SheetTrigger>
					<SheetContent>
						<SheetTitle>
							{bankAccount ? 'Update Bank Account' : 'Add Bank Account'}
						</SheetTitle>
						<BankAccountForm
							onSubmit={handleSubmit}
							initialData={bankAccount || undefined}
							banks={banks}
							isSubmitting={isSubmitting}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
};
