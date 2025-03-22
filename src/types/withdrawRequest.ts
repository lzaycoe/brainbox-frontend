import { WithdrawHistory } from '@/schemas/withdraw.schema';

export type WithdrawRequest = WithdrawHistory & {
	teacherName: string;
};
