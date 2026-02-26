import KPISection from "../KPISection";
import ProjectsProgress from "../ProjectsProgress";
import ActivityFeed from "../ActivityFeed";
import UserProjects from "../UserProjects";
import { useDashboardData } from "../../../../../hooks/useDashboardData";
import RecentEstimations from "../RecentEstimations";
import DashboardLayout from "../../../../../layouts/DashboardLayout";

interface SupervisorDashboardProps {
  userId?: string;
}

export default function SupervisorDashboard({
  userId,
}: SupervisorDashboardProps) {
  const { projects, estimations, notifications, kpis, loading } =
    useDashboardData("supervisor", userId);

  return (
    <DashboardLayout>
      <div className="grid-stack-item" gs-w="5" gs-h="1">
        <div className="grid-stack-item-content">
          <KPISection kpis={kpis} loading={loading} />
        </div>
      </div>

      <div className="grid-stack-item" gs-w="7" gs-h="2">
        <div className="grid-stack-item-content">
          <UserProjects projects={projects} loading={loading} />
        </div>
      </div>

      <div className="grid-stack-item" gs-w="5" gs-h="3">
        <div className="grid-stack-item-content">
          <ProjectsProgress projects={projects} loading={loading} />
        </div>
      </div>

      <div className="grid-stack-item" gs-w="7" gs-h="2">
        <div className="grid-stack-item-content">
          <RecentEstimations estimations={estimations} loading={loading} />
        </div>
      </div>

      <div className="grid-stack-item" gs-w="12" gs-h="2">
        <div className="grid-stack-item-content">
          <ActivityFeed notifications={notifications} loading={loading} />
        </div>
      </div>
    </DashboardLayout>
  );
}
