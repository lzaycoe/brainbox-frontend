'use client';

import { useState } from 'react';
import { FaEye, FaSpinner } from 'react-icons/fa';

import Loading from '@/components/commons/Loading';
import { CustomBankCard } from '@/components/teachers/earnings/CustomBankCard';
import { Button } from '@/components/ui/button';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer';
import { useToast } from '@/hooks/use-toast';
import { Bank, BankAccountData } from '@/schemas/bank.schema';
import { getTeacherBankAccount } from '@/services/custom/user/getTeacherBankAccount';
import { WithdrawRequest } from '@/types/withdrawRequest';
import { handleUpdateStatus } from '@/utils/handleWithdrawRequest';

interface WithdrawActionsCellProps {
	withdraw: WithdrawRequest;
	setData: React.Dispatch<React.SetStateAction<WithdrawRequest[]>>;
	toast: ReturnType<typeof useToast>['toast'];
	banks: Bank[];
}

export function WithdrawActionsCell({
	withdraw,
	setData,
	toast,
	banks,
}: WithdrawActionsCellProps) {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [bankAccount, setBankAccount] = useState<BankAccountData | null>(null);
	const [isLoadingBankAccount, setIsLoadingBankAccount] = useState(false);
	const [isApproving, setIsApproving] = useState(false);
	const [isRejecting, setIsRejecting] = useState(false);

	const handleViewDetails = async () => {
		setIsDrawerOpen(true);
		setIsLoadingBankAccount(true);
		try {
			const bankAccountData = await getTeacherBankAccount(withdraw.teacherId);
			console.log('bankAccountData:', bankAccountData);
			setBankAccount(bankAccountData);
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Failed to fetch bank account details.',
				variant: 'destructive',
				duration: 3000,
			});
			console.error('Error fetching bank account:', error);
		} finally {
			setIsLoadingBankAccount(false);
		}
	};

	const handleApprove = async () => {
		setIsApproving(true);
		try {
			await handleUpdateStatus(withdraw.id, 'approved', setData, toast);
			setIsDrawerOpen(false);
		} finally {
			setIsApproving(false);
		}
	};

	const handleReject = async () => {
		setIsRejecting(true);
		try {
			await handleUpdateStatus(withdraw.id, 'rejected', setData, toast);
			setIsDrawerOpen(false);
		} finally {
			setIsRejecting(false);
		}
	};

	return (
		<>
			<Button
				variant="ghost"
				size="sm"
				onClick={handleViewDetails}
				className="flex items-center space-x-1 text-orange-500 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
			>
				<FaEye className="h-4 w-4" />
				<span>View & Process</span>
			</Button>

			<Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle className="text-center">
							Withdraw Request Details
						</DrawerTitle>
						<DrawerDescription className="text-center">
							Bank account details for {withdraw.teacherName}
						</DrawerDescription>
					</DrawerHeader>
					<div className="p-4 flex justify-center">
						{isLoadingBankAccount ? (
							<Loading content="Loading bank account details" />
						) : bankAccount ? (
							<CustomBankCard bankAccount={bankAccount} banks={banks} />
						) : (
							<div className="text-center text-gray-500">
								No bank account details available.
							</div>
						)}
					</div>
					<DrawerFooter>
						<div className="flex space-x-2 justify-center">
							{withdraw.status === 'pending' && (
								<>
									<Button
										variant="default"
										onClick={handleApprove}
										disabled={isApproving || isRejecting}
										className="flex items-center space-x-2"
									>
										{isApproving ? (
											<>
												<FaSpinner className="h-4 w-4 animate-spin" />
												<span>Approving...</span>
											</>
										) : (
											<span>Approve</span>
										)}
									</Button>
									<Button
										variant="destructive"
										onClick={handleReject}
										disabled={isApproving || isRejecting}
										className="flex items-center space-x-2"
									>
										{isRejecting ? (
											<>
												<FaSpinner className="h-4 w-4 animate-spin" />
												<span>Rejecting...</span>
											</>
										) : (
											<span>Reject</span>
										)}
									</Button>
								</>
							)}
							<DrawerClose asChild>
								<Button variant="outline" disabled={isApproving || isRejecting}>
									Cancel
								</Button>
							</DrawerClose>
						</div>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
}
