'use client';

import { createContext, useContext } from 'react';

import { useChatSocket } from '@/hooks/useChatSocket';
import { ConversationData } from '@/schemas/conversation.schema';
import { MessageData } from '@/schemas/message.schema';

interface ChatContextType {
	conversations: ConversationData[];
	messages: MessageData[];
	sendMessage: (
		receiveId: number,
		conversationId: number,
		senderId: number,
		content: string,
	) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
	const chatData = useChatSocket();
	return (
		<ChatContext.Provider value={chatData}>{children}</ChatContext.Provider>
	);
};

export const useChat = (): ChatContextType => {
	const context = useContext(ChatContext);
	if (!context) {
		throw new Error('useChat must be used within a ChatProvider');
	}
	return context;
};
