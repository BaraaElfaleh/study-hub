// features/courses/hooks/useCourses.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCourseStore } from '../store/courseStore';
import { coursesApi } from '../api/coursesApi';
import { useAuth } from '../../auth/hooks/useAuth'; 
import { checkPermission } from '../../shared/utils/permissions';

export const useCourses = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth(); // { user: { role } }
  const filters = useCourseStore((state) => state.filters);

  // 1. جلب قائمة الدورات بناءً على الفلاتر
  const {
    data: courses,
    isLoading: isLoadingCourses,
    error: coursesError,
  } = useQuery({
    queryKey: ['courses', filters],
    queryFn: () => coursesApi.fetchCourses({ search: filters.search, level: filters.level }),
    staleTime: 2 * 60 * 1000,
  });

  // 2. استعلام تفاصيل دورة واحدة (يُستخدم في الصفحة)
  const useCourseDetail = (courseId: string) =>
    useQuery({
      queryKey: ['course', courseId],
      queryFn: () => coursesApi.fetchCourseById(courseId),
      enabled: !!courseId,
    });

  // 3. طفرة التسجيل (للطلاب)
  const enrollMutation = useMutation({
    mutationFn: (courseId: string) => coursesApi.enrollInCourse(courseId),
    onSuccess: (_, courseId) => {
      queryClient.invalidateQueries({ queryKey: ['course', courseId] });
      queryClient.invalidateQueries({ queryKey: ['enrollments'] });
    },
  });

  // 4. طفرات المعلم (CRUD)
  const createMutation = useMutation({
    mutationFn: coursesApi.createCourse,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Course> }) =>
      coursesApi.updateCourse(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['course', id] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (courseId: string) => coursesApi.deleteCourse(courseId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
  });

  // التحقق من الصلاحيات باستخدام الدور الحالي
  const canEnroll = user && checkPermission(user.role, 'enroll');
  const canManage = user && checkPermission(user.role, 'manage_courses');

  return {
    // القائمة
    courses,
    isLoadingCourses,
    coursesError,

    // التفاصيل (استعلام)
    useCourseDetail,

    // إجراءات مع فحص الصلاحيات
    enrollInCourse: (courseId: string) => {
      if (!canEnroll) throw new Error('غير مسموح بالتسجيل');
      enrollMutation.mutate(courseId);
    },
    createCourse: (payload: Omit<Course, 'id'>) => {
      if (!canManage) throw new Error('غير مسموح بالإنشاء');
      createMutation.mutate(payload);
    },
    updateCourse: (id: string, data: Partial<Course>) => {
      if (!canManage) throw new Error('غير مسموح بالتعديل');
      updateMutation.mutate({ id, data });
    },
    deleteCourse: (courseId: string) => {
      if (!canManage) throw new Error('غير مسموح بالحذف');
      deleteMutation.mutate(courseId);
    },

    // حالات الطفرات للتعامل مع التحميل/الخطأ
    enrollState: enrollMutation,
    createState: createMutation,
    updateState: updateMutation,
    deleteState: deleteMutation,
  };
};