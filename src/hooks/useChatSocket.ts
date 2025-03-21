'use client';

import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

import { Conversation } from '@/schemas/conversation.schema';
import { Message, MessageData } from '@/schemas/message.schema';

export const useChatSocket = () => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const [messages, setMessages] = useState<MessageData[]>([]);
	const [conversations, setConversations] = useState<Conversation[]>([]);

	const userId = 1;

	useEffect(() => {
		const newSocket = io(process.env.NEXT_PUBLIC_API_URL!, {
			query: { userId: String(userId) },
		});

		if (!newSocket) return;

		newSocket.on('connect', () => console.log('Connected to WebSocket server'));

		const handleCreateConversation = (data: Conversation) => {
			setConversations((prev) => [...prev, data]);
		};

		const handleGetConversations = (data: Conversation[]) => {
			setConversations(data);
		};

		const handleSendMessage = (data: MessageData) => {
			setMessages((prev) => [...prev, data]);
		};

		const handleGetMessages = (data: Message[]) => {
			setMessages(data);
		};

		const handleUpdateMessageStatus = (data: {
			id: number;
			status: 'received' | 'sent' | 'seen';
		}) => {
			setMessages((prev) =>
				prev.map((msg) =>
					msg.senderId === data.id ? { ...msg, status: data.status } : msg,
				),
			);
		};

		newSocket.on('Conversation Created', handleCreateConversation);
		newSocket.on('Get Conversations', handleGetConversations);
		newSocket.on('New Message', handleSendMessage);
		newSocket.on('Message Sent', handleSendMessage);
		newSocket.on('Messages', handleGetMessages);
		newSocket.on('Message Status Updated', handleUpdateMessageStatus);

		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
			newSocket.off('Conversation Created', handleCreateConversation);
			newSocket.off('Get Conversations', handleGetConversations);
			newSocket.off('New Message', handleSendMessage);
			newSocket.off('Message Sent', handleSendMessage);
			newSocket.off('Messages', handleGetMessages);
			newSocket.off('Message Status Updated', handleUpdateMessageStatus);
		};
	}, []);

	const createConversation = (senderId: number, receiveId: number) => {
		if (socket) {
			console.log('createConversation:', senderId, receiveId);
			socket.emit('createConversation', { senderId, receiveId });
		}
	};

	const getConversations = (userId: number) => {
		if (socket) {
			const payload = JSON.stringify({ userId });
			socket.emit('getConversations', payload);
		}
	};

	const sendMessage = (
		receiveId: number,
		conversationId: number,
		senderId: number,
		content: string,
	) => {
		if (socket) {
			console.log('sendMessage:', receiveId, conversationId, senderId, content);
			socket.emit(
				'sendMessage',
				JSON.stringify({
					id: receiveId,
					dto: { senderId, conversationId, content, messageType: 'text' },
				}),
			);
		}
	};

	const getMessages = (conversationId: number) => {
		if (socket) {
			const payload = JSON.stringify({ id: conversationId });
			console.log('getMessages:', payload);
			socket.emit('getMessages', payload);
		}
	};

	const updateMessageStatus = (
		id: number,
		status: 'received' | 'sent' | 'seen',
	) => {
		if (socket) {
			console.log('updateMessageStatus:', id, status);
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
