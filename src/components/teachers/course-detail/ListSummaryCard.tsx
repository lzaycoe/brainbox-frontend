'use client';

import { useEffect, useState } from 'react';
import {
	PiMoneyWavyDuotone,
	PiPlayCircleDuotone,
	PiStackDuotone,
	PiUsersDuotone,
} from 'react-icons/pi';

import Loading from '@/components/commons/Loading';
import { SummaryCard } from '@/components/commons/SummaryCard';
import { getAllLecturesInCourse } from '@/services/api/lecture';
import {
	fetchPaidStudentsCount,
	fetchTotalEarnings,
} from '@/services/api/payment';
import { getAllSections } from '@/services/api/section';
import { formatCurrency } from '@/utils/currency';

interface ListSummaryCardProps {
	id: string;
}

export const ListSummaryCard = ({ id }: ListSummaryCardProps) => {
	const [revenue, setRevenue] = useState(0);
	const [studentsEnrolled, setStudentsEnrolled] = useState(0);
	const [sections, setSections] = useState(0);
	const [lectures, setLectures] = useState(0);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const [revenue, studentsEnrolled, sections, lectures] =
					await Promise.all([
						fetchTotalEarnings(+id),
						fetchPaidStudentsCount(+id),
						getAllSections(id),
						getAllLecturesInCourse(id),
					]);

				setRevenue(revenue);
				setStudentsEnrolled(studentsEnrolled);
				setSections(sections.length);
				setLectures(lectures.length);
			} catch (error) {
				console.error('Failed to fetch data', error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

	if (loading) {
		return <Loading />;
	}

	const formatRevenue = formatCurrency(revenue);
	return (
		<div className="flex flex-col gap-6 justify-center items-center mb-6">
			{/* Hàng đầu tiên */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
				<SummaryCard
					icon={<PiMoneyWavyDuotone className="w-8 h-8 text-yellow-500" />}
					value={formatRevenue}
					label="Revenue"
					bgColor="bg-yellow-100"
				/>
				<SummaryCard
					icon={<PiUsersDuotone className="w-8 h-8 text-rose-500" />}
					value={studentsEnrolled}
					label="Students Enrolled"
					bgColor="bg-rose-100"
				/>
				<SummaryCard
					icon={<PiStackDuotone className="w-8 h-8 text-green-500" />}
					value={sections}
					label="Sections"
					bgColor="bg-green-100"
				/>
				<SummaryCard
					icon={<PiPlayCircleDuotone className="w-8 h-8 text-orange-500" />}
					value={lectures}
					label="Lectures"
					bgColor="bg-orange-50"
				/>
			</div>
		</div>
	);
};
