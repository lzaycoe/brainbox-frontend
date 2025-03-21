import { BankAccountData } from '@/schemas/bank.schema';
import { getUserClerk } from '@/services/api/user';

export const getTeacherBankAccount = async (
	teacherId: number,
): Promise<BankAccountData | null> => {
	try {
		const teacher = await getUserClerk(teacherId);
		console.log('teacher', teacher);

		if (!teacher) {
			console.warn(`Teacher with ID ${teacherId} not found`);
			return null;
		}

		const bankAccount = teacher.publicMetadata?.bank_account;

		console.log('bankAccount', bankAccount);

		if (!bankAccount) {
			console.warn(`Bank account not found for teacher with ID ${teacherId}`);
			return null;
		}

		const bankAccountData: BankAccountData = {
			bank_name: bankAccount.bank_name,
			account_number: bankAccount.account_number,
			account_holder: bankAccount.account_holder,
		};
		console.log('bankAccountData', bankAccountData);

		return bankAccountData;
	} catch (error) {
		console.error('Failed to fetch teacher bank account:', error);
		throw new Error('Failed to fetch teacher bank account');
	}
};
