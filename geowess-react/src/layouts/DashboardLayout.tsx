import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return <div className="dashboard-grid">{children}</div>;
}
