import CourseCard from '@/components/teachers/my-course/CourseCard';
import SearchCategory from '@/components/teachers/my-course/SearchCategory';

export default function MyCourse() {
	return (
		<div className="flex flex-wrap justify-center p-4">
			<SearchCategory />
			<CourseCard />
		</div>
	);
}
