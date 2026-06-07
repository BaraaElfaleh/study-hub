// apps/admin-app/src/modules/settings/api/settingsApi.ts
export interface PlatformSettings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  allowRegistration: boolean;
  maintenanceMode: boolean;
}

const mockSettings: PlatformSettings = {
  siteName: 'أكاديمية النون',
  siteDescription: 'منصة تعليمية رائدة في العالم العربي',
  contactEmail: 'info@alnoon.com',
  contactPhone: '+970 56 123 4567',
  address: 'غزة — شارع عمر المختار',
  allowRegistration: true,
  maintenanceMode: false,
};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const settingsApi = {
  fetchSettings: async (): Promise<PlatformSettings> => {
    await delay(400);
    return { ...mockSettings };
  },

  updateSettings: async (data: Partial<PlatformSettings>): Promise<PlatformSettings> => {
    await delay(600);
    Object.assign(mockSettings, data);
    return { ...mockSettings };
  },
};