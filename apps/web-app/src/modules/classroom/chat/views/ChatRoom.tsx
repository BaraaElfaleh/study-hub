// src/modules/classroom/chat/pages/ChatRoom.tsx
import { useState, useRef, useEffect } from 'react';
import { useParams } from '@tanstack/react-router';
import { useChat } from '../hooks/useChat';
import { useAuthStore } from '../../../auth/store/authStore';
import { MessageCircle, Send, Loader } from 'lucide-react';
import type { ChatMessage } from '../../../../shared/types/classroom';

const ChatRoom = () => {
  const { classroomId } = useParams({
    from: '/_protected/tsx/classroom/_layout/$classroomId/chat',
  }) as { classroomId: string };

  const { messages, isLoading, error, sendMessage, isSending } = useChat(classroomId);
  const [text, setText] = useState('');
  const user = useAuthStore((s) => s.user);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // تمرير تلقائي للأسفل عند وصول رسائل جديدة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || isSending) return;
    sendMessage(text.trim());
    setText('');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] p-4 md:p-8 text-right" dir="rtl">
      {/* العنوان */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <MessageCircle size={24} className="text-amber-400" />
          المحادثة
        </h2>
      </div>

      {/* رسائل المحادثة */}
      <div className="flex-1 overflow-y-auto space-y-3 p-2 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl mb-4">
        {isLoading && (
          <div className="flex justify-center py-10">
            <Loader className="animate-spin h-6 w-6 text-amber-400" />
          </div>
        )}
        {error && <p className="text-red-400 text-center py-4">تعذر تحميل الرسائل</p>}
        {!isLoading && messages.length === 0 && (
          <p className="text-white/60 text-center py-10">لا توجد رسائل بعد. ابدأ المحادثة!</p>
        )}
        {messages.map((msg) => {
          const isMine = msg.senderId === user?.id;
          const senderName = msg.sender
            ? `${msg.sender.firstName || ''} ${msg.sender.lastName || ''}`.trim()
            : 'مستخدم';
          const time = new Date(msg.createdAt).toLocaleTimeString('ar-SA', {
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  isMine
                    ? 'bg-amber-400 text-[#050530]'
                    : 'bg-white/10 text-white'
                }`}
              >
                {!isMine && (
                  <p className="text-xs text-amber-400 mb-1">{senderName}</p>
                )}
                <p className="text-sm whitespace-pre-wrap break-words">{msg.content}</p>
                <p className="text-xs opacity-60 mt-1">{time}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* حقل الإرسال */}
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="اكتب رسالتك..."
          className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50"
          maxLength={500}
          disabled={isSending}
        />
        <button
          type="submit"
          disabled={isSending || !text.trim()}
          className="bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold px-5 py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;