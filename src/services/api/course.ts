export const createCourse = async (courseData: Record<string, unknown>) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ...courseData, status: 'pending', teacherId: 1 }),
	});

	if (!response.ok) {
		throw new Error('Failed to create course');
	}

	return response.json();
};
