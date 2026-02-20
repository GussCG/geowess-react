import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import Icons from "../Others/IconProvider";
import { useUser } from "../../hooks/useUser";
import { formatName } from "../../utils/formatName";
import { toCapitalize } from "../../utils/toCapitalize";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
  IoIosHome,
  IoIosRocket,
  MdEdit,
  IoLogOut,
} = Icons;

interface Props {
  collapsed: boolean;
  toggle: () => void;
}

export default function UserSidebar({ collapsed, toggle }: Props) {
  const navigate = useNavigate();
  const { profile, role, loading } = useUser();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button className="collapse-btn" onClick={toggle}>
        {collapsed ? (
          <TbLayoutSidebarRightCollapseFilled />
        ) : (
          <TbLayoutSidebarLeftCollapseFilled />
        )}
      </button>

      <SkeletonTheme baseColor="#393939" highlightColor="#686868">
        <div className="sidebar__user">
          <div className="user-info">
            <h3 className="user-name">
              {loading ? (
                <Skeleton width={collapsed ? 0 : 120} />
              ) : (
                formatName(
                  profile?.nombre,
                  profile?.ap_paterno,
                  profile?.ap_materno,
                ) || "Usuario"
              )}
            </h3>
            <p className="user-role">
              {loading ? (
                <Skeleton width={collapsed ? 0 : 80} height={12} />
              ) : (
                toCapitalize(role || "sin rol")
              )}
            </p>
          </div>
        </div>
      </SkeletonTheme>

      <nav className="sidebar__nav">
        <NavLink
          className={`sidebar__nav-link ${({ isActive }) => (isActive ? "active" : "")}`}
          to="/dashboard"
        >
          <IoIosHome />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          className={`sidebar__nav-link ${({ isActive }) => (isActive ? "active" : "")}`}
          to="/projects"
        >
          <IoIosRocket />
          <span>Proyectos</span>
        </NavLink>
        <NavLink
          className={`sidebar__nav-link ${({ isActive }) => (isActive ? "active" : "")}`}
          to="/editor"
        >
          <MdEdit />
          <span>Editor</span>
        </NavLink>
      </nav>

      <button className="sidebar__logout" onClick={handleLogout}>
        <IoLogOut />
        <span>Logout</span>
      </button>
    </aside>
  );
}
