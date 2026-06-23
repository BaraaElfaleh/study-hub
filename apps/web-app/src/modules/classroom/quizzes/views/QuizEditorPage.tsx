// src/modules/classroom/quizzes/views/QuizEditorPage.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { useQuizEditor } from '../hooks/useQuizEditor';
import { useAuthStore } from '../../../auth/store/authStore';
import { HelpCircle, Plus, Trash2, Save, Loader, ArrowRight } from 'lucide-react';
import type { QuizQuestion } from '../../../../shared/types/classroom';

const QuizEditorPage = () => {
  const { classroomId, quizId } = useParams({
    from: '/_protected/_tsx/classroom/$classroomId/quizzes/$quizId/edit',
  }) as { classroomId: string; quizId: string };

  const { quiz, isLoading, error, updateQuiz, isUpdating } = useQuizEditor(classroomId, quizId);
  const user = useAuthStore((s) => s.user);
  const isTeacher = user?.role === 'TEACHER' || user?.role === 'ADMIN';

  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title);
      setQuestions(quiz.questions || []);
    }
  }, [quiz]);

  const handleSave = () => {
    if (!title.trim()) return;
    updateQuiz({ title: title.trim(), questions });
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', ''], correctAnswer: 0 },
    ]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: keyof QuizQuestion, value: any) => {
    setQuestions(questions.map((q, i) => (i === index ? { ...q, [field]: value } : q)));
  };

  const addOption = (qIndex: number) => {
    setQuestions(questions.map((q, i) => {
      if (i === qIndex) {
        return { ...q, options: [...q.options, ''] };
      }
      return q;
    }));
  };

  const updateOption = (qIndex: number, optIndex: number, value: string) => {
    setQuestions(questions.map((q, i) => {
      if (i === qIndex) {
        const newOptions = [...q.options];
        newOptions[optIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  if (!isTeacher) {
    return <div className="text-white/60 text-center py-20">غير مصرح</div>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Loader className="animate-spin h-8 w-8 text-amber-400" />
      </div>
    );
  }

  if (error || !quiz) {
    return <div className="text-red-400 text-center py-20">فشل تحميل الاختبار</div>;
  }

  return (
    <div className="p-4 md:p-8 text-right" dir="rtl">
      <Link
        to="/_protected/_tsx/classroom/$classroomId/quizzes/"
        params={{ classroomId }}
        className="inline-flex items-center gap-2 text-white/50 hover:text-amber-400 mb-6"
      >
        <ArrowRight size={16} />
        العودة لقائمة الاختبارات
      </Link>

      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <HelpCircle size={24} className="text-amber-400" />
        تعديل الاختبار
      </h2>

      <div className="space-y-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="عنوان الاختبار"
          className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white"
        />

        {questions.map((q, qIndex) => (
          <div key={qIndex} className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-white font-semibold">سؤال {qIndex + 1}</span>
              <button onClick={() => removeQuestion(qIndex)} className="text-red-400 hover:text-red-300">
                <Trash2 size={16} />
              </button>
            </div>

            <input
              type="text"
              placeholder="نص السؤال"
              value={q.question}
              onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white mb-3"
            />

            <div className="space-y-2 mb-3">
              {q.options.map((opt, optIndex) => (
                <div key={optIndex} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={q.correctAnswer === optIndex}
                    onChange={() => updateQuestion(qIndex, 'correctAnswer', optIndex)}
                    className="accent-amber-400"
                  />
                  <input
                    type="text"
                    value={opt}
                    onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                    placeholder={`خيار ${optIndex + 1}`}
                    className="flex-1 bg-white/10 border border-white/10 rounded-lg px-3 py-2 text-white"
                  />
                </div>
              ))}
            </div>

            <button onClick={() => addOption(qIndex)} className="text-amber-400 hover:text-amber-300 text-sm">
              + إضافة خيار
            </button>
          </div>
        ))}

        <button onClick={addQuestion} className="flex items-center gap-2 text-amber-400 hover:text-amber-300">
          <Plus size={18} />
          إضافة سؤال
        </button>

        <button
          onClick={handleSave}
          disabled={isUpdating}
          className="w-full bg-amber-400 hover:bg-amber-500 text-[#050530] font-bold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Save size={18} />
          {isUpdating ? 'جاري الحفظ...' : 'حفظ الاختبار'}
        </button>
      </div>
    </div>
  );
};

export default QuizEditorPage;