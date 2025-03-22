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

export function getRelativeTime(timestamp: string): string {
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

	messages.forEach((msg: Message) => {
		if (!messagesData[partnerName]) {
			messagesData[partnerName] = [];
		}

		messagesData[partnerName].push({
			id: msg.id,
			createAt: msg.createAt ? getRelativeTime(msg.createAt) : '',
			senderId: msg.senderId,
			content: msg.content || '',
			status: msg.status,
			conversationId: msg.conversationId,
			messageType: msg.messageType,
			attachments: msg.attachments,
		});
	});

	return messagesData;
}

const ChatApp = () => {
	const { messages, getMessages, conversations, getConversations } =
		useChatSocket();
	const [friends, setFriends] = useState<User[]>([]);
	const [activeMessage, setActiveMessage] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const { userMetadata } = useUserMetadata();
	const userId = userMetadata?.id || 0;

	useEffect(() => {
		getConversations(userId);
	}, [userId]);

	useEffect(() => {
		if (conversations.length > 0) {
			const fetchFriends = async (userIds: number[]) => {
				try {
					const users = await Promise.all(
						userIds.map((id) =>
							getUserClerk(id).then((user) => ({ ...user, id })),
						),
					);

					const formattedFriends = users.map(
						({ id, imageUrl, firstName, lastName }) => {
							const conversation = conversations.find(
								(conv) => conv.userAId === id || conv.userBId === id,
							);
							const latestMessage =
								conversation?.messages?.[conversation.messages.length - 1];
							const isOwnMessage = latestMessage?.senderId === userId;
							const messageText = latestMessage
								? isOwnMessage
									? `You: ${latestMessage.content}`
									: latestMessage.content
								: 'No messages yet';

							return {
								id,
								name: `${firstName || ''} ${lastName || ''}`.trim(),
								avatar: imageUrl || '',
								message: messageText || '',
								time: latestMessage?.createAt
									? getRelativeTime(latestMessage.createAt)
									: '',
								hasNotification: false,
							};
						},
					);

					setFriends(formattedFriends);
					setActiveMessage(formattedFriends[0]);
				} catch (error) {
					console.error('Failed to fetch friends:', error);
				} finally {
					setIsLoading(false);
				}
			};

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
		} else {
			setIsLoading(false);
		}
	}, [conversations]);

	const selectedConversation = conversations.find(
		(conv) =>
			(conv.userAId === activeMessage?.id && conv.userBId === userId) ||
			(conv.userBId === activeMessage?.id && conv.userAId === userId),
	);

	useEffect(() => {
		if (!selectedConversation?.id) {
			return;
		}
		getMessages(selectedConversation.id);
	}, [selectedConversation?.id, getMessages]);

	console.log('messages: ', messages);

	const messagesData = formatMessages(messages, activeMessage?.name || '');

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
