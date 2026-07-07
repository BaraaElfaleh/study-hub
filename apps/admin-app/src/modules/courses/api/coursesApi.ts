import client from "../../../shared/api/client";
import type { PaginatedResponse } from "../../../shared/types/api";
import type { Course } from "../../../shared/types/course";
export const coursesApi = {
  getAdminCourses: async (params: any): Promise<PaginatedResponse<Course>> => {
    const { data } = await client.get("/admin/courses", { params });
    return data;
  },
  toggleActivation: async (id: string): Promise<void> => {
    await client.patch(`/admin/courses/${id}/activation`);
  },
  assignTeacher: async (courseId: string, teacherId: string): Promise<void> => {
    await client.patch(`/courses/${courseId}/assign-teacher`, { teacherId });
  },
};
