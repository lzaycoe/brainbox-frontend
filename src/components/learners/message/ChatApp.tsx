'use client';

import React, { useState } from 'react';

import {
	CommonChat,
	CommonInfo,
} from '@/components/commons/learners/ChatMessage';
import { User, messages, messagesData } from '@/data/messages';

const ChatApp = () => {
	const [activeMessage, setActiveMessage] = useState<User | null>(
		messages.length > 0 ? messages[0] : null,
	);

	return (
		<div className="flex gap-4 mt-8 w-full max-w-7xl mx-auto px-4">
			<CommonInfo
				title="Message"
				messages={messages}
				activeMessage={activeMessage}
				setActiveMessage={setActiveMessage}
			/>
			<CommonChat selectedUser={activeMessage} messagesData={messagesData} />
		</div>
	);
};

export default ChatApp;
