import { useState, useRef, useEffect } from 'react';
import { useParams } from '@tanstack/react-router';
import { useChat } from '../hooks/useChat';
import { useAuthStore } from '../../auth/store/authStore';
import { MessageCircle, Send } from 'lucide-react';
import type { ChatMessage } from '../../../shared/types/classroom';

const MessageBubble = ({ msg, currentUserId }: { msg: ChatMessage; currentUserId?: string }) => {
  const isMine = msg.senderId === currentUserId;
  const senderName = `${msg.sender?.firstName || ''} ${msg.sender?.lastName || ''}`.trim();
  return (
    <div className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-2xl px-4 py-2 relative ${isMine ? 'bg-amber-400 text-[#050530]' : 'bg-white/5 backdrop-blur-lg border border-white/10 text-white'}`}>
        {!isMine && <p className="text-xs text-amber-400 mb-1">{senderName}</p>}
        <p className="text-sm break-words">{msg.content}</p>
        <p className="text-xs opacity-60 mt-2">{new Date(msg.createdAt).toLocaleTimeString('ar-SA')}</p>
      </div>
    </div>
  );
};

const ChatPanel = () => {
  const { classroomId } = useParams({ from: '/_protected/tsx/classroom/_layout/$classroomId/chat' }) as { classroomId: string };
  const { messages, isLoading, error, sendMessage, isSending } = useChat(classroomId);
  const [newMessage, setNewMessage] = useState('');
  const user = useAuthStore((s) => s.user);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;
    sendMessage(newMessage.trim());
    setNewMessage('');
  };

  if (isLoading) return <div className="min-h-[80vh] flex items-center justify-center"><p className="text-white/60">تحميل...</p></div>;
  if (error) return <div className="min-h-[80vh] flex items-center justify-center"><p className="text-red-400">فشل التحميل</p></div>;

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-[#050530] via-[#040646] to-[#020038] rounded-2xl p-4 md:p-6 relative overflow-hidden" dir="rtl">
      <div className="relative z-10 mb-6"><h3 className="text-xl font-bold text-white flex items-center gap-2"><MessageCircle size={24} className="text-amber-400" />دردشة الفصل</h3></div>
      <div className="relative z-10 flex flex-col h-[500px]">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-2">
          {messages?.length ? messages.map((msg) => <MessageBubble key={msg.id} msg={msg} currentUserId={user?.id} />) : <div className="flex-1 flex items-center justify-center"><p className="text-white/40">لا توجد رسائل</p></div>}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSend} className="flex gap-2 mt-auto">
          <input ref={useRef<HTMLInputElement>(null)} type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="اكتب رسالتك..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" disabled={isSending} maxLength={500} />
          <button type="submit" disabled={isSending || !newMessage.trim()} className="bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold px-5 py-3 rounded-xl disabled:opacity-50"><Send size={18} /></button>
        </form>
      </div>
    </div>
  );
};

export default ChatPanel;