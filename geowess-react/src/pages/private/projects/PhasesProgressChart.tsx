import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface Phase {
  id: string;
  nombre: string;
  fecha_inicio: string;
  fecha_fin: string;
  proyecto_id: string;
  status: boolean;
  porcentaje_avance?: number;
}

interface PhasesProgressChartProps {
  phases: Phase[];
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff758f",
];

function PhasesProgressChart({ phases }: PhasesProgressChartProps) {
  const portionPerPhase = 100 / (phases.length || 1);

  const data = phases.map((phase, index) => {
    const avanceReal = phase.porcentaje_avance || 0;

    return {
      name: phase.nombre,
      value: portionPerPhase,
      realProgress: avanceReal,
      color: COLORS[index % COLORS.length],
    };
  });

  if (phases.length === 0) {
    return (
      <div className="phases-progress-chart">
        <p className="no-data">No hay fases para mostrar</p>
      </div>
    );
  }

  return (
    <div className="phases-progress-chart">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1a1a1a",
              border: "1px solid var(--dashboard-item-border-color)",
              borderRadius: "8px",
            }}
            itemStyle={{ color: "#fff" }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PhasesProgressChart;
