import { createFileRoute } from "@tanstack/react-router";
import PaymentsListPage from "../../modules/payments/pages/PaymentsListPage";
export const Route = createFileRoute("/_admin/payments")({
  component: PaymentsListPage,
});
