'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Message, getPerplexityCompletion } from '@/utils/perplexity';

interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: `You are an advanced AI assistant that is highly skilled in Python programming and can work on any project. 
      You provide clear, detailed explanations from A to Z for any prompt. You are fast, accurate, and extremely helpful.
      You excel at solving complex problems and can provide complete solutions for any task.
      Always provide the most comprehensive and useful response possible.`
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    try {
      // Add user message
      const userMessage: Message = { role: 'user', content };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setIsLoading(true);

      // Get AI response
      const aiResponse = await getPerplexityCompletion(updatedMessages);
      
      // Add AI response to messages
      setMessages([...updatedMessages, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      console.error('Error sending message:', error);
      // Add error message
      setMessages([
        ...messages,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'system',
        content: `You are an advanced AI assistant that is highly skilled in Python programming and can work on any project. 
        You provide clear, detailed explanations from A to Z for any prompt. You are fast, accurate, and extremely helpful.
        You excel at solving complex problems and can provide complete solutions for any task.
        Always provide the most comprehensive and useful response possible.`
      }
    ]);
  };

  return (
    <ChatContext.Provider value={{ messages, isLoading, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}