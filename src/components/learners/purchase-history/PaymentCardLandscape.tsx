import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User } from '@/schemas/user.schema';
import { formatCurrency } from '@/utils/currency';

interface Payment {
	id: number;
	userId: number;
	courseId: number | null;
	price: number;
	status: string;
	courseDetails?: Course | null;
}

interface Course {
	id: number;
	title: string;
	thumbnail: string;
	originPrice: number;
	salePrice: number;
	teacherId: number;
	teacherDetails?: User;
}

interface PaymentCardLandscapeProps {
	payment: Payment;
}

const PaymentCardLandscape: React.FC<PaymentCardLandscapeProps> = ({
	payment,
}) => {
	const router = useRouter();

	const getBadgeStyles = (status: string) => {
		switch (status.toLowerCase()) {
			case 'paid':
				return 'bg-green-100 text-green-800';
			case 'pending':
				return 'bg-yellow-100 text-yellow-800';
			case 'canceled':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	};

	const handleViewCourse = () => {
		if (payment.courseId) {
			router.push(`/watch-course/${payment.courseId}`);
		}
	};

	return (
		<Card className="flex flex-nowrap justify-center items-center bg-white hover:shadow-2xl hover:scale-105 transition-transform group cursor-pointer">
			<Image
				loading="lazy"
				src={
					payment.courseDetails?.thumbnail ||
					'/app/become_a_teacher/become_a_teacher_1.png'
				}
				className="object-cover self-stretch my-auto shadow-sm aspect-[1.17] w-[220px] rounded-l-lg"
				alt={payment.courseDetails?.title || 'Become a Teacher'}
				width={220}
				height={188}
			/>
			<CardContent className="flex flex-col justify-center self-stretch py-4 my-auto min-w-[240px] flex-1 max-md:max-w-full">
				<div className="flex flex-col justify-start items-start w-full max-md:max-w-full">
					<div className="flex gap-10 justify-between items-center px-6 w-full whitespace-nowrap max-md:px-5 max-md:max-w-full">
						<Badge
							variant="secondary"
							className={`text-xs font-medium leading-tight uppercase truncate min-w-[50px] max-w-[150px] ${getBadgeStyles(
								payment.status,
							)}`}
						>
							{payment.status.toUpperCase()}
						</Badge>
						<div className="flex gap-1.5 items-center self-stretch my-auto">
							<div className="self-stretch my-auto text-lg tracking-tight leading-none text-neutral-800">
								{formatCurrency(
									payment.courseDetails?.salePrice ?? payment.price,
								)}
							</div>
							{payment.courseDetails?.originPrice && (
								<div className="self-stretch my-auto text-sm leading-6 text-gray-400 line-through">
									{formatCurrency(payment.courseDetails.originPrice)}
								</div>
							)}
						</div>
					</div>
					<CardTitle className="mt-2 text-base leading-none px-6 line-clamp-1 group-hover:text-orange-500">
						{payment.courseDetails?.title || 'Become a Teacher'}
					</CardTitle>
				</div>
				{payment.courseId && (
					<div className="flex gap-10 justify-between items-center px-5 mt-4 w-full max-md:max-w-full">
						<div className="flex gap-1.5 mt-3 text-sm text-gray-800">
							<span className="text-gray-500">Created by:</span>{' '}
							{payment.courseDetails?.teacherDetails ? (
								<span className="text-sm text-gray-600">
									{payment.courseDetails.teacherDetails.firstName}{' '}
									{payment.courseDetails.teacherDetails.lastName}
								</span>
							) : (
								<span className="text-sm text-gray-600">Unknown Teacher</span>
							)}
						</div>
					</div>
				)}
				<Separator className="mt-4 max-w-full bg-gray-200 border border-gray-200 border-solid min-h-[1px] w-full" />
				<div className="flex justify-start items-center px-5 mt-4 w-full max-md:max-w-full">
					{payment.courseDetails && (
						<Button
							variant="outline"
							className="mt-3 w-fit hover:bg-orange-500 hover:text-white transition-colors"
							onClick={handleViewCourse}
						>
							View Course
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

export default PaymentCardLandscape;
