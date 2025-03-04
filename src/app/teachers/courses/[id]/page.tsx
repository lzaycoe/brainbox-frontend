'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import Loading from '@/components/commons/Loading';
import { Course } from '@/schemas/course.schema';
// import { Lecture } from '@/schemas/lecture.schema';
import { Section } from '@/schemas/section.schema';
import { getCourse } from '@/services/api/course';
import { getAllLecturesInSection } from '@/services/api/lecture';
import { fetchCourseData } from '@/services/custom/course/fetchCourseData';
import { formatCurrency } from '@/utils/currency';

const CourseDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [course, setCourse] = useState<Course | null>(null);
	const [sections, setSections] = useState<Section[]>([]);
	// const [lectures, setLectures] = useState<Lecture[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;

		const fetchCourse = async () => {
			try {
				const courseData = await getCourse(parseInt(id));
				const { sections } = await fetchCourseData(id);
				console.log('sections:', sections);
				const lecturesPromises = sections.map((section) =>
					getAllLecturesInSection(id, section.id.toString()),
				);
				console.log('lecturesPromises:', lecturesPromises);
				const lecturesResults = await Promise.all(lecturesPromises);
				console.log('Lectures:', lecturesResults);

				setCourse(courseData);
				setSections(sections);
			} catch {
				setError('Failed to fetch course details.');
			} finally {
				setLoading(false);
			}
		};

		fetchCourse();
	}, [id]);

	if (loading) return <Loading />;

	if (error) {
		return <div className="text-center text-red-500 mt-10">{error}</div>;
	}

	if (!course) {
		return (
			<div className="text-center text-gray-500 mt-10">No course found.</div>
		);
	}

	return (
		<div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
			<Image
				src={course.thumbnail}
				alt={course.title}
				width={800}
				height={450}
				className="rounded-lg  shadow-md mx-auto"
			/>

			<h1 className="text-3xl font-bold mt-6">{course.title}</h1>
			<span className="text-sm text-gray-500">{course.subtitle}</span>
			<p className="text-gray-600 mt-2">{course.description}</p>

			<div className="mt-4 flex items-center gap-2">
				<span className="text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-md">
					{course.tag}
				</span>
			</div>
			<p className="text-lg font-semibold mt-4 text-blue-500">
				{formatCurrency(course.salePrice)}
			</p>

			{/* Danh sách Section và Lecture */}
			<div className="mt-6">
				<h2 className="text-2xl font-bold">Course Content</h2>
				{sections.length > 0 ? (
					<div className="mt-4">
						{sections.map((section) => (
							<div key={section.id} className="border-b py-3">
								<h3 className="text-xl font-semibold">{section.title}</h3>
								{/* <ul className="list-disc list-inside text-gray-700 mt-2">
									{section.lecturesDetails.map((lecture) => (
										<li key={lecture.id}>{lecture.title}</li>
									))}
								</ul> */}
							</div>
						))}
					</div>
				) : (
					<p className="text-gray-500 mt-2">No sections available.</p>
				)}
			</div>
		</div>
	);
};

export default CourseDetail;
