export type Course = {
	id: string;
	category: string;
	title: string;
	price: number;
	rating: number;
	students: string;
	image: string;
	categoryColor?: string;
};

export const courses: Course[] = [
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
