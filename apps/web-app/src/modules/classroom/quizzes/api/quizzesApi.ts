// src/modules/classroom/quizzes/api/quizzesApi.ts
import client from '../../../../shared/api/client';
import type {
  Quiz,
  CreateQuizRequest,
  UpdateQuizRequest,
} from '../../../../shared/types/classroom';

export const quizzesApi = {
  getQuizzes: async (courseId: string): Promise<Quiz[]> => {
    const { data } = await client.get<Quiz[]>(`/courses/${courseId}/quizzes`);
    return data;
  },

  getQuizById: async (courseId: string, quizId: string): Promise<Quiz> => {
    const { data } = await client.get<Quiz>(`/courses/${courseId}/quizzes/${quizId}`);
    return data;
  },

  createQuiz: async (courseId: string, payload: CreateQuizRequest): Promise<Quiz> => {
    const { data } = await client.post<Quiz>(`/courses/${courseId}/quizzes`, payload);
    return data;
  },

  updateQuiz: async (
    courseId: string,
    quizId: string,
    payload: UpdateQuizRequest
  ): Promise<Quiz> => {
    const { data } = await client.patch<Quiz>(
      `/courses/${courseId}/quizzes/${quizId}`,
      payload
    );
    return data;
  },

  deleteQuiz: async (courseId: string, quizId: string): Promise<void> => {
    await client.delete(`/courses/${courseId}/quizzes/${quizId}`);
  },
};