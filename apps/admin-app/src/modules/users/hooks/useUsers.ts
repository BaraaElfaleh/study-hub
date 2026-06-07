// apps/admin-app/src/modules/users/hooks/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '../api/usersApi';
import { useUsersStore } from '../store/usersStore';
import type { User } from '../../../shared/types/user';


export const useUsers = () => {
  const queryClient = useQueryClient();
  const { search, roleFilter } = useUsersStore();

  const usersQuery = useQuery({
    queryKey: ['admin', 'users', { search, roleFilter }],
    queryFn: () => usersApi.fetchUsers({ search, role: roleFilter }),
    staleTime: 30 * 1000,
  });

  const userDetailQuery = (userId: string) =>
    useQuery({
      queryKey: ['admin', 'user', userId],
      queryFn: () => usersApi.fetchUserById(userId),
      enabled: !!userId,
    });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<User> }) => usersApi.updateUser(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'users'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: string) => usersApi.deleteUser(userId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin', 'users'] }),
  });

  return {
    users: usersQuery.data ?? [],
    isLoading: usersQuery.isLoading,
    error: usersQuery.error,
    userDetailQuery,
    updateUser: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    deleteUser: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  };
};
