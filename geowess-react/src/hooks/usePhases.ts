import { useState } from "react";
import { phaseService } from "../services/phase.service";
import { toast } from "react-toastify";

export function usePhases() {
  const [phases, setPhases] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPhases = async (projectId: string) => {
    if (!projectId) return;

    setLoading(true);
    try {
      const { data, error } = await phaseService.getPhasesByProject(projectId);
      if (error) throw error;
      setPhases(data || []);
    } catch (error) {
      console.error("Error fetching phases:", error);
      toast.error("Error al cargar las fases", {
        toastId: "fetch-phases-error",
      });
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

  return {
    phases,
    loading,
    fetchPhases,
    addPhase,
    updatePhase,
    deletePhase,
  };
}
