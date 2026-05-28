import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useChat } from '../hooks/useChat';
import { useAuthStore } from '../../auth/store/authStore';

const ChatPanel = () => {
  const { classroomId } = useParams({ from: '/_protected/tsx/classroom/$classroomId/' });
  const { messages, isLoading, error, sendMessage, isSending } = useChat(classroomId);
  const [newMessage, setNewMessage] = useState('');
  const user = useAuthStore((s) => s.user);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    sendMessage(newMessage.trim());
    setNewMessage('');
  };

  if (isLoading) return <p className="text-white/60">تحميل الرسائل...</p>;
  if (error) return <p className="text-red-400">فشل تحميل الدردشة</p>;

  return (
    <div className="flex flex-col h-125">
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.senderId === user?.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                msg.senderId === user?.id
                  ? 'bg-amber-400 text-black'
                  : 'bg-white/10 text-white'
              }`}
            >
              {msg.senderId !== user?.id && (
                <p className="text-xs text-amber-400 mb-1">{msg.senderName}</p>
              )}
              <p className="text-sm">{msg.text}</p>
              <p className="text-xs opacity-60 mt-1">{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="اكتب رسالتك..."
          className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder:text-white/40"
          disabled={isSending}
        />
        <button
          type="submit"
          disabled={isSending || !newMessage.trim()}
          className="bg-amber-400 hover:bg-amber-500 text-black font-bold px-5 py-2 rounded-xl transition-all disabled:opacity-50"
        >
          إرسال
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;