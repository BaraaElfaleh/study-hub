// apps/admin-app/src/modules/users/store/usersStore.ts
import { create } from 'zustand';

interface UsersStore {
  search: string;
  roleFilter: string;
  setSearch: (val: string) => void;
  setRoleFilter: (role: string) => void;
}

export const useUsersStore = create<UsersStore>((set) => ({
  search: '',
  roleFilter: 'all',
  setSearch: (search) => set({ search }),
  setRoleFilter: (role) => set({ roleFilter: role }),
}));