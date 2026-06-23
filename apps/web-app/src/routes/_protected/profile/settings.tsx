import { createFileRoute } from '@tanstack/react-router';
import SettingsPage from '../../../modules/profile/views/SettingsPage';
export const Route = createFileRoute('/_protected/profile/settings')({ component: SettingsPage });