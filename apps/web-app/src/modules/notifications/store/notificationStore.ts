// src/modules/notifications/store/notificationStore.ts
import { create } from 'zustand';

interface NotificationStore {
  unreadCount: number;
  isDropdownOpen: boolean;
  setUnreadCount: (count: number) => void;
  decrementUnread: () => void;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  setDropdownOpen: (open: boolean) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  unreadCount: 0,
  isDropdownOpen: false,
  setUnreadCount: (count) => set({ unreadCount: count }),
  decrementUnread: () => set((state) => ({ unreadCount: Math.max(0, state.unreadCount - 1) })),
  toggleDropdown: () => set((state) => ({ isDropdownOpen: !state.isDropdownOpen })),
  closeDropdown: () => set({ isDropdownOpen: false }),
  setDropdownOpen: (open) => set({ isDropdownOpen: open }),
}));