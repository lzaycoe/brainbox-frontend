import CourseList from '@/components/learners/checkout/Course';
import Header from '@/components/learners/checkout/Header';
import PaymentForm from '@/components/learners/checkout/PaymentForm';

export default function Checkout() {
	return (
		<div>
			<Header />
			<div className="flex flex-wrap gap-6 justify-center items-start p-6 bg-white min-h-screen">
				<div className="flex-1 max-w-[600px] flex flex-col justify-end">
					<PaymentForm />
				</div>
				<div className="flex-1 max-w-[600px] flex flex-col justify-center items-center">
					<CourseList />
				</div>
			</div>
		</div>
	);
}
