/*
 *  ======================================================================
 *  Copyright (C) 2025 - lzaycoe (Lazy Code)
 *  ======================================================================
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 *  ======================================================================
 */
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
