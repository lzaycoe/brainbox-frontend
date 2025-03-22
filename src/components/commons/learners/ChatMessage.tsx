'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { GoPlus } from 'react-icons/go';
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
		<button
			className="px-4 py-2 bg-[#EBEBFF] flex justify-center items-center gap-2 cursor-pointer"
			aria-label="Compose Message"
		>
			<GoPlus size={22} color="#564FFD" />
			<span className="text-[#564FFD] text-[14px] font-semibold capitalize">
				Compose
			</span>
		</button>
	</div>
);

const SearchBar = () => (
	<div className="w-full h-[48px] flex items-center border border-[#E9EAF0] rounded-md px-4 mt-4">
		<GrSearch size={22} color="#1D2026" />
		<input
			type="text"
			placeholder="Search"
			className="ml-3 text-[#8C94A3] text-[16px] font-normal outline-none w-full"
			aria-label="Search Messages"
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
			<div className="w-[10px] h-[10px] absolute right-0 bottom-0 bg-[#23BD33] rounded-full border-2 border-white" />
		</div>
		<div className="flex flex-col flex-1 min-w-0">
			<div className="flex justify-between items-center">
				<span className="text-[#1D2026] text-[14px] font-medium">{name}</span>
				<span className="text-[#4E5566] text-[14px] font-normal">{time}</span>
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
		Record<string, { message: string; time: string }>
	>({});

	useEffect(() => {
		if (!socket) return;

		const handleNewMessage = (newMessage: Message) => {
			setLatestMessages((prev) => ({
				...prev,
				[newMessage.conversationId]: {
					message: newMessage.content,
					time: getRelativeTime(newMessage.createAt || '') || '',
				},
			}));
		};

		socket.on('New Message', handleNewMessage);

		return () => {
			socket.off('New Message', handleNewMessage);
		};
	}, [socket]);

	return (
		<div className="w-[400px] border border-[#E9EAF0] bg-white p-4 flex-shrink-0">
			<Header title={title} />
			<SearchBar />
			<div className="flex flex-col w-full mt-4">
				{messages.map((msg) => (
					<CommonMessageItem
						key={msg.name}
						{...msg}
						message={
							msg.id
								? latestMessages[msg.id]?.message || msg.message
								: msg.message
						}
						time={msg.id ? latestMessages[msg.id]?.time || msg.time : msg.time}
						isActive={activeMessage?.name === msg.name}
						onClick={() => setActiveMessage(msg)}
					/>
				))}
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
	const hasScrolledToBottom = useRef(false);

	const generateTempId = () => `temp-${Date.now()}-${Math.random()}`;

	const handleScroll = () => {
		if (!chatContainerRef.current) return;
		const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
		setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
	};

	useEffect(() => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = `${textarea.scrollHeight}px`;
		}
	}, [message]);

	useEffect(() => {
		if (selectedUser) {
			const messages = (messagesData[selectedUser.name] || []).map((msg) => ({
				...msg,
				tempId: msg.tempId || generateTempId(),
			}));
			setChatMessages(messages);
		}
	}, [selectedUser, messagesData]);

	useEffect(() => {
		if (chatMessages.length > 0 && !hasScrolledToBottom.current) {
			setTimeout(() => {
				chatContainerRef.current?.scrollTo({
					top: chatContainerRef.current.scrollHeight,
					behavior: 'smooth',
				});
				hasScrolledToBottom.current = true;
			}, 100);
		}
	}, [chatMessages]);

	useEffect(() => {
		if (!socket) return;

		const handleNewMessage = (newMessage: Message) => {
			if (selectedUser && newMessage.conversationId === conversation.id) {
				const updatedMessage = {
					...newMessage,
					tempId: newMessage.tempId || generateTempId(),
				};

				setChatMessages((prevMessages) => {
					const existingMessageIndex = prevMessages.findIndex(
						(msg) => msg.tempId === updatedMessage.tempId,
					);

					if (existingMessageIndex !== -1) {
						const updatedMessages = [...prevMessages];
						updatedMessages[existingMessageIndex] = updatedMessage;
						return updatedMessages;
					}

					return [...prevMessages, updatedMessage];
				});

				if (isAtBottom) {
					setTimeout(() => {
						chatContainerRef.current?.scrollTo({
							top: chatContainerRef.current.scrollHeight,
							behavior: 'smooth',
						});
					}, 100);
				}
			}
		};

		socket.on('New Message', handleNewMessage);

		return () => {
			socket.off('New Message', handleNewMessage);
		};
	}, [selectedUser, conversation.id, socket, isAtBottom]);

	const handleSendMessage = () => {
		if (selectedUser && message.trim() !== '') {
			const tempId = generateTempId();

			const newMessage: Message = {
				conversationId: conversation.id,
				senderId: userId,
				content: message,
				attachments: [],
				messageType: 'text',
				status: 'sent',
				createAt: getRelativeTime(new Date().toISOString()) || '',
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

			setTimeout(() => {
				chatContainerRef.current?.scrollTo({
					top: chatContainerRef.current.scrollHeight,
					behavior: 'smooth',
				});
			}, 100);
		}
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
						<div className="text-sm text-[#4E5566]">Active Now</div>
					</div>
				</div>
				<button
					className="p-2 hover:bg-[#E9EAF0] transition-colors"
					aria-label="More Options"
				>
					<BsThreeDots size={24} className="text-[#1D2026]" />
				</button>
			</div>
			<div
				ref={chatContainerRef}
				className="flex flex-col gap-8 py-12 px-6 flex-grow overflow-auto"
				onScroll={handleScroll}
			>
				{selectedUser ? (
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
								className={`flex items-start gap-3 px-3 py-2 rounded-md text-sm w-fit max-w-[60%] bg-[#ffe3d8] text-[#1D2026] ${
									msg.senderId === userId ? 'self-end' : ''
								}`}
							>
								<div className="flex flex-col">
									<span className="whitespace-pre-wrap [overflow-wrap:anywhere]">
										{msg.content}
									</span>
									<span
										className={`text-[#7c8190] text-xs mt-3 ${
											msg.senderId === userId ? 'self-end' : 'self-start'
										}`}
									>
										{msg.createAt}
									</span>
								</div>
							</div>
						</div>
					))
				) : (
					<div className="text-[#6E7485] text-center mt-20">
						Select a conversation to start chatting
					</div>
				)}
			</div>

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
