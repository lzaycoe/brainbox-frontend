import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

import { ConversationData } from '@/schemas/conversation.schema';
import { MessageData } from '@/schemas/message.schema';

export const useChatSocket = () => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messages, setMessages] = useState<MessageData[]>([]);
	const [conversations, setConversations] = useState<ConversationData[]>([]);

	useEffect(() => {
		const newSocket = io(process.env.NEXT_PUBLIC_API_URL);

		newSocket.on('connect', () => {
			console.log('Connected to WebSocket server');
		});

		newSocket.on('conversationCreated', (data) => {
			setConversations((prev) => [...prev, data]);
		});

		newSocket.on('newMessage', (data) => {
			setMessages((prev) => [...prev, data]);
		});

		newSocket.on('messages', (data) => {
			setMessages(data);
		});

		newSocket.on('messageStatusUpdated', (data) => {
			setMessages((prev) =>
				prev.map((msg) =>
					msg.senderId === data.id ? { ...msg, status: data.status } : msg,
				),
			);
		});

		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
		};
	}, []);

	const sendMessage = (
		receiveId: number,
		conversationId: number,
		senderId: number,
		content: string,
	) => {
		if (socket) {
			socket.emit('sendMessage', {
				id: receiveId,
				dto: {
					senderId,
					conversationId,
					content,
					messageType: 'text',
				},
			});
		}
	};

	return { socket, messages, conversations, sendMessage };
};
