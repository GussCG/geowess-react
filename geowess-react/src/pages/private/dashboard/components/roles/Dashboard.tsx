import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import SupervisorDashboard from "./SupervisorDashboard";
import { useUserContext } from "../../../../../context/User/UserContext";
import Loader from "../../../../../components/Others/Loader";

function Dashboard() {
  const { user, role, loading } = useUserContext();

  const adminRoles = ["administrador"];
  const supervisorRoles = ["supervisor", "superintendente"];

  if (loading) return <Loader />;

  if (!user || !role)
    return (
      <div>
        <p>No autorizado</p>
      </div>
    );

  if (adminRoles.includes(role)) return <AdminDashboard userId={user?.id} />;

  if (supervisorRoles.includes(role))
    return <SupervisorDashboard userId={user?.id} />;

  return <UserDashboard userId={user?.id} />;
}

export default Dashboard;
