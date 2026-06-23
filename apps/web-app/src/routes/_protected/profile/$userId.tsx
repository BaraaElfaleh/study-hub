import { createFileRoute } from "@tanstack/react-router";
import ProfilePage from "../../../modules/profile/views/ProfilePage";
export const Route = createFileRoute("/_protected/profile/$userId")({
  component: ProfilePage,
});
