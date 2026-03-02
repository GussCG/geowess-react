import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Icons from "../../../components/Others/IconProvider";
import { usePhases } from "../../../hooks/usePhases";
import { usePartidas } from "../../../hooks/usePartidas";
import { useConceptos } from "../../../hooks/useConceptos";
import Loader from "../../../components/Others/Loader";
import { EditableCell } from "../../../components/Others/EditableCell";
import { toast } from "react-toastify";
import { supabase } from "../../../lib/supabase";
import { generateClave } from "../../../utils/generateClaveConcepto";
import { UNITS } from "../../../constants/units";
import { motion, AnimatePresence } from "framer-motion";

const {
  FaPlus,
  FaFileDownload,
  FaTrash,
  FaChevronDown,
  FaCheckCircle,
  FaRegCircle,
  FaTimes,
  FaSave,
} = Icons;

function ProjectPartidas() {
  const { idFase } = useParams<{ idFase: string }>();
  const { getPhaseById } = usePhases();
  const {
    partidas,
    loading,
    fetchPartidas,
    addPartida,
    deletePartida,
    updatePartida,
  } = usePartidas();
  const { addConcepto, updateConcepto, deleteConcepto } = useConceptos();

  const [phase, setPhase] = useState<any>(null);
  const [expandedPartidas, setExpandedPartidas] = useState<string[]>([]);

  const [isCreatingPartida, setIsCreatingPartida] = useState(false);
  const [newPartidaName, setNewPartidaName] = useState("");

  const [creatingInPartida, setCreatingInPartida] = useState<string | null>(
    null,
  );
  const [newRow, setNewRow] = useState({
    clave: "",
    nombre: "",
    unidad: "",
    cantidad: 0,
    precio_unitario: 0,
  });
  const [isCustomUnit, setIsCustomUnit] = useState(false);

  useEffect(() => {
    if (idFase) {
      getPhaseById(idFase).then((data) => setPhase(data));
      fetchPartidas(idFase);
    }
  }, [idFase]);

  const toggleAccordion = (partidaId: string) => {
    setExpandedPartidas((prev) =>
      prev.includes(partidaId)
        ? prev.filter((id) => id !== partidaId)
        : [...prev, partidaId],
    );
  };

  const handleSavePartida = async () => {
    if (!newPartidaName.trim()) return toast.warn("Escribe un nombre");

    try {
      const faseData = await getPhaseById(idFase!);

      if (!faseData || !faseData.proyecto_id) {
        return toast.error("No se encontró el proyecto asociado a esta fase");
      }

      const { data: catData } = await supabase
        .from("catalogo_conceptos")
        .select("id")
        .eq("proyecto_id", faseData.proyecto_id)
        .maybeSingle();

      if (!catData) {
        return toast.error("No hay un catálogo creado para este proyecto");
      }

      await addPartida({
        nombre: newPartidaName,
        catalogo_id: catData.id,
      });

      setIsCreatingPartida(false);
      setNewPartidaName("");
      fetchPartidas(idFase!);
    } catch (error) {
      console.error("Error completo:", error);
      toast.error("Error al vincular con el catálogo");
    }
  };

  const handleSaveNewConcepto = async (
    partidaId: string,
    partidaNombre: string,
  ) => {
    if (!newRow.nombre) return toast.warn("Nombre obligatorio");
    if (!newRow.unidad) return toast.warn("Unidad obligatoria");

    const claveAuto = generateClave(partidaNombre);

    const datosParaInsertar = {
      ...newRow,
      clave: generateClave(partidaNombre),
      partida_id: partidaId,
      completado: false,
    };

    const data = await addConcepto(datosParaInsertar);
    if (data) {
      setCreatingInPartida(null);
      setNewRow({
        clave: "",
        nombre: "",
        unidad: "",
        cantidad: 0,
        precio_unitario: 0,
      });
      setIsCustomUnit(false);
      fetchPartidas(idFase!);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="page projects-page">
      <div className="page-header">
        <div className="page-header-section">
          <h2 className="page-title partidas-title">
            Detalles de Partidas
            <span className="page-subtitle">
              {phase?.proyecto?.nombre} | {phase?.nombre}
            </span>
          </h2>
          <div className="page-header-actions">
            {!isCreatingPartida && (
              <button
                className="filter-btn primary"
                onClick={() => setIsCreatingPartida(true)}
              >
                Nueva Partida <FaPlus />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th style={{ width: "50px" }}></th>
              <th>Clave / Partida</th>
              <th>Descripción</th>
              <th>Unidad</th>
              <th>Cant.</th>
              <th>P.U.</th>
              <th>Importe</th>
              <th style={{ textAlign: "right" }}>Acciones</th>
            </tr>
          </thead>

          {isCreatingPartida && (
            <tbody>
              <tr className="new-row-highlight">
                <td></td>
                <td colSpan={6}>
                  <input
                    type="text"
                    className="filter-btn"
                    style={{ width: "100%" }}
                    placeholder="Nombre de la nueva partida..."
                    value={newPartidaName}
                    onChange={(e) => setNewPartidaName(e.target.value)}
                    autoFocus
                  />
                </td>
                <td style={{ textAlign: "right" }}>
                  <div className="action-buttons">
                    <button
                      className="filter-btn primary"
                      onClick={handleSavePartida}
                    >
                      <FaSave />
                    </button>
                    <button
                      className="filter-btn"
                      onClick={() => setIsCreatingPartida(false)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          )}

          {partidas.map((partida) => (
            <tbody key={partida.id} className="partida-tbody">
              <tr
                className="partida-header-row"
                style={{ position: "relative" }}
              >
                <td
                  onClick={() => toggleAccordion(partida.id)}
                  style={{ cursor: "pointer" }}
                >
                  <FaChevronDown
                    className={`arrow-icon ${expandedPartidas.includes(partida.id) ? "rotated" : ""}`}
                  />
                </td>
                <td
                  colSpan={5}
                  onClick={() => toggleAccordion(partida.id)}
                  style={{ cursor: "pointer" }}
                >
                  <EditableCell
                    value={partida.nombre}
                    onSave={(v) => updatePartida(partida.id, { nombre: v })}
                  />
                </td>
                <td>
                  <strong>${partida.total?.toLocaleString() || "0.00"}</strong>
                </td>
                <td style={{ textAlign: "right" }}>
                  <div className="action-buttons">
                    <button
                      className="filter-btn primary"
                      onClick={() => {
                        if (!expandedPartidas.includes(partida.id))
                          toggleAccordion(partida.id);
                        setCreatingInPartida(partida.id);
                      }}
                      title="Agregar Concepto"
                    >
                      <FaPlus />
                    </button>
                    <button
                      className="filter-btn secondary"
                      title="Descargar PDF"
                    >
                      <FaFileDownload />
                    </button>
                    <button
                      className="filter-btn danger"
                      onClick={() => deletePartida(partida.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>

              <AnimatePresence mode="popLayout">
                {expandedPartidas.includes(partida.id) && (
                  <>
                    {creatingInPartida === partida.id && (
                      <motion.tr
                        className="new-row-highlight"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <td></td>
                        <td>
                          <input
                            type="text"
                            className="filter-btn"
                            style={{
                              opacity: 0.4,
                              cursor: "not-allowed",
                            }}
                            placeholder="Clave"
                            value={
                              newRow.nombre
                                ? `${partida.nombre.substring(0, 2).toUpperCase()}-XXXXXX`
                                : "Esperando nombre..."
                            }
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="filter-btn"
                            placeholder="Nombre"
                            value={newRow.nombre}
                            onChange={(e) =>
                              setNewRow({ ...newRow, nombre: e.target.value })
                            }
                          />
                        </td>
                        <td>
                          {!isCustomUnit ? (
                            <select
                              className="filter-btn"
                              value={isCustomUnit ? "custom" : newRow.unidad}
                              onChange={(e) => {
                                if (e.target.value === "custom") {
                                  setIsCustomUnit(true);
                                  setNewRow({ ...newRow, unidad: "" });
                                } else {
                                  setIsCustomUnit(false);
                                  setNewRow({
                                    ...newRow,
                                    unidad: e.target.value,
                                  });
                                }
                              }}
                            >
                              <option value="">Unidades</option>
                              {UNITS.map((unit) => (
                                <option
                                  key={unit.value}
                                  value={unit.value}
                                  style={{
                                    color:
                                      unit.value === "custom"
                                        ? "orange"
                                        : "inherit",
                                    fontWeight:
                                      unit.value === "custom"
                                        ? "600"
                                        : "normal",
                                  }}
                                >
                                  {unit.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <div style={{ display: "flex", gap: "4px" }}>
                              <input
                                type="text"
                                className="filter-btn"
                                style={{
                                  width: "80px",
                                  border: "1px solid #ff9800",
                                }}
                                placeholder="¿Cuál?"
                                value={newRow.unidad}
                                autoFocus
                                onChange={(e) =>
                                  setNewRow({
                                    ...newRow,
                                    unidad: e.target.value,
                                  })
                                }
                              />
                              <button
                                className="filter-btn"
                                onClick={() => setIsCustomUnit(false)}
                                title="Volver a la lista"
                              >
                                <FaTimes style={{ fontSize: "10px" }} />
                              </button>
                            </div>
                          )}
                        </td>
                        <td>
                          <input
                            type="number"
                            className="filter-btn"
                            value={newRow.cantidad}
                            onChange={(e) =>
                              setNewRow({
                                ...newRow,
                                cantidad: Number(e.target.value),
                              })
                            }
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            className="filter-btn"
                            value={newRow.precio_unitario}
                            onChange={(e) =>
                              setNewRow({
                                ...newRow,
                                precio_unitario: Number(e.target.value),
                              })
                            }
                          />
                        </td>
                        <td>
                          $
                          {(
                            newRow.cantidad * newRow.precio_unitario
                          ).toLocaleString()}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          <div className="action-buttons">
                            <button
                              className="filter-btn primary"
                              onClick={() =>
                                handleSaveNewConcepto(
                                  partida.id,
                                  partida.nombre,
                                )
                              }
                            >
                              <FaSave />
                            </button>
                            <button
                              className="filter-btn"
                              onClick={() => setCreatingInPartida(null)}
                            >
                              <FaTimes />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    )}

                    {partida.concepto?.map((c: any, index: number) => (
                      <motion.tr
                        key={c.id}
                        layout
                        className="concepto-row"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <td></td>
                        <td>
                          <EditableCell
                            value={c.clave}
                            onSave={(v) =>
                              updateConcepto(c.id, { clave: v }).then(() =>
                                fetchPartidas(idFase!),
                              )
                            }
                          />
                        </td>
                        <td>
                          <EditableCell
                            value={c.nombre}
                            onSave={(v) =>
                              updateConcepto(c.id, { nombre: v }).then(() =>
                                fetchPartidas(idFase!),
                              )
                            }
                          />
                        </td>
                        <td>
                          <EditableCell
                            type="select"
                            options={UNITS}
                            value={c.unidad}
                            onSave={(v) =>
                              updateConcepto(c.id, { unidad: v }).then(() =>
                                fetchPartidas(idFase!),
                              )
                            }
                          />
                        </td>
                        <td>
                          <EditableCell
                            value={c.cantidad}
                            onSave={(v) =>
                              updateConcepto(c.id, {
                                cantidad: Number(v),
                              }).then(() => fetchPartidas(idFase!))
                            }
                          />
                        </td>
                        <td>
                          <EditableCell
                            value={c.precio_unitario}
                            onSave={(v) =>
                              updateConcepto(c.id, {
                                precio_unitario: Number(v),
                              }).then(() => fetchPartidas(idFase!))
                            }
                          />
                        </td>
                        <td>${c.importe?.toLocaleString()}</td>
                        <td style={{ textAlign: "right" }}>
                          <button
                            className="filter-btn danger"
                            onClick={() =>
                              deleteConcepto(c.id).then(() =>
                                fetchPartidas(idFase!),
                              )
                            }
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </>
                )}
              </AnimatePresence>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}

export default ProjectPartidas;
