import { useQuery } from "@tanstack/react-query";
import { dashboardApi } from "../api/dashboardApi";
export const useDashboard = () =>
  useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: dashboardApi.getSummary,
    staleTime: 5 * 60 * 1000,
  });
