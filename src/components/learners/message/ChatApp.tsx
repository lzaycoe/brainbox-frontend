'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { GoPlus } from 'react-icons/go';
import { GrSearch } from 'react-icons/gr';
import { LuPencilLine } from 'react-icons/lu';
import { VscSend } from 'react-icons/vsc';

import { User as ImportedUser, messages, messagesData } from '@/data/messages';

const Header = () => (
	<div className="w-full flex justify-between items-center">
		<div className="text-[#1D2026] text-[20px] font-semibold leading-[26px]">
			Message
		</div>
		<button className="px-4 py-2 bg-[#EBEBFF] flex justify-center items-center gap-2 cursor-pointer">
			<GoPlus size={22} color="#564FFD" />
			<div className="text-[#564FFD] text-[14px] font-semibold capitalize">
				Compose
			</div>
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
		/>
	</div>
);

interface MessageItemProps {
	name: string;
	message: string;
	time: string;
	isActive: boolean;
	hasNotification?: boolean;
	onClick: () => void;
	avatar: string;
}
const MessageItem: React.FC<MessageItemProps> = ({
	name,
	message,
	time,
	isActive,
	hasNotification,
	onClick,
	avatar,
}) => (
	<div
		className={`p-3 flex items-center gap-4 w-full cursor-pointer transition-colors ${isActive ? 'bg-[#FFDDD1]' : 'bg-white'}`}
		onClick={onClick}
	>
		<div className="relative w-[48px] h-[48px]">
			<Image
				className="rounded-full"
				src={avatar} // Lấy avatar từ dữ liệu
				alt={name}
				width={48}
				height={48}
			/>
			<div className="w-[10px] h-[10px] absolute right-0 bottom-0 bg-[#23BD33] rounded-full border-2" />
		</div>
		<div className="flex flex-col w-full">
			<div className="flex justify-between items-center">
				<div className="text-[#1D2026] text-[14px] font-medium">{name}</div>
				<div className="text-[#4E5566] text-[14px] font-normal">{time}</div>
			</div>
			<div className="flex justify-between items-center">
				<div
					className={`text-[14px] ${hasNotification ? 'font-bold text-[#1D2026]' : 'font-normal text-[#6E7485]'}`}
				>
					{message}
				</div>

				{hasNotification && (
					<div className="w-[8px] h-[8px] bg-[#FF6636] rounded-full" />
				)}
			</div>
		</div>
	</div>
);

interface InfoProps {
	activeMessage: {
		name: string;
		message: string;
		time: string;
		avatar: string;
		hasNotification?: boolean;
	} | null;
	setActiveMessage: (message: {
		name: string;
		message: string;
		time: string;
		avatar: string;
		hasNotification?: boolean;
	}) => void;
}

const Info: React.FC<InfoProps> = ({ activeMessage, setActiveMessage }) => (
	<div className="w-[400px] border border-[#E9EAF0] bg-white p-4 flex-shrink-0">
		<Header />
		<SearchBar />
		<div className="flex flex-col w-full mt-4">
			{messages.map((msg) => (
				<MessageItem
					key={msg.name}
					{...msg}
					isActive={activeMessage?.name === msg.name}
					onClick={() => setActiveMessage(msg)}
				/>
			))}
		</div>
	</div>
);

interface LocalUser {
	name: string;
	message: string;
	time: string;
	avatar: string;
	hasNotification?: boolean;
}

const Chat: React.FC<{ selectedUser: LocalUser | null }> = ({
	selectedUser,
}) => {
	const chatMessages = selectedUser
		? messagesData[selectedUser.name] || []
		: [];

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
						<div className="text-sm text-[#4E5566]">Active Now</div>
					</div>
				</div>
				<BsThreeDots
					size={36}
					className="text-[#1D2026] p-2 hover:bg-[#E9EAF0] transition-colors"
				/>
			</div>

			{/* Chat Messages */}
			<div className="flex flex-col gap-8 py-12 px-6 flex-grow overflow-auto">
				{selectedUser ? (
					chatMessages.map((msg, index) => (
						<div
							key={index}
							className={`px-3 py-2 rounded-md text-sm w-fit max-w-[60%] ${
								msg.sender === 'You'
									? 'bg-[#FF6636] text-white self-end'
									: 'bg-[#FFEEE8] text-[#1D2026]'
							}`}
						>
							{msg.text}
						</div>
					))
				) : (
					<div className="text-[#6E7485] text-center mt-20">
						Select a conversation to start chatting
					</div>
				)}
			</div>

			{/* Chat Input */}
			<div className="flex items-center px-6 py-4 border-t border-[#E9EAF0] bg-white">
				<div className="flex items-center w-full h-12 px-4 border border-[#E9EAF0]">
					<LuPencilLine size={24} className="text-[#FF6636]" />
					<input
						type="text"
						placeholder="Type your message"
						className="w-full pl-4 text-sm text-[#8C94A3] outline-none"
					/>
				</div>
				<button className="ml-6 flex items-center px-6 py-2 bg-[#FF6636] text-white font-semibold">
					Send <VscSend size={24} className="ml-2" />
				</button>
			</div>
		</div>
	);
};

const ChatApp = () => {
	// Đặt tin nhắn đầu tiên làm mặc định
	const [activeMessage, setActiveMessage] = useState<LocalUser | null>(
		messages.length > 0 ? messages[0] : null,
	);

	return (
		<div className="flex gap-4 mt-8 w-full max-w-7xl mx-auto px-4">
			<Info activeMessage={activeMessage} setActiveMessage={setActiveMessage} />
			<Chat selectedUser={activeMessage} />
		</div>
	);
};

export default ChatApp;
