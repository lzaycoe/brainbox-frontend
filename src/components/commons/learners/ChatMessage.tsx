'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { GrSearch } from 'react-icons/gr';
import { LuPencilLine } from 'react-icons/lu';
import { VscSend } from 'react-icons/vsc';

import { getRelativeTime } from '@/components/learners/message/ChatApp';
import { useChatSocket } from '@/hooks/useChatSocket';
import { useUserMetadata } from '@/hooks/useUserMetadata';
import { Conversation } from '@/schemas/conversation.schema';
import { Message } from '@/schemas/message.schema';

const Header = ({ title }: { title: string }) => (
	<div className="w-full flex justify-between items-center">
		<div className="text-[#1D2026] text-[20px] font-semibold leading-[26px]">
			{title}
		</div>
	</div>
);

const SearchBar = ({
	searchTerm,
	setSearchTerm,
}: {
	searchTerm: string;
	setSearchTerm: (term: string) => void;
}) => (
	<div className="w-full h-[48px] flex items-center border border-[#E9EAF0] rounded-md px-4 mt-4">
		<GrSearch size={22} color="#1D2026" />
		<input
			type="text"
			placeholder="Search"
			className="ml-3 text-[#8C94A3] text-[16px] font-normal outline-none w-full"
			aria-label="Search Messages"
			value={searchTerm}
			onChange={(e) => setSearchTerm(e.target.value)}
		/>
	</div>
);

const CommonMessageItem = ({
	name,
	message,
	time,
	isActive,
	hasNotification,
	onClick,
	avatar,
}: {
	name: string;
	message: string;
	time: string;
	isActive: boolean;
	hasNotification?: boolean;
	onClick: () => void;
	avatar: string;
}) => (
	<button
		className={`p-3 flex items-center gap-4 w-full cursor-pointer transition-colors text-left ${
			isActive ? 'bg-[#FFDDD1]' : 'bg-white'
		}`}
		onClick={onClick}
		aria-label={`Chat with ${name}`}
	>
		<div className="relative w-[48px] h-[48px]">
			<Image
				className="rounded-full"
				src={avatar}
				alt={`Avatar of ${name}`}
				width={48}
				height={48}
			/>
		</div>
		<div className="flex flex-col flex-1 min-w-0">
			<div className="flex justify-between items-center">
				<span className="text-[#1D2026] text-[14px] font-medium">{name}</span>
				<span className="text-[#4E5566] text-[14px] font-normal">
					{getRelativeTime(time) || time}
				</span>
			</div>
			<div className="flex justify-between items-center">
				<span
					className={`text-[14px] max-w-full whitespace-pre-wrap [overflow-wrap:anywhere] line-clamp-1 ${
						hasNotification
							? 'font-bold text-[#1D2026]'
							: 'font-normal text-[#6E7485]'
					}`}
				>
					{message}
				</span>
				{hasNotification && (
					<div className="w-[8px] h-[8px] bg-[#FF6636] rounded-full" />
				)}
			</div>
		</div>
	</button>
);

export interface User {
	id?: number;
	name: string;
	message: string;
	time: string;
	avatar: string;
	hasNotification?: boolean;
}

interface CommonInfoProps {
	title: string;
	messages: User[];
	activeMessage: User | null;
	setActiveMessage: (msg: User) => void;
}

