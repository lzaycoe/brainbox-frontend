export interface Revenue {
	id: number;
	teacherId: number;
	totalRevenue: number;
	totalWithdrawn: number;
	serviceFee: number;
	netRevenue: number;
	availableForWithdraw: number;
	createAt: string;
	updateAt: string;
}
