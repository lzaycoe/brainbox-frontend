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
import Image from 'next/image';

export default function CourseList() {
	const courses = [
		{
			image: '/app/checkout/course.png',
			author: 'John Doe',
			title: 'Introduction to React',
			price: '$99',
		},
		{
			image: '/app/checkout/course.png',
			author: 'Jane Smith',
			title: 'Advanced JavaScript',
			price: '$120',
		},
	];

	const orderSummary = {
		subtotal: '$219',
		discount: '8%',
		total: '$201',
	};

	return (
		<div className="w-full lg:w-[450px] bg-white border border-gray-200 p-6 shadow-sm">
			<h2 className="text-xl mb-4">Courses</h2>
			{/* Course Items */}
			<div className="space-y-4">
				{courses.map((course, index) => (
					<div key={index} className="flex items-center gap-4">
						<Image
							src={course.image}
							alt={`Course ${index + 1}`}
							width={96}
							height={80}
							className="object-cover"
						/>
						<div className="flex-1">
							<div className="flex gap-1.5 items-start self-start text-xs leading-none">
								<span className="text-gray-400">Course by:</span>
								<span className="text-gray-600">{course.author}</span>
							</div>
							<p className="font-medium text-sm text-gray-800 mt-2">
								{course.title}
							</p>
							<p className="text-orange-500 font-semibold text-sm mt-3">
								{course.price}
							</p>
						</div>
					</div>
				))}
			</div>
			{/* Order Summary */}
			<div className="mt-6 border-t pt-4">
				<h2 className="text-lg font-medium">Order Summary</h2>
				<div className="flex justify-between mt-4">
					<p className="text-sm text-gray-600">Subtotal</p>
					<p className="font-medium">{orderSummary.subtotal}</p>
				</div>
				<div className="flex justify-between">
					<p className="text-sm text-gray-600">Coupon Discount</p>
					<p className="font-medium">{orderSummary.discount}</p>
				</div>
				<div className="flex justify-between text-lg font-semibold mt-4">
					<p>Total:</p>
					<p>{orderSummary.total}</p>
				</div>
				<button className="w-full mt-6 py-3 bg-orange-500 text-white font-semibold text-lg hover:bg-orange-600 transition">
					Complete Payment
				</button>
			</div>
		</div>
	);
}
