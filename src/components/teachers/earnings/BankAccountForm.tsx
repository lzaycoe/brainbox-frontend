'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronsUpDown } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';
import {
	Bank,
	BankAccountData,
	bankAccountSchema,
} from '@/schemas/bank.schema';

interface BankAccountFormProps {
	onSubmit: (data: BankAccountData) => void;
	initialData?: BankAccountData;
	banks: Bank[];
	isSubmitting: boolean;
}

export const BankAccountForm = ({
	onSubmit,
	initialData,
	banks,
	isSubmitting,
}: BankAccountFormProps) => {
	const form = useForm<BankAccountData>({
		resolver: zodResolver(bankAccountSchema),
		defaultValues: initialData || {
			bank_name: '',
			account_number: '',
			account_holder: '',
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="bank_name"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Bank Name</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											role="combobox"
											aria-expanded={!!field.value}
											className="w-full justify-between"
										>
											{field.value
												? banks.find((bank) => bank.shortName === field.value)
														?.name
												: 'Select a bank...'}
											<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-full p-0">
									<Command>
										<CommandInput
											placeholder="Search bank..."
											className="h-9"
										/>
										<CommandList>
											<CommandEmpty>No bank found.</CommandEmpty>
											<CommandGroup>
												{banks.map((bank) => (
													<CommandItem
														key={bank.shortName}
														value={`${bank.name} ${bank.shortName}`}
														onSelect={() => {
															field.onChange(bank.shortName);
														}}
													>
														{bank.name}
														<Check
															className={cn(
																'ml-auto h-4 w-4',
																field.value === bank.shortName
																	? 'opacity-100'
																	: 'opacity-0',
															)}
														/>
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="account_number"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Account Number</FormLabel>
							<FormControl>
								<Input placeholder="Enter account number" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="account_holder"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Account Holder</FormLabel>
							<FormControl>
								<Input placeholder="Enter account holder name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button
					type="submit"
					variant="outline"
					className="w-full text-lg h-14 bg-orange-500 text-white disabled:opacity-70"
					disabled={isSubmitting}
				>
					{isSubmitting ? (
						<div className="flex items-center space-x-2">
							<Spinner size="small" />
							<span>{initialData ? 'Updating...' : 'Adding...'}</span>
						</div>
					) : (
						<>{initialData ? 'Update Bank Account' : 'Add Bank Account'}</>
					)}
				</Button>
			</form>
		</Form>
	);
};
