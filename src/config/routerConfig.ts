interface RouteConfigEntry {
	title: string;
	dynamic?: boolean;
}

type RouteConfig = Record<string, RouteConfigEntry>;

export const routeConfig: RouteConfig = {
	'/teachers/dashboard': { title: 'Dashboard' },
	'/teachers/settings': { title: 'Settings' },
	'/teachers/courses': { title: 'My courses' },
	'/teachers/create-course': { title: 'Create a new course' },
	'/teachers/courses/[courseId]/sections': {
		title: 'Course Sections',
		dynamic: true,
	},
	'/teachers/courses/[courseId]/sections/[sectionId]/create-lecture': {
		title: 'Create a new lecture',
		dynamic: true,
	},
	'/teachers/earning': { title: 'Earning' },
	'/teachers/message': { title: 'Message' },
};
