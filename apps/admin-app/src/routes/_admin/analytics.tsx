import { createFileRoute } from "@tanstack/react-router";
import AnalyticsPage from "../../modules/analytics/pages/AnalyticsPage";
export const Route = createFileRoute("/_admin/analytics")({
  component: AnalyticsPage,
});
