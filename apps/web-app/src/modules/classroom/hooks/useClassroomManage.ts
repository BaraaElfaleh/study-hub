// apps/web-app/src/modules/classroom/hooks/useClassroomManage.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { classroomApi } from '../api/classroomApi'; // افترض أن لدينا دوال جديدة هنا

export const useClassroomManage = (courseId: string) => {
  const queryClient = useQueryClient();

  // جلب المسجلين في الكورس (معلم/مشرف)
  const studentsQuery = useQuery({
    queryKey: ['classroom', courseId, 'enrollments'],
    queryFn: () => classroomApi.getEnrollments(courseId),
    enabled: !!courseId,
  });

  // تسجيل طالب (بواسطة المشرف/المعلم)
  const enrollStudent = useMutation({
    mutationFn: (studentId: string) => classroomApi.enrollStudent(courseId, studentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['classroom', courseId, 'enrollments'] }),
  });

  // إلغاء تسجيل طالب
  const unenrollStudent = useMutation({
    mutationFn: (studentId: string) => classroomApi.unenrollStudent(courseId, studentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['classroom', courseId, 'enrollments'] }),
  });

  return {
    students: studentsQuery.data,
    isLoading: studentsQuery.isLoading,
    enrollStudent: enrollStudent.mutate,
    unenrollStudent: unenrollStudent.mutate,
    isEnrolling: enrollStudent.isPending,
    isUnenrolling: unenrollStudent.isPending,
  };
};