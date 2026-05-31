// src/modules/classroom/hooks/useClassroomManage.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { classroomApi } from '../api/classroomApi';

export const useClassroomManage = (courseId: string) => {
  const queryClient = useQueryClient();

  const studentsQuery = useQuery({
    queryKey: ['classroom', courseId, 'students'],
    queryFn: () => classroomApi.getEnrolledStudents(courseId),
    enabled: !!courseId,
  });

  const removeStudent = useMutation({
    mutationFn: (studentId: string) => classroomApi.removeStudentFromClassroom(courseId, studentId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['classroom', courseId, 'students'] }),
  });

  const addStudent = useMutation({
    mutationFn: (email: string) => classroomApi.addStudentToClassroom(courseId, email),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['classroom', courseId, 'students'] }),
  });

  const updateClassroom = useMutation({
    mutationFn: (data: { title?: string; description?: string; level?: string }) =>
      classroomApi.updateClassroom(courseId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['courses'] }),
  });

  return {
    students: studentsQuery.data,
    isLoading: studentsQuery.isLoading,
    removeStudent: removeStudent.mutate,
    addStudent: addStudent.mutate,
    updateClassroom: updateClassroom.mutate,
    isAdding: addStudent.isPending,
    isRemoving: removeStudent.isPending,
  };
};