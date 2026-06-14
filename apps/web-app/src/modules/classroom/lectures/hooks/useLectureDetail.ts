// src/modules/classroom/lectures/hooks/useLectureDetail.ts
import { useQuery } from '@tanstack/react-query';
import { lecturesApi } from '../api/lecturesApi';

export const useLectureDetail = (courseId: string, lectureId: string) => {
  return useQuery({
    queryKey: ['lecture', lectureId],
    queryFn: () => lecturesApi.getLectureById(courseId, lectureId),
    enabled: !!lectureId && !!courseId,
  });
};