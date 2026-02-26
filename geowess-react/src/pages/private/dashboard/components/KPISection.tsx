import React from "react";
import Section from "../../../../components/Layout/Section";
import Skeleton from "react-loading-skeleton";

interface KPISectionProps {
  kpis?: {
    totalProjects: number;
    unreadNotifications: number;
    totalEstimations: number;
  };
  loading?: boolean;
}

function KPISection({ kpis, loading }: KPISectionProps) {
  if (!kpis) return null;

  return (
    <Section variant="kpi">
      <div className="kpi-item">
        <span className="kpi__label">Proyectos</span>
        <span className="kpi__value">{kpis.totalProjects}</span>
      </div>

      <div className="kpi-item">
        <span className="kpi__label">Estimaciones</span>
        <span className="kpi__value">{kpis.totalEstimations}</span>
      </div>

      <div className="kpi-item">
        <span className="kpi__label">Notificaciones</span>
        <span className="kpi__value kpi__value--alert">
          {kpis.unreadNotifications}
        </span>
      </div>
    </Section>
  );
}

export default KPISection;
