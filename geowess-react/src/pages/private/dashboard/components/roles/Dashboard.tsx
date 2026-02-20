import { useUser } from "../../../../../hooks/useUser";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "../../UserDashboard";
import SupervisorDashboard from "./SupervisorDashboard";

function Dashboard() {
  const { user, role } = useUser();

  if (!role) return null;

  const adminRoles = ["administrador"];
  const supervisorRoles = ["supervisor", "superintendente"];

  if (adminRoles.includes(role)) return <AdminDashboard userId={user?.id} />;

  if (supervisorRoles.includes(role))
    return <SupervisorDashboard userId={user?.id} />;

  return <UserDashboard userId={user?.id} />;
}

export default Dashboard;
