import { FaArrowRight } from 'react-icons/fa';

import CourseCard from '@/components/commons/CourseCard';
import { courses } from '@/data/CourseData';

export default function RelatedCourses() {
	return (
		<section className="mt-12 mb-8">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-medium">Related Courses</h2>
				<button className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors">
					View All
					<FaArrowRight className="w-4 h-4" />
				</button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
				{courses.map((course) => (
					<CourseCard
						key={course.id}
						imageUrl={course.imageUrl ?? ''}
						category={course.category ?? ''}
						categoryBgColor={course.categoryBgColor ?? ''}
						categoryTextColor={course.categoryTextColor ?? ''}
						price={course.price ? course.price.toString() : ''}
						title={course.title ?? ''}
						rating={course.rating ? course.rating.toString() : ''}
						students={course.students ? course.students.toString() : ''}
					/>
				))}
			</div>
		</section>
	);
}
