import { ColumnDef } from '@tanstack/react-table';
import { FaSort } from 'react-icons/fa';

import { WithdrawActionsCell } from '@/components/admins/withdraw-requests/WithdrawActionsCell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Bank } from '@/schemas/bank.schema';
import { WithdrawRequest } from '@/types/withdrawRequest';
import { formatCurrency } from '@/utils/currency';
import { formatDateWithdraw } from '@/utils/date';

export const createColumns = (
	toast: ReturnType<typeof useToast>['toast'],
	setData: React.Dispatch<React.SetStateAction<WithdrawRequest[]>>,
	banks: Bank[],
): ColumnDef<WithdrawRequest>[] => [
	{
		accessorKey: 'teacherName',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				Teacher Name
				<FaSort className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => <div>{row.getValue('teacherName')}</div>,
	},
	{
		accessorKey: 'amount',
		accessorFn: (row) => {
			const amountStr =
				typeof row.amount === 'string' ? row.amount : row.amount.toString();
			const numericValue = parseFloat(amountStr.replace(/[^0-9.]/g, ''));
			return isNaN(numericValue) ? 0 : numericValue;
		},
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				Amount
				<FaSort className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => {
			const amount = parseFloat(row.getValue('amount') as string);
			return (
				<div className="text-left font-medium">{formatCurrency(amount)}</div>
			);
		},
	},
	{
		accessorKey: 'reason',
		header: 'Reason',
		cell: ({ row }) => <div>{row.getValue('reason') || 'N/A'}</div>,
	},
	{
		accessorKey: 'createAt',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				Date
				<FaSort className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => (
			<div>{formatDateWithdraw(row.getValue('createAt') as string)}</div>
		),
	},
	{
		accessorKey: 'status',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				Status
				<FaSort className="ml-2 h-4 w-4" />
			</Button>
		),
		cell: ({ row }) => {
			const status = row.getValue('status') as string;
			let variant: 'default' | 'secondary' | 'destructive' | 'outline' =
				'default';
			let className = '';

			switch (status.toLowerCase()) {
				case 'pending':
					variant = 'secondary';
					className = 'bg-yellow-100 text-yellow-800';
					break;
				case 'approved':
					variant = 'secondary';
					className = 'bg-green-100 text-green-800';
					break;
				case 'rejected':
					variant = 'destructive';
					className = 'bg-red-100 text-red-800';
					break;
			}

			return (
				<Badge variant={variant} className={`rounded-full ${className}`}>
					{status}
				</Badge>
			);
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const withdraw = row.original as WithdrawRequest;
			return (
				<WithdrawActionsCell
					withdraw={withdraw}
					setData={setData}
					toast={toast}
					banks={banks}
				/>
			);
		},
	},
];
