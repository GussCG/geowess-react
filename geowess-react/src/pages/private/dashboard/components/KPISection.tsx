import React from "react";
import Section from "../../../../components/Layout/Section";

interface KPISectionProps {
  kpis?: {
    totalProjects: number;
    unreadNotifications: number;
    totalEstimations: number;
  };
}

function KPISection({ kpis }: KPISectionProps) {
  if (!kpis) return null;

  // Datos de ejemplo para mostrar en el KPISection
  const exampleKpis = {
    totalProjects: 12,
    unreadNotifications: 5,
    totalEstimations: 34,
  };

  return (
    <Section variant="kpi">
      <div className="kpi-item">
        <span className="kpi__label">Proyectos</span>
        <span className="kpi__value">{exampleKpis.totalProjects}</span>
      </div>

      <div className="kpi-item">
        <span className="kpi__label">Estimaciones</span>
        <span className="kpi__value">{exampleKpis.totalEstimations}</span>
      </div>

      <div className="kpi-item">
        <span className="kpi__label">Notificaciones</span>
        <span className="kpi__value kpi__value--alert">
          {exampleKpis.unreadNotifications}
        </span>
      </div>
    </Section>
  );
}

export default KPISection;
