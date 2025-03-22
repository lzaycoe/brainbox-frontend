import { useToast } from '@/hooks/use-toast';
import { getAllClerkUsers } from '@/services/api/user';
import { updateWithdrawStatus } from '@/services/api/withdraw';
import { WithdrawRequest } from '@/types/withdrawRequest';

export const updateWithdrawData = (
	prevData: WithdrawRequest[],
	updatedWithdraw: WithdrawRequest,
): WithdrawRequest[] => {
	return prevData.map((item) =>
		item.id === updatedWithdraw.id
			? { ...item, status: updatedWithdraw.status }
			: item,
	);
};

export const handleUpdateStatus = async (
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
