import { useState } from "react";
import { phaseService } from "../services/phase.service";
import { toast } from "react-toastify";
import { calculateProgressMetrics } from "../utils/calculations";

export function usePhases() {
  const [phases, setPhases] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPhases = async (projectId: string) => {
    if (!projectId) return;
    setLoading(true);
    try {
      const { data, error } = await phaseService.getPhasesByProject(projectId);
      if (error) throw error;

      const { phasesWithProgress } = calculateProgressMetrics(data);
      setPhases(phasesWithProgress);
      console.log("Phases with progress:", phasesWithProgress);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al calcular avance de fases");
    } finally {
      setLoading(false);
    }
  };

  const addPhase = async (phase: any) => {
    setLoading(true);
    try {
      const { data, error } = await phaseService.createPhase(phase);
      if (error) throw error;

      setPhases((prev) => [...prev, data]);
      toast.success("Fase creada exitosamente");
    } catch (error) {
      console.error("Error creating phase:", error);
      toast.error("Error al crear la fase");
    } finally {
      setLoading(false);
    }
  };

  const updatePhase = async (id: string, updates: any) => {
    setLoading(true);
    try {
      const { data, error } = await phaseService.updatePhase(id, updates);
      if (error) throw error;
      setPhases((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...data } : p)),
      );
      toast.success("Fase actualizada exitosamente");
    } catch (error) {
      console.error("Error updating phase:", error);
      toast.error("Error al actualizar la fase");
    } finally {
      setLoading(false);
    }
  };

  const deletePhase = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await phaseService.deletePhase(id);
      if (error) throw error;
      setPhases((prev) => prev.filter((p) => p.id !== id));
      toast.success("Fase eliminada exitosamente");
    } catch (error) {
      console.error("Error deleting phase:", error);
      toast.error("Error al eliminar la fase");
    } finally {
      setLoading(false);
    }
  };

  const getPhaseById = async (id: string) => {
    const local = phases.find((p) => p.id === id);
    if (local) return local;

    const { data, error } = await phaseService.getPhaseById(id);
    if (error) return null;
    return data;
  };

  return {
    phases,
    loading,
    fetchPhases,
    addPhase,
    updatePhase,
    deletePhase,
    getPhaseById,
  };
}
