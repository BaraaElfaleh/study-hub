// src/modules/classroom/quizzes/views/QuizListPage.tsx
import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useQuizzes } from '../hooks/useQuizzes';
import { useAuthStore } from '../../../auth/store/authStore';
import {
  HelpCircle,
  Plus,
  Trash2,
  Loader,
} from 'lucide-react';

const QuizListPage = () => {
  const { classroomId } = useParams({
    from: '/_protected/classroom/$classroomId/quizzes/',
  }) as { classroomId: string };

  const {
    quizzes,
    isLoading,
    error,
    createQuiz,
    deleteQuiz,
    isCreating,
    isDeleting,
  } = useQuizzes(classroomId);

  const user = useAuthStore((s) => s.user);
  const isTeacher = user?.role === 'TEACHER' || user?.role === 'ADMIN';

  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    // إنشاء اختبار فارغ (يمكن إضافة أسئلة لاحقاً في صفحة منفصلة)
    createQuiz({ title: newTitle.trim(), questions: [] });
    setNewTitle('');
    setShowForm(false);
  };

  return (
    <div className="p-4 md:p-8 text-right" dir="rtl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <HelpCircle size={24} className="text-amber-400" />
          الاختبارات
        </h2>
        {isTeacher && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-[#050530] font-medium px-4 py-2 rounded-xl transition-all"
          >
            <Plus size={18} />
            إضافة اختبار
          </button>
        )}
      </div>

      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 mb-6 flex gap-2"
        >
          <input
            type="text"
            placeholder="عنوان الاختبار"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
            className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-400/50"
          />
          <button
            type="submit"
            disabled={isCreating}
            className="bg-amber-400 hover:bg-amber-500 text-[#050530] px-6 py-2 rounded-xl font-medium disabled:opacity-50"
          >
            {isCreating ? 'جاري...' : 'إنشاء'}
          </button>
        </form>
      )}

      {isLoading && (
        <div className="flex justify-center py-10">
          <Loader className="animate-spin h-6 w-6 text-amber-400" />
        </div>
      )}
      {error && <p className="text-red-400 text-center">فشل تحميل الاختبارات</p>}

      {!isLoading && !error && (
        <div className="space-y-4">
          {quizzes.length === 0 && (
            <p className="text-white/60 text-center py-10">لا توجد اختبارات بعد</p>
          )}
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex items-center justify-between"
            >
              <div>
                <h3 className="text-white font-bold text-lg">{quiz.title}</h3>
                <p className="text-white/40 text-sm mt-1">
                  {quiz.questions.length} أسئلة
                </p>
              </div>
              <div className="flex items-center gap-3">
                {/* زر لبدء الاختبار للطالب – سنتركه للآن كرابط وهمي */}
                {!isTeacher && (
                  <button
                    onClick={() => alert('ستتوفر واجهة الاختبار قريباً')}
                    className="bg-amber-400/10 text-amber-400 border border-amber-400/30 hover:bg-amber-400 hover:text-[#050530] px-4 py-2 rounded-xl text-sm"
                  >
                    بدء الاختبار
                  </button>
                )}
                {isTeacher && (
                  <button
                    onClick={() => deleteQuiz(quiz.id)}
                    disabled={isDeleting}
                    className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                    title="حذف"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizListPage;