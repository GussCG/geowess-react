import { useState } from "react";
import Section from "../../../../components/Layout/Section";
import { toCapitalize } from "../../../../utils/toCapitalize";

interface RecentEstimationsProps {
  estimations?: {
    id: string;
    proyecto_id: string;
    fecha_inicio: string;
    fecha_fin: string;
    importe_contrato: number;
    neto_recibir: number;
    estado: string;
    creada_por: string;
    validada_por?: string;
    created_at: string;
  }[];
}

export default function RecentEstimations({
  estimations,
}: RecentEstimationsProps) {
  //   if (!estimations) return null;

  const [filter, setFilter] = useState("todos");

  const estimationsPrueba = [
    {
      id: "1",
      proyecto_id: "Proyecto A",
      fecha_inicio: "2024-01-01",
      fecha_fin: "2024-01-31",
      importe_contrato: 100000,
      neto_recibir: 90000,
      estado: "pendiente",
      creada_por: "Usuario 1",
      created_at: "2024-01-01T12:00:00Z",
    },
    {
      id: "2",
      proyecto_id: "Proyecto B",
      fecha_inicio: "2024-01-01",
      fecha_fin: "2024-01-31",
      importe_contrato: 100000,
      neto_recibir: 90000,
      estado: "en progreso",
      creada_por: "Usuario 1",
      created_at: "2024-01-01T12:00:00Z",
    },
    {
      id: "3",
      proyecto_id: "Proyecto C",
      fecha_inicio: "2024-01-01",
      fecha_fin: "2024-01-31",
      importe_contrato: 100000,
      neto_recibir: 90000,
      estado: "completado",
      creada_por: "Usuario 1",
      created_at: "2024-01-01T12:00:00Z",
    },
  ];

  const filteredData = estimationsPrueba.filter((est) => {
    if (filter === "todos") return true;
    return est.estado === filter;
  });

  return (
    <Section variant="list" title="Estimaciones Recientes">
      <div className="filter-tabs">
        {["todos", "pendiente", "en progreso", "completado"].map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {toCapitalize(f)}
          </button>
        ))}
      </div>

      <ul className="recent-estimations">
        {filteredData.slice(0, 5).map((est) => (
          <li key={est.id}>
            <div className="estimation-item">
              <div className="estimation-header">
                <strong className="estimation-project">
                  {est.proyecto_id}
                </strong>
                <div
                  className={`estimation-status ${est.estado.replace(" ", "-").toLowerCase()}`}
                >
                  {toCapitalize(est.estado)}
                </div>
              </div>
              <div className="estimation-details">
                <span className="estimation-date">
                  <b>Fecha:</b> {new Date(est.created_at).toLocaleDateString()}
                </span>
                <span className="estimation-amount">
                  <b>Importe:</b> ${est.importe_contrato.toLocaleString()}
                </span>
                <span className="estimation-net">
                  <b>Neto a Recibir:</b> ${est.neto_recibir.toLocaleString()}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
