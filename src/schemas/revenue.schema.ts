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

export interface SystemReport {
	totalRevenue: number;
	systemRevenue: number;
	totalServiceFee: number;
	totalBecomeTeacherFee: number;
	totalLearners: number;
	totalTeachers: number;
	totalCourses: number;
	totalCoursesActive: number;
	totalCoursesSold: number;
	totalCoursesCompleted: number;
}

export interface TeacherReport {
	totalCourses: number;
	totalCoursesPending: number;
	totalCoursesSold: number;
	totalCoursesCompleted: number;
	revenues: Revenue;
}
