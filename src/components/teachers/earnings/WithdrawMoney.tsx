'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Loading from '@/components/commons/Loading';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { useUserContext } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { Revenue } from '@/schemas/revenue.schema';
import { WithdrawData, withdrawSchema } from '@/schemas/withdraw.schema';
import { getTeacherRevenue } from '@/services/api/revenue';
import { createWithdrawRequest } from '@/services/api/withdraw';
import { formatCurrency } from '@/utils/currency';

const WithdrawMoney = () => {
	const { user, loading: userLoading } = useUserContext();
	const { toast } = useToast();
	const [currentBalance, setCurrentBalance] = useState<number>(0);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [revenueLoading, setRevenueLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [displayAmount, setDisplayAmount] = useState<string>('');

	const hasBankAccount =
		user?.clerkUser?.publicMetadata?.bank_account?.account_number &&
		user.clerkUser.publicMetadata.bank_account.account_number !== '';

	const form = useForm<WithdrawData>({
		resolver: zodResolver(withdrawSchema),
		defaultValues: {
			teacherId: user?.id || 0,
			amount: undefined,
			status: 'pending',
			reason: '',
		},
	});

	useEffect(() => {
		if (user?.id) {
			form.setValue('teacherId', user.id, { shouldValidate: true });
		}
	}, [user, form]);

	useEffect(() => {
		if (user?.id) {
			form.reset({
				teacherId: user.id,
				amount: undefined,
				status: 'pending',
				reason: '',
			});
			setDisplayAmount('');
		}
	}, [user, form]);

	useEffect(() => {
		const fetchRevenue = async () => {
			if (!user?.id || userLoading) return;

			setRevenueLoading(true);
			setError(null);
			try {
				const revenue: Revenue = await getTeacherRevenue(user.id);
				setCurrentBalance(revenue.availableForWithdraw);
			} catch (error) {
				const errorMessage =
					error instanceof Error ? error.message : 'Failed to fetch revenue';
				setError(errorMessage);
				console.error('Error fetching revenue:', error);
			} finally {
				setRevenueLoading(false);
			}
		};

		fetchRevenue();
	}, [user, userLoading]);

	const handleNumberChange = (value: string) => {
		const numericValue = value.replace(/\D/g, '');
		const parsedValue =
			numericValue === '' ? undefined : parseFloat(numericValue);
		form.setValue('amount', parsedValue ?? 0, { shouldValidate: true });
		setDisplayAmount(numericValue);
	};

	const handleBlur = (value: string) => {
		const numericValue = value.replace(/\D/g, '');
		const parsedValue =
			numericValue === '' ? undefined : parseFloat(numericValue);
		form.setValue('amount', parsedValue ?? 0, { shouldValidate: true });
		setDisplayAmount(formatCurrency(parsedValue));
	};

	const handleInput = (value: string) => {
		const numericValue = value.replace(/\D/g, '');
		const parsedValue =
			numericValue === '' ? undefined : parseFloat(numericValue);
		form.setValue('amount', parsedValue ?? 0, { shouldValidate: true });
		setDisplayAmount(numericValue);
	};

	const onSubmit = async (data: WithdrawData) => {
		if (!hasBankAccount) {
			toast({
				title: 'Error',
				description: 'Please add a bank account before withdrawing.',
				variant: 'destructive',
			});
			return;
		}

		setIsSubmitting(true);
		try {
			await createWithdrawRequest(data);
			toast({
				title: 'Success',
				description: 'Withdrawal request submitted successfully!',
				variant: 'success',
			});
			form.reset({
				teacherId: user?.id || 0,
				amount: undefined,
				status: 'pending',
				reason: '',
			});
			setDisplayAmount('');
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Failed to submit withdrawal';
			console.error('Error submitting withdrawal:', error);
			toast({
				title: 'Error',
				description: errorMessage,
				variant: 'destructive',
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	const amount = form.watch('amount');
	const isAmountValid =
		amount !== undefined && amount <= currentBalance && amount >= 1000;

	if (userLoading || revenueLoading) {
		return <Loading content="Loading withdrawal data" className="w-[536px]" />;
	}

	if (error) {
		return <div className="text-red-500">{error}</div>;
	}

	return (
		<main className="flex flex-col justify-center items-center bg-white w-[536px] mr-4 px-10">
			<header className="flex flex-wrap gap-10 justify-between items-center py-4 w-full bg-white shadow-sm max-md:max-w-full">
				<h1 className="self-stretch my-auto text-base font-medium leading-none text-neutral-800">
					Withdraw your money
				</h1>
			</header>

			<section className="mt-8 text-sm leading-loose max-md:max-w-full w-full">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							control={form.control}
							name="amount"
							render={() => (
								<FormItem>
									<FormLabel>Amount (VND)</FormLabel>
									<FormControl>
										<Input
											type="text"
											className="h-14 text-lg"
											placeholder="Enter amount"
											value={displayAmount}
											onChange={(e) => handleNumberChange(e.target.value)}
											onBlur={(e) => handleBlur(e.target.value)}
											onInput={(e) => handleInput(e.currentTarget.value)}
										/>
									</FormControl>
									{form.formState.errors.amount && (
										<FormMessage>
											{form.formState.errors.amount.message}
										</FormMessage>
									)}
									{!isAmountValid &&
										amount !== undefined &&
										amount > currentBalance && (
											<p className="text-red-500 text-sm">
												Amount cannot exceed current balance of{' '}
												{formatCurrency(currentBalance)}.
											</p>
										)}
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="reason"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Reason (Optional)</FormLabel>
									<FormControl>
										<Input
											type="text"
											className="h-14 text-lg"
											placeholder="Enter reason"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormItem className="flex justify-between items-center p-5 bg-white shadow-sm max-md:max-w-full">
							<div className="flex flex-col justify-center">
								<p className="text-2xl leading-none text-neutral-800">
									{formatCurrency(currentBalance)}
								</p>
								<p className="mt-1.5 text-sm tracking-normal leading-loose text-gray-600">
									Current Balance
								</p>
							</div>
							<FormControl>
								<Button
									type="submit"
									variant="outline"
									className="text-lg h-14 px-6 bg-orange-500 text-white disabled:opacity-70"
									disabled={isSubmitting || !hasBankAccount || !isAmountValid}
								>
									{isSubmitting ? (
										<div className="flex items-center space-x-2">
											<Spinner size="small" />
											<span>Withdrawing...</span>
										</div>
									) : (
										'Withdraw money'
									)}
								</Button>
							</FormControl>
						</FormItem>
					</form>
				</Form>
			</section>

			{!hasBankAccount && (
				<div className="mt-4 text-red-500 text-sm">
					Please add a bank account before withdrawing.
				</div>
			)}
		</main>
	);
};

export default WithdrawMoney;
