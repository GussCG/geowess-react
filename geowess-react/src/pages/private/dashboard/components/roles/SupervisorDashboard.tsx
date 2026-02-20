import KPISection from "../KPISection";
import ProjectsProgress from "../ProjectsProgress";
import ActivityFeed from "../ActivityFeed";
import UserProjects from "../UserProjects";
import { useDashboardData } from "../../../../../hooks/useDashboardData";
import Spinner from "../../../../../components/Others/Spinner";
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

  if (loading) return <Spinner />;
  return (
    <DashboardLayout>
      <div className="col-3">
        <KPISection kpis={kpis} />
      </div>

      <div className="col-9">
        <UserProjects projects={projects} />
      </div>

      <div className="col-6">
        <ProjectsProgress projects={projects} />
      </div>

      <div className="col-6">
        <RecentEstimations estimations={estimations} />
      </div>

      <div className="col-12">
        <ActivityFeed notifications={notifications} />
      </div>
    </DashboardLayout>
  );
}
