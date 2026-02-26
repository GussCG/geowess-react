import DashboardLayout from "../../../../../layouts/DashboardLayout";
import { useDashboardData } from "../../../../../hooks/useDashboardData";
import UserProjects from "../UserProjects";
import RecentEstimations from "../RecentEstimations";
import ActivityFeed from "../ActivityFeed";

interface UserDashboardProps {
  userId?: string;
}

export default function UserDashboard({ userId }: UserDashboardProps) {
  const { projects, estimations, notifications, loading } = useDashboardData(
    "usuario",
    userId,
  );

  return (
    <DashboardLayout>
      <div className="grid-stack-item" gs-w="8" gs-h="3">
        <div className="grid-stack-item-content">
          <UserProjects projects={projects} loading={loading} />
        </div>
      </div>

      <div className="grid-stack-item" gs-w="4" gs-h="3">
        <div className="grid-stack-item-content">
          <RecentEstimations estimations={estimations} loading={loading} />
        </div>
      </div>

      <div className="grid-stack-item" gs-w="12" gs-h="4">
        <div className="grid-stack-item-content">
          <ActivityFeed notifications={notifications} loading={loading} />
        </div>
      </div>
    </DashboardLayout>
  );
}
