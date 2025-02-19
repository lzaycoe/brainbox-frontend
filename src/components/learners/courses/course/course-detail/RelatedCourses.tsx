import { ArrowRightIcon, StarIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

type Course = {
	id: string;
	category: string;
	title: string;
	price: number;
	rating: number;
	students: string;
	image: string;
	categoryColor?: string;
};

const courses: Course[] = [
	{
		id: '1',
		category: 'DESIGN',
		title: 'Machine Learning A-Z™: Hands-On Python & R In Data...',
		price: 57,
		rating: 5.0,
		students: '265.7K',
		image: '/app/course/course01.png',
		categoryColor: 'text-orange-500',
	},
	{
		id: '2',
		category: 'DEVELOPMENTS',
		title: 'The Complete 2021 Web Development Bootcamp',
		price: 57,
		rating: 5.0,
		students: '265.7K',
		image: '/app/course/course02.png',
		categoryColor: 'text-blue-500',
	},
	{
		id: '3',
		category: 'BUSINESS',
		title: 'Learn Python Programming Masterclass',
		price: 57,
		rating: 5.0,
		students: '265.7K',
		image: '/app/course/course03.png',
		categoryColor: 'text-green-500',
	},
	{
		id: '4',
		category: 'MARKETING',
		title: 'The Complete Digital Marketing Course - 12 Courses in 1',
		price: 57,
		rating: 5.0,
		students: '265.7K',
		image: '/app/course/course04.png',
		categoryColor: 'text-purple-500',
	},
	{
		id: '5',
		category: 'PLACEHOLDER',
		title: 'Reiki Level I, II and Master/Teacher Program',
		price: 57,
		rating: 5.0,
		students: '265.7K',
		image: '/app/teacher/course01.png',
		categoryColor: 'text-gray-500',
	},
];

const CourseCard = ({ course }: { course: Course }) => (
	<div className="flex flex-col">
		<div className="relative aspect-[4/3] w-full">
			<Image
				src={course.image}
				alt={course.title}
				fill
				className="object-cover rounded-lg"
			/>
		</div>
		<div className="mt-3">
			<div className="flex justify-between items-center">
				<span className={`text-xs uppercase ${course.categoryColor}`}>
					{course.category}
				</span>
				<span className="text-sm font-medium">${course.price}</span>
			</div>
			<h3 className="mt-2 text-sm font-medium line-clamp-2">{course.title}</h3>
			<div className="flex items-center gap-1 mt-2">
				<div className="flex items-center">
					<StarIcon className="w-4 h-4 text-yellow-400" />
					<span className="ml-1 text-sm">{course.rating.toFixed(1)}</span>
				</div>
				<span className="text-sm text-gray-500">
					{course.students} students
				</span>
			</div>
		</div>
	</div>
);

export default function RelatedCourses() {
	return (
		<section className="mt-12 mb-8">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-medium">Related Courses</h2>
				<button className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors">
					View All
					<ArrowRightIcon className="w-4 h-4" />
				</button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
				{courses.map((course) => (
					<CourseCard key={course.id} course={course} />
				))}
			</div>
		</section>
	);
}
