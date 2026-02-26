import Section from "../../../../components/Layout/Section";

interface FinancialSummaryProps {
  projects?: {
    id: string;
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
    status: boolean;
    ubicacion: string;
    porcentaje_avance: number;
    creado_por: string;
    created_at: string;
    presupuesto?: number;
    estado?: string;
  }[];
}

export default function FinancialSummary({ projects }: FinancialSummaryProps) {
  if (!projects) return null;

  const totalBudget = projects.reduce(
    (acc, p) => acc + (p.presupuesto ?? 0),
    0,
  );

  const activeProjects = projects.filter((p) => p.estado === "activo").length;

  return (
    <Section variant="chart" title="Resumen Financiero">
      <div className="financial-summary">
        <div className="summary-item">
          <span className="summary__label">Total Presupuesto</span>
          <span className="summary__value">
            ${totalBudget.toLocaleString()}
          </span>
        </div>

        <div className="summary-item">
          <span className="summary__label">Proyectos Activos</span>
          <span className="summary__value">{activeProjects}</span>
        </div>
      </div>
    </Section>
  );
}
