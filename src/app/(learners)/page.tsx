import { Banner } from '@/components/learners/home/Banner';
import BecomeTeacherSteps from '@/components/learners/home/BecomeTeacherSteps';
import { BrowseCategories } from '@/components/learners/home/BrowseCategories';
import ListCourseCard from '@/components/learners/home/ListCourseCard';
import ListCourseCardLandscape from '@/components/learners/home/ListCourseCardLandscape';
import ListTeacherCard from '@/components/learners/home/ListTeacherCard';

export default function Home() {
	return (
		<div>
			<Banner />
			<BrowseCategories />
			<ListCourseCard />
			<ListCourseCardLandscape />
			<BecomeTeacherSteps />
			<ListTeacherCard />
		</div>
	);
}
