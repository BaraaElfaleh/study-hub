// src/modules/classroom/enrollments/hooks/useMyEnrollments.ts
import { useQuery } from '@tanstack/react-query';
import { enrollmentApi } from '../api/enrollmentApi';

export const useMyEnrollments = () => {
  return useQuery({
    queryKey: ['my-enrollments'],
    queryFn: enrollmentApi.getMyEnrollments,
    staleTime: 2 * 60 * 1000,
  });
};