const CommonInfo: React.FC<CommonInfoProps> = ({
	title,
	messages,
	activeMessage,
	setActiveMessage,
}) => {
	const { socket } = useChatSocket();
	const [latestMessages, setLatestMessages] = useState<
		Record<string, { message: string; time: string; absoluteTime: string }>
	>({});
	const [searchTerm, setSearchTerm] = useState('');

	useEffect(() => {
		if (!socket) return;

		const handleNewMessage = (newMessage: Message) => {
			setLatestMessages((prev) => ({
				...prev,
				[newMessage.conversationId]: {
					message: newMessage.content,
					time: getRelativeTime(newMessage.createAt ?? '') ?? '',
					absoluteTime: newMessage.createAt ?? new Date().toISOString(),
				},
			}));
		};

		socket.on('New Message', handleNewMessage);
		return () => {
			socket.off('New Message', handleNewMessage);
		};
	}, [socket]);

	const filteredMessages = messages
		.filter((msg) => msg.name.toLowerCase().includes(searchTerm.toLowerCase()))
		.sort((a, b) => {
			const timeA = a.id
				? latestMessages[a.id]?.absoluteTime || a.time
				: a.time;
			const timeB = b.id
				? latestMessages[b.id]?.absoluteTime || b.time
				: b.time;

			const dateA = new Date(timeA);
			const dateB = new Date(timeB);

			const timestampA = isNaN(dateA.getTime()) ? 0 : dateA.getTime();
			const timestampB = isNaN(dateB.getTime()) ? 0 : dateB.getTime();

			return timestampB - timestampA;
		});

	return (
		<div className="w-[400px] border border-[#E9EAF0] bg-white p-4 flex-shrink-0">
			<Header title={title} />
			<SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
			<div className="flex flex-col w-full mt-4">
				{filteredMessages.length > 0 ? (
					filteredMessages.map((msg) => (
						<CommonMessageItem
							key={msg.name}
							{...msg}
							message={
								msg.id
									? latestMessages[msg.id]?.message || msg.message
									: msg.message
							}
							time={
								msg.id
									? latestMessages[msg.id]?.absoluteTime || msg.time
									: msg.time
							}
							isActive={activeMessage?.name === msg.name}
							onClick={() => setActiveMessage(msg)}
						/>
					))
				) : (
					<div className="text-gray-500 text-center mt-4">
						No conversations yet
					</div>
				)}
			</div>
		</div>
	);
};

export interface ChatMessage {
	sender: string;
	text: string;
	time: string;
}

export interface MessagesData {
	[key: string]: Message[];
}

interface CommonChatProps {
	selectedUser: User | null;
	messagesData: MessagesData;
	conversation: Conversation;
}

