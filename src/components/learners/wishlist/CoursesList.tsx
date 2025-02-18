import React from 'react';

const courses = [
	{
		id: 1,
		title: 'The Ultimate Drawing Course - Beginner to Advanced',
		rating: 4.6,
		reviews: 451444,
		instructors: ['Harry Potter', 'John Wick'],
		price: 37.0,
		originalPrice: 49.0,
		image:
			'https://cdn.builder.io/api/v1/image/assets/TEMP/046cc80c8e7991ba4ae2b731134c79369a2ab20114e30b7009b18a4d0cda7314?placeholderIfAbsent=true&apiKey=eb47009d56d84332945ecb583277e964',
	},
	{
		id: 2,
		title: 'Digital Marketing Masterclass - 23 Courses in 1',
		rating: 4.8,
		reviews: 451444,
		instructors: ['Nobody'],
		price: 24.0,
		image:
			'https://cdn.builder.io/api/v1/image/assets/TEMP/2ed990c9886deb957f74cb2819b2a7f84bce92b13c557fe0c7a5e488767a1f6d?placeholderIfAbsent=true&apiKey=eb47009d56d84332945ecb583277e964',
	},
	{
		id: 3,
		title: 'Angular - The Complete Guide (2025 Edition)',
		rating: 4.7,
		reviews: 451444,
		instructors: ['Kevin Gilbert'],
		price: 13.0,
		image:
			'https://cdn.builder.io/api/v1/image/assets/TEMP/b9c5e3dd05dce3da0083d62f3c71cb63f657eea9bac3ac013d23acc3d8dba420?placeholderIfAbsent=true&apiKey=eb47009d56d84332945ecb583277e964',
	},
];

const WishlistHeader = () => (
	<header className="flex justify-between items-center px-6 py-5 bg-white border-b border-gray-200 text-sm font-medium text-black uppercase w-full">
		<h2 className="flex-1 text-left">Course</h2>
		<h2 className="w-[150px] text-center">Prices</h2>
		<h2 className="w-[250px] text-right">Action</h2>
	</header>
);

interface Course {
	id: number;
	title: string;
	rating: number;
	reviews: number;
	instructors: string[];
	price: number;
	originalPrice?: number;
	image: string;
}

const WishlistItem = ({ course }: { course: Course }) => (
	<article className="flex flex-wrap gap-5 justify-between items-center mt-6 max-w-full w-[1272px]">
		<section className="flex flex-wrap gap-5 items-start self-stretch">
			<img
				src={course.image}
				alt={course.title}
				className="object-contain w-40"
			/>
			<div className="flex flex-col justify-between min-h-[119px] min-w-60 w-[356px]">
				<div>
					<div className="flex gap-1.5 justify-center items-center text-sm">
						<div className="w-5 h-5">★</div>
						<div>
							<span className="font-medium">{course.rating}</span>
							<span> ({course.reviews} Review)</span>
						</div>
					</div>
					<h3 className="mt-2 text-base font-medium">{course.title}</h3>
				</div>
				<p className="flex gap-1.5 mt-6 text-sm">
					<span>Course by:</span> {course.instructors.join(' • ')}
				</p>
			</div>
		</section>
		<div className="flex gap-1 items-center text-xl font-medium">
			<span>${course.price.toFixed(2)}</span>
			{course.originalPrice && (
				<span className="text-lg line-through">
					${course.originalPrice.toFixed(2)}
				</span>
			)}
		</div>
		<WishlistActions />
	</article>
);

const WishlistActions = () => (
	<div className="flex gap-3 items-start">
		<button className="px-6 w-44 text-base font-semibold bg-slate-100">
			Buy Now
		</button>
		<button className="px-6 w-44 text-base font-semibold bg-orange-500">
			Add to Cart
		</button>
		<button className="p-3 w-12 h-12 bg-rose-100">❤️</button>
	</div>
);

const CoursesList = () => (
	<div>
		<h1 className="text-2xl font-semibold mt-8">
			Wishlist <span className="font-normal">({courses.length})</span>
		</h1>
		<section className="flex flex-col justify-center items-center pb-6 mt-6 bg-white border border-gray-100">
			<WishlistHeader />
			{courses.map((course) => (
				<>
					<WishlistItem key={course.id} course={course} />
					<hr className="mt-6 w-[1240px] border-gray-200" />
				</>
			))}
		</section>
	</div>
);

export default CoursesList;
