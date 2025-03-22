'use client';

import { WithdrawRequestTable } from '@/components/admins/withdraw-requests/DataTable';

export default function CheckWithdrawPage() {
	return (
		<div className="px-8 py-10 ml-10">
			<h1 className="text-2xl font-bold mb-6">Teacher Withdraw Requests</h1>
			<div className="bg-white shadow rounded-lg px-10 py-8">
				<WithdrawRequestTable />
			</div>
		</div>
	);
}
