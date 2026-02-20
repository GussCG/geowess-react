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
}

function UserProjects({ projects }: UserProjectsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({
    key: "nombre",
    direction: "asc",
  });

  if (!projects) return null;

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
    {
      id: "2",
      nombre: "Proyecto B",
      fecha_inicio: "2024-02-01",
      fecha_fin: "2024-11-30",
      status: false,
      ubicacion: "Ciudad B",
      porcentaje_avance: 75,
      creado_por: "Usuario 1",
      created_at: "2024-01-01T00:00:00Z",
      presupuesto: 1000000,
      estado: "activo",
    },
    {
      id: "3",
      nombre: "Proyecto C",
      fecha_inicio: "2024-01-01",
      fecha_fin: "2024-12-31",
      status: true,
      ubicacion: "Ciudad C",
      porcentaje_avance: 75,
      creado_por: "Usuario 1",
      created_at: "2024-01-01T00:00:00Z",
      presupuesto: 1000000,
      estado: "pausado",
    },
    {
      id: "4",
      nombre: "Proyecto D",
      fecha_inicio: "2024-01-01",
      fecha_fin: "2024-12-31",
      status: true,
      ubicacion: "Ciudad D",
      porcentaje_avance: 75,
      creado_por: "Usuario 1",
      created_at: "2024-01-01T00:00:00Z",
      presupuesto: 1000000,
      estado: "activo",
    },
    {
      id: "5",
      nombre: "Proyecto E",
      fecha_inicio: "2024-01-01",
      fecha_fin: "2024-12-31",
      status: true,
      ubicacion: "Ciudad E",
      porcentaje_avance: 75,
      creado_por: "Usuario 1",
      created_at: "2024-01-01T00:00:00Z",
      presupuesto: 1000000,
      estado: "activo",
    },
    {
      id: "6",
      nombre: "Proyecto F",
      fecha_inicio: "2024-01-01",
      fecha_fin: "2024-12-31",
      status: true,
      ubicacion: "Ciudad F",
      porcentaje_avance: 75,
      creado_por: "Usuario 1",
      created_at: "2024-01-01T00:00:00Z",
      presupuesto: 1000000,
      estado: "activo",
    },
  ];

  const baseProjects = projects.length > 0 ? projects : sampleProjects;

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
    <Section title="Mis Proyectos" variant="table">
      <div
        style={{
          marginBottom: "1rem",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <input
          type="text"
          placeholder="Buscar proyecto..."
          className="filter-btn" // Reutilizamos tu estilo
          style={{ width: "250px", padding: "0.5rem 1rem" }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
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
