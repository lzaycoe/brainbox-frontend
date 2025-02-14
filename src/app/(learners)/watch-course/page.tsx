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
