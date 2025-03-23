'use client';

import React, { useEffect, useState } from 'react';

import Loading from '@/components/commons/Loading';
import {
	CommonChat,
	CommonInfo,
	User,
} from '@/components/commons/learners/ChatMessage';
import { useChatSocket } from '@/hooks/useChatSocket';
import { useUserMetadata } from '@/hooks/useUserMetadata';
import { Message } from '@/schemas/message.schema';
import { getUserClerk } from '@/services/api/user';

export function getRelativeTime(timestamp: string | undefined): string {
	if (!timestamp) return ' ';
	const now = new Date();
	const messageTime = new Date(timestamp);
	const diff = Math.floor((now.getTime() - messageTime.getTime()) / 1000);

	if (diff < 60) return 'Just now';
	if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
	if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
	return `${Math.floor(diff / 86400)}d ago`;
}

function formatMessages(messages: Message[], partnerName: string) {
	const messagesData: Record<string, Message[]> = {};

	messages.forEach((msg) => {
		if (!messagesData[partnerName]) {
			messagesData[partnerName] = [];
		}

		messagesData[partnerName].push({
			...msg,
			createAt: msg.createAt ?? '',
			content: msg.content ?? '',
		});
	});

	return messagesData;
}

const ChatApp = () => {
	const { messages, getMessages, conversations, getConversations, socket } =
		useChatSocket();
	const [friends, setFriends] = useState<User[]>([]);
	const [activeMessage, setActiveMessage] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const { userMetadata } = useUserMetadata();
	const userId = userMetadata?.id ?? 0;

	const fetchFriends = async (userIds: number[]) => {
		try {
			const users = await Promise.all(
				userIds.map(async (id) => {
					const user = await getUserClerk(id);
					return { ...user, id };
				}),
			);

			const formattedFriends = users.map(
				({ id, imageUrl, firstName, lastName }) => {
					const conversation = conversations.find(
						(conv) => conv.userAId === id || conv.userBId === id,
					);
					const latestMessage = conversation?.messages?.at(-1);
					const isOwnMessage = latestMessage?.senderId === userId;
					let messageText = 'No messages yet';

					if (latestMessage) {
						messageText = isOwnMessage
							? `You: ${latestMessage.content || ''}`
							: latestMessage.content || '';
					}

					return {
						id,
						name: `${firstName ?? ''} ${lastName ?? ''}`.trim(),
						avatar: imageUrl ?? '',
						message: messageText,
						time: latestMessage?.createAt ?? '',
						hasNotification: false,
					};
				},
			);

			setFriends(formattedFriends);
			setActiveMessage(formattedFriends[0] ?? null);
		} catch (error) {
			console.error('Failed to fetch friends:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const updateFriendsList = (newMessage: Message) => {
		const conversation = conversations.find(
			(conv) => conv.id === newMessage.conversationId,
		);
		if (!conversation) return;

		const friendId =
			conversation.userAId === userId
				? conversation.userBId
				: conversation.userAId;
		const isOwnMessage = newMessage.senderId === userId;

		setFriends((prevFriends) =>
			prevFriends
				.map((friend) =>
					friend.id === friendId
						? {
								...friend,
								message: isOwnMessage
									? `You: ${newMessage.content ?? ''}`
									: (newMessage.content ?? ''),
								time: newMessage.createAt ?? '',
								hasNotification: !isOwnMessage,
							}
						: friend,
				)
				.sort(
					(a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
				),
		);
	};

	const handleNewMessage = (newMessage: Message) => {
		updateFriendsList(newMessage);
	};

	useEffect(() => {
		getConversations(userId);
	}, [userId]);

	useEffect(() => {
		if (conversations.length === 0) {
			setIsLoading(false);
			return;
		}

		const friendIds = Array.from(
			new Set(
				conversations.map((conv) =>
					conv.userAId === userId ? conv.userBId : conv.userAId,
				),
			),
		);

		if (friendIds.length > 0) {
			fetchFriends(friendIds);
		} else {
			setIsLoading(false);
		}
	}, [conversations, userId]);

	useEffect(() => {
		if (!socket) return;
		socket.on('New Message', handleNewMessage);
		return () => {
			socket.off('New Message', handleNewMessage);
		};
	}, [socket, conversations, userId]);

	const selectedConversation = conversations.find(
		(conv) =>
			(conv.userAId === activeMessage?.id && conv.userBId === userId) ||
			(conv.userBId === activeMessage?.id && conv.userAId === userId),
	);

	useEffect(() => {
		if (selectedConversation?.id) {
			getMessages(selectedConversation.id);
		}
	}, [selectedConversation?.id, getMessages]);

	const messagesData = formatMessages(messages, activeMessage?.name ?? '');

	if (isLoading) {
		return (
			<div className="mt-6">
				<Loading />
			</div>
		);
	}

	return (
		<div className="flex gap-4 mt-8 w-full max-w-7xl mx-auto px-4">
			{isLoading ? (
				<div className="mt-6">
					<Loading />
				</div>
			) : (
				<>
					<CommonInfo
						title="Message"
						messages={friends}
						activeMessage={activeMessage}
						setActiveMessage={setActiveMessage}
					/>
					{selectedConversation && (
						<CommonChat
							selectedUser={activeMessage}
							messagesData={messagesData}
							conversation={selectedConversation}
						/>
					)}
				</>
			)}
		</div>
	);
};

export default ChatApp;
