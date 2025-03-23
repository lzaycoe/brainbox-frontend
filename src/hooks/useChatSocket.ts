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

	const handleCreateConversation = (data: Conversation) => {
		console.log('handleCreateConversation:', data);
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

	const setupSocketListeners = (newSocket: Socket) => {
		newSocket.on('connect', () => console.log('Connected to WebSocket server'));
		newSocket.on('Conversation Created', handleCreateConversation);
		newSocket.on('Get Conversations', handleGetConversations);
		newSocket.on('New Message', handleSendMessage);
		newSocket.on('Message Sent', handleSendMessage);
		newSocket.on('Messages', handleGetMessages);
		newSocket.on('Message Status Updated', handleUpdateMessageStatus);
	};

	const cleanupSocketListeners = (newSocket: Socket) => {
		newSocket.off('Conversation Created', handleCreateConversation);
		newSocket.off('Get Conversations', handleGetConversations);
		newSocket.off('New Message', handleSendMessage);
		newSocket.off('Message Sent', handleSendMessage);
		newSocket.off('Messages', handleGetMessages);
		newSocket.off('Message Status Updated', handleUpdateMessageStatus);
	};

	useEffect(() => {
		const newSocket = io(process.env.NEXT_PUBLIC_API_URL ?? '', {
			query: { userId: String(userId) },
		});

		if (!newSocket) return;

		setupSocketListeners(newSocket);
		setSocket(newSocket);

		return () => {
			newSocket.disconnect();
			cleanupSocketListeners(newSocket);
		};
	}, []);

	const createConversation = (senderId: number, receiveId: number) => {
		socket?.emit(
			'createConversation',
			JSON.stringify({ userAId: senderId, userBId: receiveId }),
		);
	};

	const getConversations = (userId: number) => {
		socket?.emit('getConversations', JSON.stringify({ userId }));
	};

	const sendMessage = (
		receiveId: number,
		conversationId: number,
		senderId: number,
		content: string,
	) => {
		socket?.emit(
			'sendMessage',
			JSON.stringify({
				id: receiveId,
				dto: { senderId, conversationId, content, messageType: 'text' },
			}),
		);
	};

	const getMessages = (conversationId: number) => {
		socket?.emit('getMessages', JSON.stringify({ id: conversationId }));
	};

	const updateMessageStatus = (
		id: number,
		status: 'received' | 'sent' | 'seen',
	) => {
		socket?.emit('updateMessageStatus', { id, dto: { status } });
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
