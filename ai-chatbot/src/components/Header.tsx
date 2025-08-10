'use client';

import React from 'react';
import { useChat } from '@/context/ChatContext';

export default function Header() {
  const { clearChat } = useChat();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Advanced AI Chatbot</h1>
        <button
          onClick={clearChat}
          className="px-3 py-1 text-sm rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          New Chat
        </button>
      </div>
    </header>
  );
}