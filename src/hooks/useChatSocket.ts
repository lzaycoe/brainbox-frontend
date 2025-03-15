'use client';

import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

import { ConversationData } from '@/schemas/conversation.schema';
import { MessageData } from '@/schemas/message.schema';

export const useChatSocket = () => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messages, setMessages] = useState<MessageData[]>([]);
	const [conversations, setConversations] = useState<ConversationData[]>([]);

	useEffect(() => {
		const newSocket = io(process.env.NEXT_PUBLIC_API_URL!);

		newSocket.on('connect', () => console.log('Connected to WebSocket server'));

		newSocket.on('createConversation', (data: ConversationData) => {
			setConversations((prev) => [...prev, data]);
		});

		newSocket.on('getConversations', (data: ConversationData[]) => {
			setConversations(data);
		});

		newSocket.on('sendMessage', (data: MessageData) => {
			setMessages((prev) => [...prev, data]);
		});

		newSocket.on('getMessages', (data: MessageData[]) => {
			setMessages(data);
		});

		newSocket.on(
			'updateMessageStatus',
			(data: { id: number; status: 'received' | 'sent' | 'seen' }) => {
				setMessages((prev) =>
					prev.map((msg) =>
						msg.senderId === data.id ? { ...msg, status: data.status } : msg,
					),
				);
			},
		);

		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
		};
	}, []);

	const createConversation = (senderId: number, receiveId: number) => {
		if (socket) {
			socket.emit('createConversation', { senderId, receiveId });
		}
	};

	const getConversations = (userId: number) => {
		if (socket) {
			socket.emit('getConversations', userId);
		}
	};

	const sendMessage = (
		receiveId: number,
		conversationId: number,
		senderId: number,
		content: string,
	) => {
		if (socket) {
			socket.emit('sendMessage', {
				id: receiveId,
				dto: { senderId, conversationId, content, messageType: 'text' },
			});
		}
	};

	const getMessages = (conversationId: number) => {
		if (socket) {
			socket.emit('getMessages', conversationId);
		}
	};

	const updateMessageStatus = (
		id: number,
		status: 'received' | 'sent' | 'seen',
	) => {
		if (socket) {
			socket.emit('updateMessageStatus', { id, dto: { status } });
		}
	};

	return {
		socket,
		messages,
		conversations,
		createConversation,
		getConversations,
		sendMessage,
		getMessages,
		updateMessageStatus,
	};
};
