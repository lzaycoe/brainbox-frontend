'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { CourseData } from '@/schemas/course.schema';
import { getCourse } from '@/services/api/course';

const CourseDetail: React.FC = () => {
	const [course, setCourse] = useState<CourseData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		if (id) {
			const fetchCourse = async () => {
				try {
					const courseData = await getCourse(parseInt(id));
					setCourse(courseData);
				} catch {
					setError('Failed to fetch course details.');
				} finally {
					setLoading(false);
				}
			};

			fetchCourse();
		}
	}, [id]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			{course ? (
				<div>
					<h1>{course.title}</h1>
					<p>{course.description}</p>
					<p>Subtitle: {course.subtitle}</p>
					<p>Category: {course.tag}</p>
					<p>Original Price: ${course.originPrice}</p>
					<Image
						src={course.thumbnail}
						alt={course.title}
						width={500}
						height={300}
					/>
				</div>
			) : (
				<div>No course found.</div>
			)}
		</div>
	);
};

export default CourseDetail;
