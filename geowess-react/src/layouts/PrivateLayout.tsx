import { useState } from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../components/Layout/UserSidebar";

export default function PrivateLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`private-layout ${collapsed ? "collapsed" : ""}`}>
      <UserSidebar
        collapsed={collapsed}
        toggle={() => setCollapsed(!collapsed)}
      />
      <main className="main__content">
        <Outlet />
      </main>
    </div>
  );
}
