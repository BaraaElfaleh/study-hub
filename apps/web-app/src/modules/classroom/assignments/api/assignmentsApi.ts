// src/modules/classroom/assignments/api/assignmentsApi.ts
import client from '../../../../shared/api/client';
import type {
  Assignment,
  CreateAssignmentRequest,
  UpdateAssignmentRequest,
  Submission,
  SubmitAssignmentRequest,
} from '../../../../shared/types/classroom';

export const assignmentsApi = {
  // ─── الواجبات ───
  getAssignments: async (courseId: string): Promise<Assignment[]> => {
    const { data } = await client.get<Assignment[]>(`/courses/${courseId}/assignments`);
    return data;
  },

  createAssignment: async (courseId: string, payload: CreateAssignmentRequest): Promise<Assignment> => {
    const { data } = await client.post<Assignment>(`/courses/${courseId}/assignments`, payload);
    return data;
  },

  updateAssignment: async (
    courseId: string,
    assignmentId: string,
    payload: UpdateAssignmentRequest
  ): Promise<Assignment> => {
    const { data } = await client.patch<Assignment>(`/courses/${courseId}/assignments/${assignmentId}`, payload);
    return data;
  },

  deleteAssignment: async (courseId: string, assignmentId: string): Promise<void> => {
    await client.delete(`/courses/${courseId}/assignments/${assignmentId}`);
  },

  // ─── التسليمات ───
  submitAssignment: async (
    courseId: string,
    assignmentId: string,
    payload: SubmitAssignmentRequest
  ): Promise<Submission> => {
    const { data } = await client.post<Submission>(
      `/courses/${courseId}/assignments/${assignmentId}/submit`,
      payload
    );
    return data;
  },

  getSubmissions: async (courseId: string, assignmentId: string): Promise<Submission[]> => {
    const { data } = await client.get<Submission[]>(
      `/courses/${courseId}/assignments/${assignmentId}/submissions`
    );
    return data;
  },

  getMySubmission: async (courseId: string, assignmentId: string): Promise<Submission> => {
    const { data } = await client.get<Submission>(
      `/courses/${courseId}/assignments/${assignmentId}/my-submission`
    );
    return data;
  },
};