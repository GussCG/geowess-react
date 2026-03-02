import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../../context/User/UserContext";
import { useProjects } from "../../../hooks/useProjects";
import { EditableCell } from "../../../components/Others/EditableCell";
import Loader from "../../../components/Others/Loader";
import Icons from "../../../components/Others/IconProvider";
import { toast } from "react-toastify";

const { LuEye, FaTrash, FaPlus, MdEdit } = Icons;

function ProjectsPage() {
  const { user, role, loading: userLoading } = useUserContext();
  const {
    projects,
    setProjects,
    loading: projectsLoading,
    setLoading,
    updateProject,
    deleteProject,
  } = useProjects(role, user?.id);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({
    key: "nombre",
    direction: "asc",
  });

  const itemsPerPage = 10;

  const filteredAndSortedProjects = useMemo(() => {
    let processed = projects ? [...projects] : [];

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
  }, [projects, searchTerm, sortConfig]);

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" | null = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  if (userLoading || projectsLoading) return <Loader />;
  if (!projects) return null;

  const canRequestAccess = ["usuario", "supervisor"].includes(role);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredAndSortedProjects.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredAndSortedProjects.length / itemsPerPage);

  const handleUpdate = async (projectId: string, field: string, value: any) => {
    const updates: any = { [field]: value };

    try {
      setLoading(true);
      const updatedProject = await updateProject(projectId, updates);
      if (updatedProject) {
        // Si quieres actualizar el estado local de proyectos, puedes hacerlo aquí
        setProjects((prev) =>
          prev.map((p) => (p.id === projectId ? updatedProject : p)),
        );
      } else {
        alert("Error al actualizar el proyecto");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Error al actualizar el proyecto");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (
      !window.confirm("¿Estás seguro de que deseas eliminar este proyecto?")
    ) {
      return;
    }
    const success = await deleteProject(projectId);

    if (success) {
      toast.success("Proyecto eliminado exitosamente");
    } else {
      toast.error("Error al eliminar el proyecto");
    }
  };

  return (
    <div className="page projects-page">
      <div className="page-header">
        <div className="page-header-section">
          <h2 className="page-title">Mis Proyectos</h2>
          <div className="page-header-actions">
            <Link to="/projects/create" className="filter-btn primary">
              Crear Proyecto <FaPlus />
            </Link>
            {canRequestAccess && (
              <Link to="/request-access" className="filter-btn secondary">
                Solicitar Acceso a un Proyecto
              </Link>
            )}
          </div>
        </div>

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
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th
                className="editable"
                title="Doble clic para editar"
                onClick={() => requestSort("nombre")}
              >
                <div className="th-content">
                  Nombre
                  <span className="info-icon">
                    <MdEdit />
                  </span>
                </div>
              </th>
              <th
                className="editable"
                title="Doble clic para editar"
                onClick={() => requestSort("fecha_inicio")}
              >
                <div className="th-content">
                  Fecha Inicio
                  <span className="info-icon">
                    <MdEdit />
                  </span>
                </div>
              </th>
              <th
                className="editable"
                title="Doble clic para editar"
                onClick={() => requestSort("fecha_fin")}
              >
                <div className="th-content">
                  Fecha Fin
                  <span className="info-icon">
                    <MdEdit />
                  </span>
                </div>
              </th>
              <th
                className="editable"
                title="Doble clic para editar"
                onClick={() => requestSort("status")}
              >
                <div className="th-content">
                  Estatus
                  <span className="info-icon">
                    <MdEdit />
                  </span>
                </div>
              </th>
              <th
                className="editable"
                title="Doble clic para editar"
                onClick={() => requestSort("presupuesto")}
              >
                <div className="th-content">
                  Costo total
                  <span className="info-icon">
                    <MdEdit />
                  </span>
                </div>
              </th>
              <th style={{ textAlign: "right" }}>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {filteredAndSortedProjects.map((p) => (
              <tr key={p.id}>
                <td>
                  <EditableCell
                    value={p.nombre}
                    onSave={(val) => handleUpdate(p.id, "nombre", val)}
                  />
                </td>
                <td>
                  <EditableCell
                    type="date"
                    value={
                      p.fecha_inicio
                        ? new Date(p.fecha_inicio).toISOString().split("T")[0]
                        : ""
                    }
                    onSave={(val) => handleUpdate(p.id, "fecha_inicio", val)}
                  />
                </td>
                <td>
                  <EditableCell
                    type="date"
                    value={
                      p.fecha_fin
                        ? new Date(p.fecha_fin).toISOString().split("T")[0]
                        : ""
                    }
                    onSave={(val) => handleUpdate(p.id, "fecha_fin", val)}
                  />
                </td>
                <td>
                  <EditableCell
                    type="select"
                    value={p.status ? true : false}
                    options={[
                      { label: "Activo", value: true },
                      { label: "Pausado", value: false },
                    ]}
                    onSave={(val) =>
                      handleUpdate(p.id, "status", val === "true")
                    }
                  />
                </td>
                <td>
                  <EditableCell
                    type="number"
                    value={`$${(p.presupuesto ?? 0).toLocaleString()}`}
                    onSave={(val) =>
                      handleUpdate(
                        p.id,
                        "presupuesto",
                        parseFloat(String(val).replace(/[$,]/g, "")),
                      )
                    }
                  />
                </td>
                <td style={{ textAlign: "right" }}>
                  <div className="action-buttons">
                    <Link
                      to={`/projects/${p.id}/edit`}
                      className="filter-btn primary"
                      title="Editar"
                    >
                      <MdEdit />
                    </Link>
                    <Link
                      to={`/projects/${p.id}`}
                      className="filter-btn secondary"
                      title="Ver detalles"
                    >
                      <LuEye />
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="filter-btn danger"
                      title="Eliminar"
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

      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="filter-btn"
          >
            Anterior
          </button>
          <span className="pagination-span">
            Página {currentPage} de {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="filter-btn"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;
