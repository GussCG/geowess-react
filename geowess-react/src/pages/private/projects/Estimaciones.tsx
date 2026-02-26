import { useEffect, useState, useMemo } from "react";
import { useEstimations } from "../../../hooks/useEstimation";
import { useUserContext } from "../../../context/User/UserContext";
import Loader from "../../../components/Others/Loader";
import { EditableCell } from "../../../components/Others/EditableCell";
import Icons from "../../../components/Others/IconProvider";

const { FaPlus, MdEdit, FaTrash, FaSave, FaTimes } = Icons;

function Estimaciones() {
  const { role } = useUserContext();
  const { estimations, loading } = useEstimations();
  const [isCreating, setIsCreating] = useState(false);

  const handleAddNewRow = () => {
    setIsCreating(true);
  };

  const canCreate = ["supervisor", "contratista", "administrador"].includes(
    role || "",
  );
  const canValidate = ["supervisor", "administrador"].includes(role || "");
  const canDelete = ["administrador"].includes(role || "");

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc" | null;
  }>({
    key: "created_at",
    direction: "desc",
  });

  const itemsPerPage = 10;

  const mockEstimations = [
    {
      id: "1",
      proyecto: { id: "1", nombre: "Proyecto de prueba 1" },
      fecha_inicio: "2024-01-01",
      fecha_fin: "2024-12-31",
      estado: "Pendiente",
    },
  ];

  const baseEstimations = mockEstimations;

  const filteredAndSorted = useMemo(() => {
    let processed = [...baseEstimations];

    if (searchTerm) {
      processed = processed.filter(
        (e) =>
          e.proyecto?.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.id.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (sortConfig.key && sortConfig.direction) {
      processed.sort((a: any, b: any) => {
        const aValue =
          sortConfig.key === "proyecto"
            ? a.proyecto?.nombre
            : a[sortConfig.key];
        const bValue =
          sortConfig.key === "proyecto"
            ? b.proyecto?.nombre
            : b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return processed;
  }, [baseEstimations, searchTerm, sortConfig]);

  const requestSort = (key: string) => {
    let direction: "asc" | "desc" | null = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  if (loading) return <Loader />;

  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);
  const currentItems = filteredAndSorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleUpdate = async (id: string, field: string, value: any) => {
    console.log(`Update estimation ${id}: ${field} = ${value}`);
  };

  return (
    <div className="page projects-page">
      <div className="page-header">
        <div className="page-header-section">
          <h2 className="page-title">Estimaciones de Obra</h2>
          <div className="page-header-actions">
            {canCreate && !isCreating && (
              <button className="filter-btn primary" onClick={handleAddNewRow}>
                Nueva Estimación <FaPlus />
              </button>
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
            placeholder="Buscar por proyecto o folio..."
            className="filter-btn"
            style={{ width: "250px", padding: "0.5rem 1rem" }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th onClick={() => requestSort("proyecto")}>
                <div className="th-content">Proyecto</div>
              </th>
              <th onClick={() => requestSort("fecha_inicio")}>
                <div className="th-content">Periodo Inicio</div>
              </th>
              <th onClick={() => requestSort("fecha_fin")}>
                <div className="th-content">Periodo Fin</div>
              </th>
              <th
                onClick={() => requestSort("estado")}
                className={canValidate ? "editable" : ""}
              >
                <div className="th-content">
                  Estatus {canValidate && <MdEdit className="info-icon" />}
                </div>
              </th>
              <th
                onClick={() => requestSort("importe_contrato")}
                className="editable"
              >
                <div className="th-content">
                  Importe Bruto <MdEdit className="info-icon" />
                </div>
              </th>
              <th
                onClick={() => requestSort("neto_recibir")}
                className="editable"
              >
                <div className="th-content">
                  Neto Recibir <MdEdit className="info-icon" />
                </div>
              </th>

              <th style={{ textAlign: "right" }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isCreating && (
              <tr className="new-row-highlight">
                <td>
                  <select className="filter-btn">
                    <option>Seleccionar Proyecto...</option>
                  </select>
                </td>
                <td>
                  <input type="date" className="filter-btn" />
                </td>
                <td>
                  <input type="date" className="filter-btn" />
                </td>
                <td>
                  <span className="badge pendiente">Pendiente</span>
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="filter-btn"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="filter-btn"
                  />
                </td>
                <td style={{ textAlign: "right" }}>
                  <div className="action-buttons">
                    <button className="filter-btn primary" title="Guardar">
                      <FaSave />
                    </button>
                    <button
                      className="filter-btn"
                      onClick={() => setIsCreating(false)}
                      title="Cancelar"
                    >
                      <FaTimes />
                    </button>
                  </div>
                </td>
              </tr>
            )}

            {currentItems.map((est) => (
              <tr key={est.id}>
                <td>{est.proyecto?.nombre}</td>
                <td>{est.fecha_inicio}</td>
                <td>{est.fecha_fin}</td>
                <td>
                  {canValidate ? (
                    <EditableCell
                      type="select"
                      value={est.estado}
                      options={[
                        { label: "Pendiente", value: "Pendiente" },
                        { label: "Validada", value: "Validada" },
                        { label: "Rechazada", value: "Rechazada" },
                      ]}
                      onSave={(val) => handleUpdate(est.id, "estado", val)}
                    />
                  ) : (
                    <span className={`badge ${est.estado?.toLowerCase()}`}>
                      {est.estado}
                    </span>
                  )}
                </td>
                <td>
                  <EditableCell
                    type="number"
                    value={`$${(est.importe_contrato || 0).toLocaleString()}`}
                    onSave={(val) =>
                      handleUpdate(est.id, "importe_contrato", val)
                    }
                  />
                </td>
                <td>
                  <EditableCell
                    type="number"
                    value={`$${(est.neto_recibir || 0).toLocaleString()}`}
                    onSave={(val) => handleUpdate(est.id, "neto_recibir", val)}
                  />
                </td>
                <td style={{ textAlign: "right" }}>
                  <div className="action-buttons">
                    {canDelete && (
                      <button title="Eliminar" className="filter-btn danger">
                        <FaTrash />
                      </button>
                    )}
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

export default Estimaciones;
