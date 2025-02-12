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
import CommentSection from '@/components/learners/watch-course/CommentSection';
import CourseMenu from '@/components/learners/watch-course/CourseMenu';
import CourseNavigation from '@/components/learners/watch-course/CourseNavigation';
import CourseVideo from '@/components/learners/watch-course/CourseVideo';
import Header from '@/components/learners/watch-course/Header';

export default function WatchCourse() {
	return (
		<div>
			<Header />

			<div className="flex flex-wrap lg:flex-nowrap mt-8 ">
				<div className="w-full lg:w-8/12 mb-10">
					<CourseVideo />
					<CourseNavigation />
					<CommentSection />
				</div>

				<div className="w-full lg:w-4/12 px-4">
					<CourseMenu />
				</div>
			</div>
		</div>
	);
}
