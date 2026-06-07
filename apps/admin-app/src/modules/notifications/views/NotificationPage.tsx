// apps/admin-app/src/modules/notifications/views/NotificationPage.tsx
import { useState } from 'react';
import { useAdminNotifications } from '../hooks/useAdminNotifications';
import { Table, Button, Input, Modal, Loader } from '../../../shared/components/ui';
import { formatDate } from '../../../shared/utils';
import type { AdminNotification } from '../../../shared/types/notification';
import { Plus, Trash2, Send } from 'lucide-react';

const NotificationPage = () => {
  const { notifications, isLoading, error, sendNotification, isSending, deleteNotification, isDeleting } = useAdminNotifications();
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [targetRole, setTargetRole] = useState('all');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    sendNotification({ title: title.trim(), body: body.trim(), targetRole });
    setTitle('');
    setBody('');
    setTargetRole('all');
    setShowForm(false);
  };

  const columns = [
    { key: 'title', header: 'العنوان' },
    {
      key: 'targetRole',
      header: 'المستهدفون',
      render: (n: AdminNotification) => (
        <span className="px-2 py-1 rounded-full text-xs bg-slate-700 text-slate-300">
          {n.targetRole === 'all' ? 'الجميع' : n.targetRole === 'student' ? 'الطلاب' : 'المعلمين'}
        </span>
      ),
    },
    {
      key: 'sentAt',
      header: 'تاريخ الإرسال',
      render: (n: AdminNotification) => formatDate(n.sentAt),
    },
    { key: 'readCount', header: 'عدد القراءات' },
    {
      key: 'actions',
      header: 'حذف',
      render: (n: AdminNotification) => (
        <button
          onClick={() => deleteNotification(n.id)}
          disabled={isDeleting}
          className="text-slate-400 hover:text-red-400 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      ),
    },
  ];

  if (isLoading) return <Loader />;
  if (error) return <p className="text-red-400 text-center py-10">فشل تحميل الإشعارات</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">الإشعارات</h1>
        <Button onClick={() => setShowForm(true)}>
          <Plus size={16} className="ml-1" />
          إرسال إشعار
        </Button>
      </div>

      <Table columns={columns} data={notifications} />

      {/* مودال إرسال إشعار */}
      {showForm && (
        <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="إرسال إشعار جديد">
          <form onSubmit={handleSend} className="space-y-4">
            <Input
              label="العنوان"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <div>
              <label className="text-sm font-medium text-slate-300 mb-1 block">النص</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-300 mb-1 block">إرسال إلى</label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              >
                <option value="all">الجميع</option>
                <option value="student">الطلاب فقط</option>
                <option value="teacher">المعلمين فقط</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" onClick={() => setShowForm(false)}>إلغاء</Button>
              <Button type="submit" disabled={isSending} className="flex items-center gap-2">
                <Send size={16} />
                {isSending ? 'جاري الإرسال...' : 'إرسال'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default NotificationPage;