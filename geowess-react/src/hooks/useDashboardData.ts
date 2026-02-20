import { useProjects } from "./useProjects";
import { useEstimations } from "./useEstimation";
import { useNotifications } from "./useNotification";

export function useDashboardData(role: string | null, userId?: string) {
  const { projects, loading: projectsLoading } = useProjects(role, userId);
  const { estimations } = useEstimations();
  const { notifications } = useNotifications(userId);

  const loading = projectsLoading;

  const kpis = {
    totalProjects: projects.length,
    unreadNotifications: notifications.length,
    totalEstimations: estimations.length,
  };

  return {
    projects,
    estimations,
    notifications,
    kpis,
    loading,
  };
}
