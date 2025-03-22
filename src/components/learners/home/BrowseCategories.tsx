'use client';

import { useRouter } from 'next/navigation';
import React, { JSX, useEffect, useState } from 'react';
import { PiArrowRight } from 'react-icons/pi';

import Loading from '@/components/commons/Loading';
import { Button } from '@/components/ui/button';
import { getCategoryConfig } from '@/config/categoryConfig';
import { getCourses } from '@/services/api/course';

import CategoryCard from './CatergoryCard';

export const BrowseCategories = () => {
	const router = useRouter();
	const [categories, setCategories] = useState<
		{
			id: number;
			icon: JSX.Element;
			title: string;
			courseCount: number;
			bgColor: string;
			iconColor: string;
		}[]
	>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchCourses = async () => {
			setLoading(true);
			try {
				const courses = await getCourses();
				const categoryCounts: Record<string, number> = {};

				courses.forEach((course) => {
					const category = course.tag;
					if (category) {
						categoryCounts[category] = (categoryCounts[category] || 0) + 1;
					}
				});

				const categoryData = Object.keys(categoryCounts)
					.map((category, index) => {
						const {
							icon: Icon,
							bgColor,
							iconColor,
						} = getCategoryConfig(category);
						return {
							id: index + 1,
							icon: <Icon className="icon-class" />,
							title: category,
							courseCount: categoryCounts[category],
							bgColor,
							iconColor: iconColor,
						};
					})
					.sort((a, b) => b.courseCount - a.courseCount);

				setCategories(categoryData);
			} catch (error) {
				console.error('Failed to fetch courses:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchCourses();
	}, []);

	return (
		<section
			className="flex flex-col justify-center items-center px-72 py-20 max-md:px-5"
			aria-labelledby="browse-categories-title"
		>
			<h2
				id="browse-categories-title"
				className="text-4xl font-semibold tracking-tight leading-tight text-neutral-800"
			>
				Browse top category
			</h2>
			<div className="flex flex-col mt-10 max-md:max-w-full">
				{loading ? (
					<Loading />
				) : (
					<div className="grid grid-cols-4 gap-6 max-md:grid-cols-1">
						{categories.map((category) => (
							<CategoryCard
								key={category.id}
								icon={category.icon}
								title={category.title}
								courseCount={category.courseCount}
								bgColor={category.bgColor}
								iconColor={category.iconColor}
							/>
						))}
					</div>
				)}
			</div>
			<div className="flex gap-3 items-center mt-10 text-sm tracking-normal text-center">
				<p className="self-stretch my-auto leading-loose text-gray-600">
					We have more category & subcategory.
				</p>
				<Button
					className="flex gap-2 justify-center items-center self-stretch py-1 my-auto font-medium leading-none text-orange-500 bg-white hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-500"
					aria-label="Browse all categories"
					onClick={() => router.push('/category')}
				>
					<span className="self-stretch my-auto">Browse All</span>
					<PiArrowRight
						className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
						width={24}
						height={24}
					/>
				</Button>
			</div>
		</section>
	);
};
