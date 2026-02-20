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

  // Datos de prueba, reemplazar con datos reales del backend cuando estén disponibles
  const sampleProjects = [
    {
      id: "1",
      nombre: "Proyecto A",
      fecha_inicio: "2024-01-01",
      fecha_fin: "2024-12-31",
      status: true,
      ubicacion: "Ciudad A",
      porcentaje_avance: 75,
      creado_por: "Usuario 1",
      created_at: "2024-01-01T00:00:00Z",
      presupuesto: 1000000,
      estado: "activo",
    },
  ];

  const totalBudget = sampleProjects.reduce(
    (acc, p) => acc + (p.presupuesto ?? 0),
    0,
  );

  const activeProjects = sampleProjects.filter(
    (p) => p.estado === "activo",
  ).length;

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
