'use client';

import React from 'react';

import ListTeacherByCategory from '@/components/learners/category/ListTeacherByCategory';
import CourseComponent from '@/components/learners/course-list/Course';
import ListCourseCard from '@/components/learners/home/ListCourseCard';

const CategoryPage = () => {
	return (
		<main className="flex flex-col gap-10 py-10">
			<div>
				<ListCourseCard />
			</div>
			<div>
				<ListTeacherByCategory />
			</div>
			<div>
				<h2 className="text-3xl font-semibold text-center mb-8">
					All Courses in Software Engineering
				</h2>
				<CourseComponent initialCourses={null} />
			</div>
		</main>
	);
};

export default CategoryPage;
