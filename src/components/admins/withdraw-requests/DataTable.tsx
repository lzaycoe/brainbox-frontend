'use client';

import {
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
import * as React from 'react';
import { useEffect } from 'react';
import { FaChevronDown, FaSyncAlt } from 'react-icons/fa';

import { createColumns } from '@/components/admins/withdraw-requests/Columns';
import Loading from '@/components/commons/Loading';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
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
import { Bank } from '@/schemas/bank.schema';
import { User } from '@/schemas/user.schema';
import { getAllBanks } from '@/services/api/bank';
import { getAllClerkUsers } from '@/services/api/user';
import { getAllWithdrawals } from '@/services/api/withdraw';
import { WithdrawRequest } from '@/types/withdrawRequest';

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
	const [banks, setBanks] = React.useState<Bank[]>([]);
	const { toast } = useToast();

	useEffect(() => {
		const fetchBanks = async () => {
			try {
				const banksData = await getAllBanks();
				setBanks(banksData);
			} catch (error) {
				toast({
					title: 'Error',
					description: 'Failed to fetch banks.',
					variant: 'destructive',
					duration: 3000,
				});
				console.error('Error fetching banks:', error);
			}
		};
		fetchBanks();
	}, [toast]);

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
		columns: createColumns(toast, setData, banks),
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
					<FaSyncAlt className="h-4 w-4 mr-2" />
					Refresh
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" className="ml-auto">
							Columns <FaChevronDown className="ml-2 h-4 w-4" />
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
