import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "../../../modules/profile";

export const Route = createFileRoute("/_protected/tsx/profile/settings")({
  component: SettingsPage,
});
