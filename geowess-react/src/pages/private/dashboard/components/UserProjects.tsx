import React, { useState, useMemo } from "react";
import Section from "../../../../components/Layout/Section";

interface UserProjectsProps {
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

function UserProjects({ projects, loading }: UserProjectsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({
    key: "nombre",
    direction: "asc",
  });

  if (!projects) return null;

  const baseProjects = projects;

  const filteredAndSortedProjects = useMemo(() => {
    let processed = [...baseProjects];

    if (searchTerm) {
      processed = processed.filter((p) =>
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (sortConfig.key && sortConfig.direction) {
      processed.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return processed;
  }, [baseProjects, searchTerm, sortConfig]);

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" | null = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <Section
      title="Mis Proyectos"
      variant="table"
      actions={
        <div
          style={{
            marginBottom: "0",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <input
            type="text"
            placeholder="Buscar proyecto..."
            className="filter-btn"
            style={{ width: "250px", padding: "0.5rem 1rem" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      }
    >
      <table>
        <thead>
          <tr>
            <th
              onClick={() => requestSort("nombre")}
              style={{ cursor: "pointer" }}
            >
              Nombre
            </th>
            <th
              onClick={() => requestSort("fecha_inicio")}
              style={{ cursor: "pointer" }}
            >
              Fecha Inicio
            </th>
            <th
              onClick={() => requestSort("estado")}
              style={{ cursor: "pointer" }}
            >
              Estado
            </th>
            <th style={{ textAlign: "right" }}>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {filteredAndSortedProjects.length > 0 ? (
            filteredAndSortedProjects.map((project) => (
              <tr key={project.id}>
                <td>
                  <span style={{ fontWeight: 500 }}>{project.nombre}</span>
                </td>
                <td>{new Date(project.fecha_inicio).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`status-badge ${project.status ? "active" : ""}`}
                  >
                    {project.status ? "● Activo" : "○ Pausado"}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <button className="filter-btn">Ver Detalles</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: "2rem" }}>
                No se encontraron proyectos.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Section>
  );
}

export default UserProjects;
