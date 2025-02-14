import { Banner } from '@/components/home/Banner';
import BecomeTeacherSteps from '@/components/home/BecomeTeacherSteps';
import { BrowseCategories } from '@/components/home/BrowseCategories';
import ListCourseCard from '@/components/home/ListCourseCard';
import ListCourseCardLandscape from '@/components/home/ListCourseCardLandscape';
import ListTeacherCard from '@/components/home/ListTeacherCard';

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
