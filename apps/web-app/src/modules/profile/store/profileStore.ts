import { create } from 'zustand';

interface ProfileStore {
  isEditing: boolean;
  avatarPreview: string | null;
  setIsEditing: (val: boolean) => void;
  setAvatarPreview: (url: string | null) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  isEditing: false,
  avatarPreview: null,
  setIsEditing: (val) => set({ isEditing: val }),
  setAvatarPreview: (url) => set({ avatarPreview: url }),
}));