import { useState, useRef, useEffect } from 'react';
import { useParams } from '@tanstack/react-router';
import { useChat } from '../hooks/useChat';
import { useAuthStore } from '../../auth/store/authStore';
import { MessageCircle, Send, Clock, AlertTriangle, Trash2, ShieldCheck } from 'lucide-react';
import type { ChatMessage } from '../../../shared/types/classroom';

interface MessageBubbleProps {
  msg: ChatMessage;
  currentUserId?: string;
  isTeacher?: boolean;
  onDelete?: (id: string) => void;
}

const MessageBubble = ({ msg, currentUserId, isTeacher, onDelete }: MessageBubbleProps) => {
  const isMine = msg.senderId === currentUserId;
  const senderIsTeacher = msg.senderId === 'user-002';

  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2 relative ${
          isMine
            ? msg.status === 'failed'
              ? 'bg-red-500/10 border border-red-500/20 text-red-300'
              : 'bg-amber-400 text-[#050530]'
            : 'bg-white/5 backdrop-blur-lg border border-white/10 text-white'
        } ${senderIsTeacher && !isMine ? 'ring-1 ring-amber-400/50' : ''}`}
      >
        <div className="flex items-center gap-2 mb-1">
          {!isMine && <p className="text-xs text-amber-400">{msg.senderName}</p>}
          {senderIsTeacher && (
            <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-400 text-[10px] px-2 py-0.5 rounded-full">
              <ShieldCheck size={10} />
              مُدرّس
            </span>
          )}
        </div>

        <p className="text-sm wrap-break-word">{msg.text}</p>

        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="flex items-center gap-2">
            <p className="text-xs opacity-60">{msg.timestamp}</p>
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

          {isTeacher && onDelete && (
            <button
              onClick={() => onDelete(msg.id)}
              className="text-white/40 hover:text-red-400 transition-colors"
              title="حذف الرسالة"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const ChatPanel = () => {
  const { classroomId } = useParams({
    from: '/_protected/tsx/classroom/_layout/$classroomId/chat',
  }) as { classroomId: string };

  const { messages, isLoading, error, sendMessage, isSending, deleteMessage } = useChat(classroomId);
  const [newMessage, setNewMessage] = useState('');
  const user = useAuthStore((s) => s.user);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevIsSendingRef = useRef(isSending);

  const isTeacher = user?.role === 'teacher';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const wasSending = prevIsSendingRef.current;
    if (wasSending && !isSending) {
      inputRef.current?.focus();
    }
    prevIsSendingRef.current = isSending;
  }, [isSending]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage || !user) return;
    sendMessage(trimmedMessage);
    setNewMessage('');
  };

  const handleDelete = (messageId: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الرسالة؟')) {
      deleteMessage(messageId);
    }
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
    <div
      className="min-h-[80vh] bg-linear-to-b from-[#050530] via-[#040646] to-[#020038] rounded-2xl p-4 md:p-6 relative overflow-hidden"
      dir="rtl"
    >
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

      {/* منطقة الرسائل */}
      <div className="relative z-10 flex flex-col h-125">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-2">
          {messages?.length ? (
            messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                msg={msg}
                currentUserId={user?.id}
                isTeacher={isTeacher}
                onDelete={isTeacher ? handleDelete : undefined}
              />
            ))
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-white/40">لا توجد رسائل بعد. ابدأ المحادثة!</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="flex gap-2 mt-auto">
          <input
            ref={inputRef}
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="اكتب رسالتك..."
            className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/30 transition-all"
            disabled={isSending}
            maxLength={500}
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