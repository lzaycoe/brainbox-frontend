import CourseDetailsPage from '@/components/learners/courses/course/course-detail/CourseDetail';

export default function CoursePage({
	params,
}: Readonly<{ params: { id: string } }>) {
	return (
		<div>
			<CourseDetailsPage courseId={params.id} />
		</div>
	);
}
