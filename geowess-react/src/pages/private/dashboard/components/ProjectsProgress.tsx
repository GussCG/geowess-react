import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Cell,
} from "recharts";
import Section from "../../../../components/Layout/Section";

const COLORS = [
  { name: "Azul", value: "#3b82f6" },
  { name: "Verde", value: "#10b981" },
  { name: "Púrpura", value: "#8b5cf6" },
  { name: "Naranja", value: "#f59e0b" },
];
interface ProjectsProgressProps {
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
  loading?: boolean;
}

export default function ProjectsProgress({
  projects,
  loading,
}: ProjectsProgressProps) {
  const [chartType, setChartType] = useState<"bar" | "line" | "area">("bar");
  const [chartColor, setChartColor] = useState(COLORS[0].value);

  const data = projects.map((p) => ({
    name: p.nombre,
    progress: p.porcentaje_avance,
  }));

  const ChartControls = (
    <div style={{ display: "flex", gap: "8px" }}>
      <select
        value={chartType}
        onChange={(e) => setChartType(e.target.value as any)}
        className="filter-btn"
      >
        <option value="bar">Barras</option>
        <option value="line">Líneas</option>
        <option value="area">Área</option>
      </select>

      <select
        value={chartColor}
        onChange={(e) => setChartColor(e.target.value)}
        className="filter-btn"
      >
        {COLORS.map((c) => (
          <option key={c.value} value={c.value}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 10, right: 30, left: -20, bottom: 0 },
    };

    switch (chartType) {
      case "line":
        return (
          <LineChart {...commonProps}>
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            />
            <YAxis
              unit="%"
              domain={[0, 100]}
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--dashboard-bg-color)",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="progress"
              stroke={chartColor}
              strokeWidth={3}
              dot={{ r: 6 }}
            />
          </LineChart>
        );
      case "area":
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            />
            <YAxis
              unit="%"
              domain={[0, 100]}
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--dashboard-bg-color)",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="progress"
              stroke={chartColor}
              fillOpacity={1}
              fill="url(#colorGrad)"
            />
          </AreaChart>
        );
      default:
        return (
          <BarChart {...commonProps}>
            <XAxis
              dataKey="name"
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            />
            <YAxis
              unit="%"
              domain={[0, 100]}
              tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
              contentStyle={{
                backgroundColor: "var(--dashboard-bg-color)",
                borderRadius: "8px",
              }}
            />
            <Bar
              dataKey="progress"
              fill={chartColor}
              radius={[4, 4, 0, 0]}
              barSize={40}
            ></Bar>
          </BarChart>
        );
    }
  };

  return (
    <Section
      variant="chart"
      title="Progreso de Proyectos"
      actions={ChartControls}
    >
      <div className="project-progress">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            {renderChart()}
          </ResponsiveContainer>
        ) : (
          <p className="no-data">No hay proyectos para mostrar.</p>
        )}
      </div>
    </Section>
  );
}
