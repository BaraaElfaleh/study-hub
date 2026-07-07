import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { coursesApi } from "../api/coursesApi";
import { useCoursesStore } from "../store/coursesStore";
export const useAdminCourses = () => {
  const qc = useQueryClient();
  const f = useCoursesStore((s) => s.filters);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-courses", f],
    queryFn: () => coursesApi.getAdminCourses(f),
  });
  const toggle = useMutation({
    mutationFn: (id: string) => coursesApi.toggleActivation(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-courses"] }),
  });
  const assign = useMutation({
    mutationFn: ({
      courseId,
      teacherId,
    }: {
      courseId: string;
      teacherId: string;
    }) => coursesApi.assignTeacher(courseId, teacherId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-courses"] }),
  });
  return {
    courses: data?.data ?? [],
    meta: data?.meta,
    isLoading,
    error,
    toggleActivation: toggle.mutate,
    assignTeacher: assign.mutate,
  };
};
