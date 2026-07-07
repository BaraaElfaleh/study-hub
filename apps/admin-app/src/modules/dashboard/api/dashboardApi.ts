import client from "../../../shared/api/client";
import type { AnalyticsSummary } from "../../../shared/types/analytics";
export const dashboardApi = {
  getSummary: async (): Promise<AnalyticsSummary> => {
    const { data } = await client.get<AnalyticsSummary>("/admin/dashboard");
    return data;
  },
};
