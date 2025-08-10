'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '@/utils/perplexity';

// Import SyntaxHighlighter using dynamic import to avoid SSR issues
import dynamic from 'next/dynamic';

const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then((mod) => mod.Prism),
  { ssr: false }
);

const CodeBlock = dynamic(
  async () => {
    const { vscDarkPlus } = await import('react-syntax-highlighter/dist/cjs/styles/prism');
    
    return ({ language, value }: { language: string; value: string }) => {
      return (
        <SyntaxHighlighter language={language} style={vscDarkPlus} PreTag="div">
          {value}
        </SyntaxHighlighter>
      );
    };
  },
  { ssr: false }
);

interface MessageItemProps {
  message: Message;
}

export default function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
        }`}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap">{message.content}</div>
        ) : (
          <div className="prose dark:prose-invert max-w-none">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  if (inline) {
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                  
                  const language = match ? match[1] : '';
                  const value = String(children).replace(/\n$/, '');
                  
                  return (
                    <CodeBlock language={language} value={value} />
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}