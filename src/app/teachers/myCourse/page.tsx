import CourseCard from '@/components/teachers/myCourse/CourseCard';
import SearchCategory from '@/components/teachers/myCourse/SearchCategory';

export default function MyCourse() {
	return (
		<div className="flex flex-wrap justify-center p-4">
			<SearchCategory />
			<CourseCard />
		</div>
	);
}
