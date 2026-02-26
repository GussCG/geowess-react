import { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import Icons from "../Others/IconProvider";
import { useUserContext } from "../../context/User/UserContext";
import { formatName } from "../../utils/formatName";
import { toCapitalize } from "../../utils/toCapitalize";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
  IoIosHome,
  IoIosRocket,
  MdEdit,
  IoLogOut,
  GeoWessLogo,
  FaBoxArchive,
  GrCatalogOption,
  MdFormatListBulleted,
  IoMdAddCircle,
  MdCalculate,
  IoMdSettings,
  IoIosArrowDown,
} = Icons;

interface Props {
  collapsed: boolean;
  toggle: () => void;
}

export default function UserSidebar({ collapsed, toggle }: Props) {
  const navigate = useNavigate();
  const { profile, role, loading } = useUserContext();
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  const isAdminOrSuper =
    role === "administrador" ||
    role === "supervisor" ||
    role === "superintendente" ||
    role === "residente";

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

      <Link to="/dashboard">
        <div className="sidebar__logo">
          {collapsed ? (
            <IoIosRocket className="logo-icon" />
          ) : (
            <GeoWessLogo className="logo" />
          )}
        </div>
      </Link>

      <nav className="sidebar__nav">
        <div className="nav__top">
          <NavLink
            className={`sidebar__nav-link ${({ isActive }) => (isActive ? "active" : "")}`}
            to="/dashboard"
            data-tooltip="Dashboard"
          >
            <IoIosHome />
            <span>Dashboard</span>
          </NavLink>

          <div className={`sidebar__group ${isProjectsOpen ? "open" : ""}`}>
            <button
              className="sidebar__nav-link dropdown-trigger"
              onClick={() => !collapsed && setIsProjectsOpen(!isProjectsOpen)}
              type="button"
            >
              <IoIosRocket />
              <span>Proyectos</span>
              {!collapsed && (
                <IoIosArrowDown
                  className={`arrow-icon ${isProjectsOpen ? "rotated" : ""}`}
                />
              )}
            </button>
            <div className="sidebar__sub-menu">
              <NavLink
                className="sidebar__nav-link sub"
                to="/projects"
                end
                data-tooltip="Mis Proyectos"
              >
                <MdFormatListBulleted />
                <span>Mis Proyectos</span>
              </NavLink>
              <NavLink
                className="sidebar__nav-link sub"
                to="/projects/create"
                data-tooltip="Crear Proyecto"
              >
                <IoMdAddCircle />
                <span>Crear Proyecto</span>
              </NavLink>
            </div>
          </div>

          <div className="sidebar__group">
            <NavLink
              className="sidebar__nav-link"
              to="/estimaciones"
              data-tooltip="Estimaciones"
            >
              <MdCalculate />
              <span>Estimaciones</span>
            </NavLink>
          </div>

          {/* {isAdminOrSuper && (
            <div className="sidebar__group">
              <NavLink
                className="sidebar__nav-link"
                to="/catalogo-maestro"
                data-tooltip="Catálogo Maestro"
              >
                <GrCatalogOption />
                <span>Catálogo Maestro</span>
              </NavLink>
            </div>
          )} */}
        </div>

        {/* <div className="nav__bottom">
          <NavLink
            className="sidebar__nav-link"
            to="/settings"
            data-tooltip="Configuración"
          >
            <IoMdSettings />
            <span>Configuración</span>
          </NavLink>
        </div> */}
      </nav>

      <div className="sidebar__footer">
        <div className="sidebar__user">
          <Link to="/editar-perfil" className="user-link">
            <div className="avatar">
              {profile?.nombre?.charAt(0) || "U"}
              <div className="edit-icon-wrapper">
                <MdEdit className="edit-icon" />
              </div>
            </div>
          </Link>
          {!collapsed && (
            <div className="user-info">
              {loading ? (
                <Skeleton width={120} height={20} />
              ) : (
                <>
                  <h3 className="user-name">
                    {formatName(
                      profile?.nombre,
                      profile?.ap_paterno,
                      profile?.ap_materno,
                    ) || "Usuario"}
                  </h3>
                  <p className="user-role">{toCapitalize(role || "sin rol")}</p>
                </>
              )}
            </div>
          )}
        </div>

        <button className="sidebar__logout" onClick={handleLogout}>
          <IoLogOut />
          {!collapsed && <span>Cerrar Sesión</span>}
        </button>
      </div>
    </aside>
  );
}
