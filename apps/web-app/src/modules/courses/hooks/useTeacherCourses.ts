// src/modules/courses/hooks/useTeacherCourses.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coursesApi } from '../api/coursesApi';
import { useAuthStore } from '../../auth/store/authStore';
import type { Course, CreateCourseRequest, UpdateCourseRequest, EnrollStudentRequest } from '../../../shared/types/course';

export const useTeacherCourses = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const { data: courses = [], isLoading, error } = useQuery<Course[]>({
    queryKey: ['teacherCourses', user?.id],
    queryFn: async () => {
      const data = await coursesApi.fetchCourses({ teacherId: user?.id });
      return data; // fetchCourses الآن تستخدم extractArray فسترجع مصفوفة
    },
    enabled: !!user?.id,
  });

  // الطفرات كما هي...
  const createMutation = useMutation({
    mutationFn: (payload: CreateCourseRequest) => coursesApi.createCourse(payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['teacherCourses'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCourseRequest }) => coursesApi.updateCourse(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['teacherCourses'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => coursesApi.deleteCourse(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['teacherCourses'] }),
  });

  const enrollMutation = useMutation({
    mutationFn: ({ courseId, body }: { courseId: string; body: EnrollStudentRequest }) =>
      coursesApi.enrollStudent(courseId, body),
    onSuccess: (_, { courseId }) => queryClient.invalidateQueries({ queryKey: ['courseStudents', courseId] }),
  });

  const unenrollMutation = useMutation({
    mutationFn: ({ courseId, studentId }: { courseId: string; studentId: string }) =>
      coursesApi.unenrollStudent(courseId, studentId),
    onSuccess: (_, { courseId }) => queryClient.invalidateQueries({ queryKey: ['courseStudents', courseId] }),
  });

  return {
    courses,
    isLoading,
    error,
    createCourse: createMutation.mutate,
    updateCourse: updateMutation.mutate,
    deleteCourse: deleteMutation.mutate,
    enrollStudent: enrollMutation.mutate,
    unenrollStudent: unenrollMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
  };
};