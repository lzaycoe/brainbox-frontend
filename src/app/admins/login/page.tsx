import { Metadata } from 'next';

import LoginForm from '@/components/admins/LoginForm';

export const metadata: Metadata = {
	title: 'BrainBox | Admin | Login',
};

const Page = () => {
	return (
		<div>
			<LoginForm />
		</div>
	);
};

export default Page;
