export interface Progress {
	id: number;
	userId: number;
	courseId: number;
	completedLectures: [number];
	courseProgress: number;
	sectionProgress: JSON;
}
