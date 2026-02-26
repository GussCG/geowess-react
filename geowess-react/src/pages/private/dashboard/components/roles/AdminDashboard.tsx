import Spinner from "../../../../../components/Others/Spinner";
import { useDashboardData } from "../../../../../hooks/useDashboardData";
import DashboardLayout from "../../../../../layouts/DashboardLayout";
import KPISection from "../KPISection";
import FinancialSummary from "../FinancialSummary";
import ProjectsProgress from "../ProjectsProgress";
import ActivityFeed from "../ActivityFeed";
import RecentEstimations from "../RecentEstimations";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface AdminDashboardProps {
  userId?: string;
}

export default function AdminDashboard({ userId }: AdminDashboardProps) {
  const { projects, estimations, notifications, kpis, loading } =
    useDashboardData("administrador", userId);

  return (
    <DashboardLayout>
      <div className="grid-stack-item" gs-w="6" gs-h="1">
        <div className="grid-stack-item-content">
          <KPISection kpis={kpis} />
        </div>
      </div>

      <div className="grid-stack-item" gs-w="6" gs-h="2">
        <div className="grid-stack-item-content">
          <FinancialSummary projects={projects} />
        </div>
      </div>

      <div className="grid-stack-item" gs-w="6" gs-h="3">
        <div className="grid-stack-item-content">
          <ProjectsProgress projects={projects} />
        </div>
      </div>

      <div className="grid-stack-item" gs-w="6" gs-h="2">
        <div className="grid-stack-item-content">
          <RecentEstimations estimations={estimations} />
        </div>
      </div>

      <div className="grid-stack-item" gs-w="12" gs-h="3">
        <div className="grid-stack-item-content">
          <ActivityFeed notifications={notifications} />
        </div>
      </div>
    </DashboardLayout>
  );
}
