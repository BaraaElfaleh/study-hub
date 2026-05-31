import { useState, useRef, useEffect } from 'react';
import { useParams } from '@tanstack/react-router';
import { useChat } from '../hooks/useChat';
import { useAuthStore } from '../../auth/store/authStore';
import { MessageCircle, Send, Clock, AlertTriangle } from 'lucide-react';

const ChatPanel = () => {
  const { classroomId } = useParams({
    from: '/_protected/tsx/classroom/_layout/$classroomId/chat',
  }) as { classroomId: string };

  const { messages, isLoading, error, sendMessage, isSending } = useChat(classroomId);
  const [newMessage, setNewMessage] = useState('');
  const user = useAuthStore((s) => s.user);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    sendMessage(newMessage.trim());
    setNewMessage('');
  };

  if (isLoading) {
    return (
      <div className="min-h-[80vh] bg-linear-to-b from-[#050530] to-[#040646] flex items-center justify-center">
        <p className="text-white/60">تحميل الرسائل...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[80vh] bg-linear-to-b from-[#050530] to-[#040646] flex items-center justify-center">
        <p className="text-red-400">فشل تحميل الدردشة</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-linear-to-b from-[#050530] via-[#040646] to-[#020038] rounded-2xl p-4 md:p-6 relative overflow-hidden" dir="rtl">
      {/* تأثيرات خلفية */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-1 h-1 bg-amber-400 rounded-full animate-pulse" />
        <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400 rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse delay-200" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
      </div>

      {/* العنوان */}
      <div className="relative z-10 mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageCircle size={24} className="text-amber-400" />
          دردشة الفصل
        </h3>
      </div>

      {/* منطقة الرسائل مع التمرير التلقائي */}
      <div className="relative z-10 flex flex-col h-125">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-2">
          {messages?.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 relative ${
                  msg.senderId === user?.id
                    ? msg.status === 'failed'
                      ? 'bg-red-500/10 border border-red-500/20 text-red-300'
                      : 'bg-amber-400 text-[#050530]'
                    : 'bg-white/5 backdrop-blur-lg border border-white/10 text-white'
                }`}
              >
                {msg.senderId !== user?.id && (
                  <p className="text-xs text-amber-400 mb-1">{msg.senderName}</p>
                )}
                <p className="text-sm">{msg.text}</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-xs opacity-60">
                    {msg.timestamp}
                  </p>
                  {msg.status === 'sending' && (
                    <span className="flex items-center gap-1 text-xs text-white/60">
                      <Clock size={12} /> جارٍ الإرسال...
                    </span>
                  )}
                  {msg.status === 'failed' && (
                    <span className="flex items-center gap-1 text-xs text-red-400">
                      <AlertTriangle size={12} /> فشل الإرسال
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {messages?.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-white/40">لا توجد رسائل بعد. ابدأ المحادثة!</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* حقل الإرسال */}
        <form onSubmit={handleSend} className="flex gap-2 mt-auto">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="اكتب رسالتك..."
            className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all"
            disabled={isSending}
          />
          <button
            type="submit"
            disabled={isSending || !newMessage.trim()}
            className="bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold px-5 py-3 rounded-xl transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-amber-400/20"
          >
            <Send size={18} />
            إرسال
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;