const CommonChat: React.FC<CommonChatProps> = ({
	selectedUser,
	messagesData,
	conversation,
}) => {
	const { socket, sendMessage } = useChatSocket();
	const [message, setMessage] = useState('');
	const { userMetadata } = useUserMetadata();
	const userId = userMetadata?.id || 0;
	const [chatMessages, setChatMessages] = useState<Message[]>([]);
	const chatContainerRef = useRef<HTMLDivElement | null>(null);
	const textareaRef = useRef<HTMLTextAreaElement | null>(null);
	const [isAtBottom, setIsAtBottom] = useState(true);

	const generateTempId = () => `temp-${crypto.randomUUID()}`;

	const handleScroll = () => {
		if (!chatContainerRef.current) return;
		const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
		setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
	};

	const scrollToBottom = () => {
		setTimeout(() => {
			chatContainerRef.current?.scrollTo({
				top: chatContainerRef.current.scrollHeight,
				behavior: 'smooth',
			});
		}, 100);
	};

	const updateChatMessages = (newMessage: Message) => {
		setChatMessages((prevMessages) => {
			const exists = prevMessages.some(
				(msg) => msg.tempId === newMessage.tempId,
			);
			if (exists) {
				return prevMessages.map((msg) =>
					msg.tempId === newMessage.tempId ? newMessage : msg,
				);
			}
			return [...prevMessages, newMessage];
		});
	};

	useEffect(() => {
		if (!socket) return;

		const handleNewMessage = (newMessage: Message) => {
			if (selectedUser && newMessage.conversationId === conversation.id) {
				const updatedMessage = {
					...newMessage,
					tempId: newMessage.tempId ?? generateTempId(),
				};
				updateChatMessages(updatedMessage);
			}
		};

		socket.on('New Message', handleNewMessage);

		return () => {
			socket.off('New Message', handleNewMessage);
		};
	}, [selectedUser, conversation.id, socket]);

	useEffect(() => {
		if (selectedUser) {
			const messages = (messagesData[selectedUser.name] || []).map((msg) => ({
				...msg,
				tempId: msg.tempId || generateTempId(),
			}));
			setChatMessages(messages);
			scrollToBottom();
		}
	}, [selectedUser, messagesData]);

	useEffect(() => {
		if (chatMessages.length > 0 && isAtBottom) {
			scrollToBottom();
		}
	}, [chatMessages, isAtBottom]);

	const handleSendMessage = () => {
		if (!selectedUser || message.trim() === '') return;

		const tempId = generateTempId();
		const newMessage: Message = {
			conversationId: conversation.id,
			senderId: userId,
			content: message,
			attachments: [],
			messageType: 'text',
			status: 'sent',
			createAt: new Date().toISOString(),
			tempId,
		};

		setChatMessages((prevMessages) => [...prevMessages, newMessage]);
		sendMessage(
			selectedUser.id || 0,
			conversation.id,
			newMessage.senderId,
			newMessage.content || '',
		);
		setMessage('');
		scrollToBottom();
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter') {
			if (e.shiftKey || e.altKey || e.ctrlKey) {
				setMessage((prev) => prev + '\n');
			} else {
				e.preventDefault();
				handleSendMessage();
			}
		}
	};

	return (
		<div className="w-[900px] h-[578px] bg-white border border-[#E9EAF0] flex flex-col justify-between flex-grow">
			{/* Header */}
			<div className="w-full px-6 py-5 bg-white border-b border-[#E9EAF0] flex justify-between items-center">
				<div className="flex items-center gap-4">
					<Image
						className="rounded-full"
						src={selectedUser?.avatar || '/app/lazyavt.png'}
						alt="Avatar"
						width={48}
						height={48}
					/>
					<div className="flex flex-col">
						<div className="text-lg font-medium text-[#1D2026]">
							{selectedUser?.name || 'Select a chat'}
						</div>
					</div>
				</div>
			</div>

			{/* Chat Messages */}
			<div
				ref={chatContainerRef}
				className="flex flex-col gap-8 py-12 px-6 flex-grow overflow-auto"
				onScroll={handleScroll}
			>
				{selectedUser ? (
					chatMessages.length > 0 ? (
						chatMessages.map((msg) => (
							<div
								key={msg.tempId}
								className={`flex w-full ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}
							>
								{msg.senderId !== userId && (
									<div className="flex items-center mr-2">
										<Image
											className="rounded-full"
											src={selectedUser.avatar}
											alt="Avatar"
											width={32}
											height={32}
										/>
									</div>
								)}
								<div
									className={`flex items-start gap-3 px-3 py-2 rounded-md text-sm w-fit max-w-[60%] bg-[#ffe3d8] text-[#1D2026] ${msg.senderId === userId ? 'self-end' : ''}`}
								>
									<div className="flex flex-col">
										<span className="whitespace-pre-wrap [overflow-wrap:anywhere]">
											{msg.content}
										</span>
										<span
											className={`text-[#7c8190] text-xs mt-3 ${msg.senderId === userId ? 'self-end' : 'self-start'}`}
										>
											{getRelativeTime(msg.createAt ?? '') || msg.createAt}
										</span>
									</div>
								</div>
							</div>
						))
					) : (
						<div className="text-[#6E7485] text-center mt-20">
							No messages yet
						</div>
					)
				) : (
					<div className="text-[#6E7485] text-center mt-20">
						Select a conversation to start chatting
					</div>
				)}
			</div>

			{/* Chat Input */}
			<div className="flex items-center px-6 py-4 border-t border-[#E9EAF0] bg-white">
				<div className="flex items-center w-full min-h-[48px] px-4 border border-[#E9EAF0]">
					<LuPencilLine size={24} className="text-[#FF6636]" />
					<textarea
						ref={textareaRef}
						placeholder="Type your message"
						className="w-full pl-4 text-sm text-[#000000] outline-none resize-none overflow-auto"
						style={{ lineHeight: '20px', maxHeight: '80px' }}
						aria-label="Type your message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						onKeyDown={handleKeyDown}
						rows={1}
					/>
				</div>
				<button
					className="ml-6 flex items-center px-6 py-2 bg-[#FF6636] text-white font-semibold"
					aria-label="Send Message"
					onClick={handleSendMessage}
				>
					Send <VscSend size={24} className="ml-2" />
				</button>
			</div>
		</div>
	);
};

export { CommonInfo, CommonChat };
