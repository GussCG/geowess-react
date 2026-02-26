import { useState, useEffect, useCallback } from "react";
import { estimationService } from "../services/estimation.service";

export function useEstimations(projectId?: string) {
  const [estimations, setEstimations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEstimations = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = projectId
        ? await estimationService.getProjectEstimations(projectId)
        : await estimationService.getRecentEstimations();
      setEstimations(data ?? []);
    } catch (error) {
      console.error("Error fetching estimations:", error);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  const createEstimation = async (newEstimation: any) => {
    const { data, error } = await estimationService.createEstimation({
      ...newEstimation,
      proyecto_id: projectId,
    });
    if (!error) fetchEstimations();
    return { data, error };
  };

  const updateEstimation = async (id: string, updates: any) => {
    const { data, error } = await estimationService.updateEstimation(
      id,
      updates,
    );
    if (!error) fetchEstimations();
    return { data, error };
  };

  useEffect(() => {
    fetchEstimations();
  }, [fetchEstimations]);

  return {
    estimations,
    loading,
    reload: fetchEstimations,
    createEstimation,
    updateEstimation,
  };
}
