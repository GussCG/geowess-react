import React, { useEffect, useState } from "react";
import { useProjects } from "../../../hooks/useProjects";
import { Link, useParams } from "react-router-dom";
import Icons from "../../../components/Others/IconProvider";
import { EditableCell } from "../../../components/Others/EditableCell";
import Loader from "../../../components/Others/Loader";
import { useUserContext } from "../../../context/User/UserContext";
import { usePhases } from "../../../hooks/usePhases";
import PhasesProgressChart from "./PhasesProgressChart";
import { formatName } from "../../../utils/formatName";

const {
  LuCalendar,
  LuUsers,
  LuDollarSign,
  LuTrendingUp,
  LuPlus,
  LuMapPin,
  FaTrash,
  GrCatalogOption,
  FaSave,
  FaTimes,
} = Icons;

function Project() {
  const { id } = useParams();
  const { profile, role } = useUserContext();
  const { getProject } = useProjects(role || null, profile?.id);
  const { phases, loading, fetchPhases, addPhase, updatePhase, deletePhase } =
    usePhases();
  const [project, setProject] = useState<any>(null);

  const [isCreatingPhase, setIsCreatingPhase] = useState(false);
  const [newPhase, setNewPhase] = useState({
    nombre: "",
    fecha_inicio: "",
    fecha_fin: "",
  });

  useEffect(() => {
    if (id && profile?.id) {
      loadProjectData();
      fetchPhases(id);
    }
  }, [id, profile?.id]);

  const loadProjectData = async () => {
    const data = await getProject(id!);
    setProject(data);
  };

  const handleSaveNewPhase = async () => {
    if (!newPhase.nombre || !newPhase.fecha_inicio) return;

    await addPhase({
      ...newPhase,
      proyecto_id: id,
      status: true,
    });

    setIsCreatingPhase(false);
    setNewPhase({ nombre: "", fecha_inicio: "", fecha_fin: "" });
  };

  const handleUpdatePhase = (phaseId: string, field: string, value: any) => {
    updatePhase(phaseId, { [field]: value });
  };

  const handleDeletePhase = (phaseId: string) => {
    if (window.confirm("¿Eliminar fase?")) deletePhase(phaseId);
  };

  if (loading) return <Loader />;
  if (!project)
    return (
      <div className="page project-page">
        <h2 className="page-title">Proyecto no encontrado</h2>
      </div>
    );

  console.log("Project data:", project);
  console.log("Phases data:", phases);

  return (
    <div className="page project-page">
      <header className="page-header">
        <div className="header-title">
          <h2 className="project-title">{project.nombre}</h2>
          <span
            className={`status-badge ${project.status ? "active" : "inactive"}`}
          >
            {project.status ? "En Proceso" : "Finalizado"}
          </span>
        </div>

        <div className="kpi-grid">
          <div className="kpi-card">
            <LuCalendar className="kpi-icon" />
            <div>
              <p className="label">Cronograma</p>
              <p className="value">
                {new Date(project.fecha_inicio).toLocaleDateString()} -{" "}
                {new Date(project.fecha_fin).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="kpi-card">
            <LuDollarSign className="kpi-icon" />
            <div>
              <p className="label">Costo Total</p>
              <p className="value">${project.costo_total || "0"}</p>
            </div>
          </div>

          <div className="kpi-card">
            <LuTrendingUp className="kpi-icon" />
            <div style={{ width: "100%" }}>
              <p className="label">Avance</p>
              <div className="progress-container">
                <div className="progress-bar-bg">
                  <div
                    className="progress-fill"
                    style={{ width: `${project.porcentaje_avance}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {project.porcentaje_avance}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="project-content-grid">
        <section className="phases-section">
          <div className="section-header">
            <h3>
              <LuTrendingUp /> Fases del Proyecto
            </h3>
            <button
              className="project-btn"
              onClick={() => setIsCreatingPhase(true)}
            >
              <LuPlus /> Nueva Fase
            </button>
          </div>

          <div className="table-container">
            {phases.length > 0 || isCreatingPhase ? (
              <div className="table-container">
                <table className="custom-table phases-table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Inicio</th>
                      <th>Fin</th>
                      <th
                        style={{
                          textAlign: "right",
                        }}
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {isCreatingPhase && (
                      <tr className="new-row-highlight">
                        <td>
                          <input
                            type="text"
                            className="filter-btn"
                            placeholder="Nombre fase..."
                            value={newPhase.nombre}
                            onChange={(e) =>
                              setNewPhase({
                                ...newPhase,
                                nombre: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            className="filter-btn"
                            min={project.fecha_inicio}
                            max={project.fecha_fin}
                            value={newPhase.fecha_inicio}
                            onChange={(e) =>
                              setNewPhase({
                                ...newPhase,
                                fecha_inicio: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="date"
                            className="filter-btn"
                            min={project.fecha_inicio}
                            max={project.fecha_fin}
                            value={newPhase.fecha_fin}
                            onChange={(e) =>
                              setNewPhase({
                                ...newPhase,
                                fecha_fin: e.target.value,
                              })
                            }
                          />
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <div className="action-buttons">
                            <button
                              className="filter-btn primary"
                              onClick={handleSaveNewPhase}
                              title="Guardar Nueva Fase"
                            >
                              <FaSave />
                            </button>
                            <button
                              className="filter-btn"
                              onClick={() => setIsCreatingPhase(false)}
                              title="Cancelar"
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}

                    {phases.map((phase: any) => (
                      <tr key={phase.id}>
                        <td>
                          <EditableCell
                            value={phase.nombre}
                            onSave={(val) =>
                              handleUpdatePhase(phase.id, "nombre", val)
                            }
                          />
                        </td>
                        <td>
                          <EditableCell
                            type="date"
                            value={phase.fecha_inicio}
                            onSave={(val) =>
                              handleUpdatePhase(phase.id, "fecha_inicio", val)
                            }
                          />
                        </td>
                        <td>
                          <EditableCell
                            type="date"
                            value={phase.fecha_fin}
                            onSave={(val) =>
                              handleUpdatePhase(phase.id, "fecha_fin", val)
                            }
                          />
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <div className="action-buttons">
                            <Link
                              to={`/catalogo/${phase.id}`}
                              className="filter-btn primary"
                              title="Ver Catalogo de la Fase"
                            >
                              <GrCatalogOption />
                            </Link>
                            <button
                              className="filter-btn danger"
                              title="Eliminar Fase"
                              onClick={() => handleDeletePhase(phase.id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="no-data">No hay fases registradas</p>
            )}
          </div>
        </section>

        <div className="sidebar-column">
          <PhasesProgressChart phases={phases} />

          <aside className="team-section">
            <div className="section-header">
              <h3>
                <LuUsers /> Equipo de Trabajo
              </h3>
            </div>
            <div className="team-list">
              <div className="user-card supervisor">
                <div className="avatar">
                  {project.supervisor?.nombre?.charAt(0)}
                </div>
                <div className="info">
                  <p className="name">
                    {formatName(
                      project.supervisor?.nombre,
                      project.supervisor?.ap_paterno,
                      project.supervisor?.ap_materno,
                    ) || "Sin asignar"}
                  </p>
                  <p className="role">Supervisor</p>
                </div>
              </div>

              <button className="project-btn">
                <LuPlus /> Asignar Personal
              </button>
            </div>

            <div className="location-info">
              <h3>
                <LuMapPin /> Ubicación
              </h3>
              <p>{project.ubicacion}</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default Project;
