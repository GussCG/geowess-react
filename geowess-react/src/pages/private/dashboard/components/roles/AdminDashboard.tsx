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
      <div className="col-3">
        <KPISection kpis={kpis} />
      </div>
      <div className="col-9">
        <FinancialSummary projects={projects} />
      </div>
      <div className="col-6">
        <ProjectsProgress projects={projects} />
      </div>
      <div className="col-6">
        <RecentEstimations estimations={estimations} />
      </div>

      <div className="col-12">
        {" "}
        <ActivityFeed notifications={notifications} />
      </div>
    </DashboardLayout>
  );
}
