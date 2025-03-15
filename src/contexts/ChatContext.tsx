import { createContext, useContext } from 'react';

import { useChatSocket } from '@/hooks/useChatSocket';
import { MessageData } from '@/schemas/message.schema';

interface ChatContextType {
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

export const useChat = () => useContext(ChatContext);
