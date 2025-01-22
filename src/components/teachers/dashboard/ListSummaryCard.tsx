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
import {
	PiCheckSquareOffsetDuotone,
	PiCreditCardDuotone,
	PiNotepadDuotone,
	PiPlayCircleDuotone,
	PiStackDuotone,
	PiTrophyDuotone,
	PiUserCircleDuotone,
	PiUsersDuotone,
} from 'react-icons/pi';

import { SummaryCard } from '@/components/commons/SummaryCard';

export const ListSummaryCard = () => {
	return (
		<div className="flex flex-col gap-6 justify-center items-center my-6">
			<div className="flex flex-wrap gap-6 justify-center items-center">
				<SummaryCard
					icon={<PiPlayCircleDuotone className="w-8 h-8 text-rose-500" />}
					value={957}
					label="Enrolled Courses"
					bgColor="bg-rose-100"
				/>
				<SummaryCard
					icon={
						<PiCheckSquareOffsetDuotone className="w-8 h-8 text-violet-500" />
					}
					value={19}
					label="Active Courses"
					bgColor="bg-violet-100"
				/>
				<SummaryCard
					icon={<PiUsersDuotone className="w-8 h-8 text-orange-500" />}
					value={241}
					label="Course Instructors"
					bgColor="bg-orange-50"
				/>
				<SummaryCard
					icon={<PiTrophyDuotone className="w-8 h-8 text-green-500" />}
					value={951}
					label="Completed Courses"
					bgColor="bg-green-100"
				/>
			</div>
			<div className="flex flex-wrap gap-6 justify-center items-center">
				<SummaryCard
					icon={<PiUserCircleDuotone className="w-8 h-8 text-red-500" />}
					value="1,674,767"
					label="Learners"
					bgColor="bg-red-50"
				/>
				<SummaryCard
					icon={<PiNotepadDuotone className="w-8 h-8 text-green-500" />}
					value={3}
					label="Online Courses"
					bgColor="bg-green-100"
				/>
				<SummaryCard
					icon={<PiCreditCardDuotone className="w-8 h-8 text-gray-500" />}
					value="$7,461,767"
					label="USD Total Earning"
					bgColor="bg-gray-100"
				/>
				<SummaryCard
					icon={<PiStackDuotone className="w-8 h-8 text-violet-500" />}
					value="56,489"
					label="Course Sold"
					bgColor="bg-violet-100"
				/>
			</div>
		</div>
	);
};
