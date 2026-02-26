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
  loading?: boolean;
}

export default function RecentEstimations({
  estimations,
  loading,
}: RecentEstimationsProps) {
  if (!estimations) return null;

  const [filter, setFilter] = useState("todos");

  const filteredData = estimations.filter((est) => {
    if (filter === "todos") return true;
    return est.estado === filter;
  });

  return (
    <Section
      variant="list"
      title="Estimaciones Recientes"
      subHeader={
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
      }
    >
      {filteredData.length > 0 ? (
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
                    <b>Fecha:</b>{" "}
                    {new Date(est.created_at).toLocaleDateString()}
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
      ) : (
        <p className="no-data">No hay estimaciones para mostrar.</p>
      )}
    </Section>
  );
}
