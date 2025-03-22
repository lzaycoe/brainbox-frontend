'use client';

import React, { useEffect, useState } from 'react';
import {
	PiCreditCardDuotone,
	PiCrownSimpleDuotone,
	PiReceiptDuotone,
	PiStackDuotone,
} from 'react-icons/pi';

import Loading from '@/components/commons/Loading';
import { SummaryCard } from '@/components/commons/SummaryCard';
import { useUserContext } from '@/contexts/UserContext';
import { Revenue } from '@/schemas/revenue.schema';
import { getTeacherRevenue } from '@/services/api/revenue';
import { formatCurrency } from '@/utils/currency';

export const ListSummaryCard = () => {
	const { user, loading: userLoading } = useUserContext();
	const [revenue, setRevenue] = useState<Revenue | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchRevenue = async (teacherId: number) => {
		setError(null);
		setLoading(true);
		try {
			const data = await getTeacherRevenue(teacherId);
			setRevenue(data);
		} catch {
			setError('Failed to load revenue data');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (userLoading) return;
		if (!user?.id) {
			setError('Teacher ID not found');
			setLoading(false);
			return;
		}
		fetchRevenue(user.id);
	}, [user, userLoading]);

	if (loading || userLoading)
		return <Loading className="w-full" content="Loading revenue" />;
	if (error || !revenue) {
		return (
			<div className="text-red-500">{error || 'No revenue data available'}</div>
		);
	}

	return (
		<div className="flex flex-col gap-6 justify-center items-center mb-6">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<SummaryCard
					icon={<PiStackDuotone className="w-8 h-8 text-orange-500" />}
					value={formatCurrency(revenue.totalRevenue)}
					label="Total Revenue"
					bgColor="bg-orange-100"
				/>
				<SummaryCard
					icon={<PiReceiptDuotone className="w-8 h-8 text-violet-500" />}
					value={formatCurrency(revenue.serviceFee)}
					label="Service Fee"
					bgColor="bg-violet-100"
				/>
				<SummaryCard
					icon={<PiCreditCardDuotone className="w-8 h-8 text-rose-500" />}
					value={formatCurrency(revenue.totalWithdrawn)}
					label="Total Withdrawals"
					bgColor="bg-rose-50"
				/>
				<SummaryCard
					icon={<PiCrownSimpleDuotone className="w-8 h-8 text-green-500" />}
					value={formatCurrency(revenue.availableForWithdraw)}
					label="Current Balance"
					bgColor="bg-green-100"
				/>
			</div>
		</div>
	);
};
