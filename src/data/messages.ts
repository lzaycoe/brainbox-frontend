export interface User {
	name: string;
	message: string;
	time: string;
	avatar: string;
	hasNotification?: boolean;
}

export const messages: User[] = [
	{
		name: 'Jane Cooper',
		message: 'Yeah sure, tell me Zafor',
		time: 'just now',
		avatar: '/app/teacher/avt1.png',
	},
	{
		name: 'Jenny Wilson',
		message: 'Thank you so much, sir',
		time: '2 d',
		avatar: '/app/teacher/avt2.png',
		hasNotification: true,
	},
	{
		name: 'Cody Fisher',
		message: 'Are we meeting today?',
		time: '1 h',
		avatar: '/app/teacher/avt3.png',
	},
	{
		name: 'Robert Fox',
		message: 'I will send the files later.',
		time: '5 h',
		avatar: '/app/lazyavt.png',
		hasNotification: true,
	},
];

interface MessagesData {
	[key: string]: { sender: string; text: string; time: string }[];
}

export const messagesData: MessagesData = {
	'Jane Cooper': [
		{
			sender: 'Jane Cooper',
			text: 'Yeah sure, tell me Zafor',
			time: 'just now',
		},
		{
			sender: 'You',
			text: 'Can you help me with the project?',
			time: '2 min ago',
		},
	],
	'Jenny Wilson': [
		{ sender: 'Jenny Wilson', text: 'Thank you so much, sir', time: '2 d' },
		{ sender: 'You', text: 'Let’s meet at 5 PM', time: '1 d' },
	],
	'Cody Fisher': [
		{ sender: 'Cody Fisher', text: 'Are we meeting today?', time: '1 h' },
		{ sender: 'You', text: 'Yes, at 3 PM', time: '30 min ago' },
	],
	'Robert Fox': [
		{ sender: 'Robert Fox', text: 'I will send the files later.', time: '5 h' },
		{ sender: 'You', text: 'Okay, thanks!', time: '4 h' },
	],
};
