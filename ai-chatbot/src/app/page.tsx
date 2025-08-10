import Header from '@/components/Header';
import ChatWindow from '@/components/ChatWindow';
import ChatInput from '@/components/ChatInput';

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-1 overflow-hidden flex flex-col">
        <ChatWindow />
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}
