// apps/admin-app/src/modules/courses/views/CourseEditForm.tsx
import { useState } from 'react';
import { useCourses } from '../hooks/useCourses';
import { Button, Input } from '../../../shared/components/ui';
import type { Course } from '../../../shared/types/course';

interface Props {
  course?: Course;
  onClose: () => void;
}

const CourseEditForm: React.FC<Props> = ({ course, onClose }) => {
  const [title, setTitle] = useState(course?.title ?? '');
  const [description, setDescription] = useState(course?.description ?? '');
  const [level, setLevel] = useState<Course['level']>(course?.level ?? 'beginner');
  const [price, setPrice] = useState(course?.price ?? 0);
  const [isPublished, setIsPublished] = useState(course?.isPublished ?? true);
  const [instructorName, setInstructorName] = useState(course?.instructorName ?? '');

  const { createCourse, updateCourse, isCreating, isUpdating } = useCourses();
  const isPending = isCreating || isUpdating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title,
      description,
      level,
      price,
      isPublished,
      instructorName,
      instructorId: course?.instructorId ?? '3', // افتراضي
      thumbnail: '',
    };

    if (course) {
      updateCourse({ id: course.id, data }, { onSuccess: onClose });
    } else {
      createCourse(data, { onSuccess: onClose });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="العنوان" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <div>
        <label className="text-sm font-medium text-slate-300 mb-1 block">الوصف</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white resize-none focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          rows={3}
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium text-slate-300 mb-1 block">المستوى</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value as Course['level'])}
          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        >
          <option value="beginner">مبتدئ</option>
          <option value="intermediate">متوسط</option>
          <option value="advanced">متقدم</option>
        </select>
      </div>
      <Input label="السعر (بالشيكل)" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
      <Input label="اسم المدرس" value={instructorName} onChange={(e) => setInstructorName(e.target.value)} required />
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-amber-500 focus:ring-amber-500"
        />
        <label className="text-slate-300 text-sm">منشور</label>
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="ghost" onClick={onClose}>إلغاء</Button>
        <Button type="submit" disabled={isPending}>
          {isPending ? 'جاري الحفظ...' : course ? 'حفظ التغييرات' : 'إضافة'}
        </Button>
      </div>
    </form>
  );
};

export default CourseEditForm;