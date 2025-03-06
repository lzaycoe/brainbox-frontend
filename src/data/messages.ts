export interface User {
	name: string;
	message: string;
	time: string;
	avatar: string;
	hasNotification?: boolean;
}

export const messages: User[] = [
	{
		name: 'Mỹ Linh',
		message: 'Yeah sure, tell me Zafor',
		time: 'just now',
		avatar: '/app/teacher/avt1.png',
	},
	{
		name: 'Quốc Chương',
		message: 'Thank you so much, sir',
		time: '2 d',
		avatar: '/app/teacher/avt2.png',
		hasNotification: true,
	},
	{
		name: 'Minh Vương',
		message: 'Are we meeting today?',
		time: '1 h',
		avatar: '/app/teacher/avt3.png',
	},
	{
		name: 'Trọng Nghĩa',
		message: 'I will send the files later.',
		time: '5 h',
		avatar: '/app/lazyavt.png',
	},
	{
		name: 'Mạnh Hùng',
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
	'Mỹ Linh': [
		{
			sender: 'Mỹ Linh',
			text: 'Yeah sure, tell me Zafor',
			time: 'just now',
		},
		{
			sender: 'You',
			text: 'Can you help me with the project?',
			time: '2 min ago',
		},
	],
	'Quốc Chương': [
		{ sender: 'Quốc Chương', text: 'Thank you so much, sir', time: '2 d' },
		{ sender: 'You', text: 'Let’s meet at 5 PM', time: '1 d' },
	],
	'Minh Vương': [
		{ sender: 'Minh Vương', text: 'Are we meeting today?', time: '1 h' },
		{ sender: 'You', text: 'Yes, at 3 PM', time: '30 min ago' },
	],
	'Trọng Nghĩa': [
		{
			sender: 'Trọng Nghĩa',
			text: 'I will send the files later.',
			time: '5 h',
		},
		{ sender: 'You', text: 'Okay, thanks!', time: '4 h' },
	],
	'Mạnh Hùng': [
		{ sender: 'Mạnh Hùng', text: 'See you later', time: '1 h' },
		{ sender: 'You', text: 'Okay, thanks!', time: '1 h' },
	],
};
