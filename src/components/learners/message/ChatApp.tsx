'use client';

import React, { useEffect, useState } from 'react';

import Loading from '@/components/commons/Loading';
import {
	CommonChat,
	CommonInfo,
	User,
} from '@/components/commons/learners/ChatMessage';
import { messagesData } from '@/data/messages';
import { useChatSocket } from '@/hooks/useChatSocket';
import { useUserMetadata } from '@/hooks/useUserMetadata';
import { getUserClerk } from '@/services/api/user';

const ChatApp = () => {
	const { conversations, getConversations } = useChatSocket();
	const [friends, setFriends] = useState<User[]>([]);
	const [activeMessage, setActiveMessage] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true); // Thêm state loading

	const { userMetadata } = useUserMetadata();
	const userId = userMetadata?.id || 0;
	console.log('userId:', userId);

	useEffect(() => {
		console.log('Getting conversations...');
		getConversations(userId);
	}, [userId]);

	useEffect(() => {
		if (conversations.length > 0) {
			const fetchFriends = async (userIds: number[]) => {
				try {
					const users = await Promise.all(
						userIds.map((id) => getUserClerk(id)),
					);
					const formattedFriends = users.map(
						({ imageUrl, firstName, lastName }) => ({
							name: `${firstName || ''} ${lastName || ''}`.trim(),
							avatar: imageUrl || '/default-avatar.png',
							message: 'Hello!',
							time: 'Just now',
							hasNotification: false,
						}),
					);
					console.log('formattedFriends:', formattedFriends);

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
					conversations
						.map((conv) =>
							conv.userAId === userId
								? conv.userBId
								: conv.userBId === userId
									? conv.userAId
									: null,
						)
						.filter((id) => id !== null),
				),
			);

			if (friendIds.length > 0) {
				fetchFriends(friendIds);
			} else {
				setIsLoading(false);
			}
		}
	}, [conversations]);

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
				<div className="flex justify-center items-center w-full h-96">
					<p className="text-gray-500">Loading chat...</p>
				</div>
			) : (
				<>
					<CommonInfo
						title="Message"
						messages={friends}
						activeMessage={activeMessage}
						setActiveMessage={setActiveMessage}
					/>
					<CommonChat
						selectedUser={activeMessage}
						messagesData={messagesData}
					/>
				</>
			)}
		</div>
	);
};

export default ChatApp;
