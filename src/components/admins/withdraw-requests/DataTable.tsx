'use client';

import {
	ColumnDef,
	ColumnFiltersState,
	SortingState,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import {
	ArrowUpDown,
	ChevronDown,
	MoreHorizontal,
	RefreshCw,
} from 'lucide-react';
import * as React from 'react';
import { useEffect } from 'react';

import Loading from '@/components/commons/Loading';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/schemas/user.schema';
import { WithdrawHistory } from '@/schemas/withdraw.schema';
import { getAllClerkUsers } from '@/services/api/user';
import {
	getAllWithdrawals,
	updateWithdrawStatus,
} from '@/services/api/withdraw';
import { formatCurrency } from '@/utils/currency';
import { formatDateWithdraw } from '@/utils/date';

export type WithdrawRequest = WithdrawHistory & {
	teacherName: string;
};

const updateWithdrawData = (
	prevData: WithdrawRequest[],
	updatedWithdraw: WithdrawRequest,
): WithdrawRequest[] => {
	return prevData.map((item) =>
		item.id === updatedWithdraw.id
			? { ...item, status: updatedWithdraw.status }
			: item,
	);
};

const handleUpdateStatus = async (
	withdrawId: number,
	status: 'approved' | 'rejected',
	setData: React.Dispatch<React.SetStateAction<WithdrawRequest[]>>,
	toast: ReturnType<typeof useToast>['toast'],
) => {
	try {
		const updatedWithdrawHistory = await updateWithdrawStatus(
			withdrawId,
			status,
		);
		const teacher = (await getAllClerkUsers()).find(
			(user) => user.id === updatedWithdrawHistory.teacherId,
		);
		const updatedWithdraw: WithdrawRequest = {
			...updatedWithdrawHistory,
			teacherName: teacher?.clerkUser
				? `${teacher.clerkUser.firstName ?? ''} ${teacher.clerkUser.lastName ?? ''}`.trim()
				: 'Unknown Teacher',
		};
		toast({
			title: 'Success',
			description: `Withdraw request ${status}.`,
			variant: 'success',
			duration: 3000,
		});

		setData((prevData) => updateWithdrawData(prevData, updatedWithdraw));
	} catch (error) {
		toast({
			title: 'Error',
			description: `Failed to ${status === 'approved' ? 'approve' : 'reject'} withdraw request.`,
			variant: 'destructive',
			duration: 3000,
		});
		console.error(
			`Error ${status === 'approved' ? 'approving' : 'rejecting'} withdraw:`,
			error,
		);
	}
};

export const createColumns = (
	toast: ReturnType<typeof useToast>['toast'],
	setData: React.Dispatch<React.SetStateAction<WithdrawRequest[]>>,
): ColumnDef<WithdrawRequest>[] => [
	{
		accessorKey: 'teacherName',
		header: ({ column }) => (
			<Button
				variant="ghost"
				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
			>
				Teacher Name
				<ArrowUpDown className="ml-2 h-4 w-4" />
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
				<ArrowUpDown className="ml-2 h-4 w-4" />
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
				<ArrowUpDown className="ml-2 h-4 w-4" />
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
				<ArrowUpDown className="ml-2 h-4 w-4" />
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

			const handleApprove = () =>
				handleUpdateStatus(withdraw.id, 'approved', setData, toast);
			const handleReject = () =>
				handleUpdateStatus(withdraw.id, 'rejected', setData, toast);

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem
							onClick={handleApprove}
							disabled={withdraw.status !== 'pending'}
						>
							Approve
						</DropdownMenuItem>
						<DropdownMenuItem
							onClick={handleReject}
							disabled={withdraw.status !== 'pending'}
						>
							Reject
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];

export function WithdrawRequestTable() {
	const [sorting, setSorting] = React.useState<SortingState>([
		{
			id: 'createAt',
			desc: true,
		},
	]);
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
		[],
	);
	const [columnVisibility, setColumnVisibility] =
		React.useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = React.useState({});
	const [data, setData] = React.useState<WithdrawRequest[]>([]);
	const [loading, setLoading] = React.useState(true);
	const { toast } = useToast();

	const fetchData = React.useCallback(async () => {
		setLoading(true);
		try {
			const withdrawals = await getAllWithdrawals();
			const users: User[] = await getAllClerkUsers();

			const enrichedData = withdrawals.map((withdraw) => {
				const teacher = users.find((user) => user.id === withdraw.teacherId);
				const teacherName = teacher?.clerkUser
					? `${teacher.clerkUser.firstName ?? ''} ${teacher.clerkUser.lastName ?? ''}`.trim()
					: 'Unknown Teacher';

				return {
					...withdraw,
					teacherName,
				};
			});

			setData(enrichedData);
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Failed to fetch withdraw requests or users.',
				variant: 'destructive',
				duration: 3000,
			});
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
	}, [toast]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const table = useReactTable({
		data,
		columns: createColumns(toast, setData),
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		initialState: {
			pagination: {
				pageSize: 10,
			},
		},
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
	});

	if (loading) {
		return <Loading content="Loading withdraw requests" />;
	}

	return (
		<div className="w-full">
			<div className="flex items-center py-4 space-x-2">
				<Input
					placeholder="Filter teacher names..."
					value={
						(table.getColumn('teacherName')?.getFilterValue() as string) ?? ''
					}
					onChange={(event) =>
						table.getColumn('teacherName')?.setFilterValue(event.target.value)
					}
					className="max-w-sm"
				/>
				<Button
					variant="outline"
					size="sm"
					onClick={fetchData}
					className="ml-2"
				>
					<RefreshCw className="h-4 w-4 mr-2" /> Refresh
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <ChevronDown className="ml-2 h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										key={column.id}
										className="capitalize"
										checked={column.getIsVisible()}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={table.getAllColumns().length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-between w-full px-4 py-4">
				<div className="text-sm text-muted-foreground">
					Showing{' '}
					{table.getState().pagination.pageIndex *
						table.getState().pagination.pageSize +
						1}
					-
					{Math.min(
						(table.getState().pagination.pageIndex + 1) *
							table.getState().pagination.pageSize,
						table.getFilteredRowModel().rows.length,
					)}{' '}
					of {table.getFilteredRowModel().rows.length} items
				</div>
				<div className="space-x-2">
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
