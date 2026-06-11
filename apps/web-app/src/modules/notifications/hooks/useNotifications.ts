import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsApi } from "../api/notificationsApi";
import { adaptNotification } from "../adapters/notificationAdapter";

export const useNotifications = () => {
  const queryClient = useQueryClient();
  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: () =>
      notificationsApi
        .getNotifications()
        .then((dtos) => dtos.map(adaptNotification)),
    staleTime: 30 * 1000,
  });
  const markAsReadMutation = useMutation({
    mutationFn: (id: string) => notificationsApi.markAsRead(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });
  const markAllAsReadMutation = useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });
  return {
    notifications: notifications ?? [],
    isLoading,
    error,
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead: markAllAsReadMutation.mutate,
    isMarkingAll: markAllAsReadMutation.isPending,
  };
};
