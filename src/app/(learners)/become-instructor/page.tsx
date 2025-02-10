import { Metadata } from 'next';

import InstructorSection from '@/components/learners/becomeATeacher/InstructorSection';
import SectionFive from '@/components/learners/becomeATeacher/SectionFive';
import SectionFour from '@/components/learners/becomeATeacher/SectionFour';
import SectionOne from '@/components/learners/becomeATeacher/SectionOne';
import SectionSix from '@/components/learners/becomeATeacher/SectionSix';
import SectionThree from '@/components/learners/becomeATeacher/SectionThree';
import SectionTwo from '@/components/learners/becomeATeacher/SectionTwo';
import Statistic from '@/components/learners/becomeATeacher/Statistic';

export const metadata: Metadata = {
	title: 'BrainBox | Become Instructor',
};

export default function Home() {
	return (
		<>
			<InstructorSection />
			<Statistic />
			<SectionOne />
			<SectionTwo />
			<SectionThree />
			<SectionFour />
			<SectionFive />
			<SectionSix />
		</>
	);
}
