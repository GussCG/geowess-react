import { useState, useEffect } from "react";
import { estimationService } from "../services/estimation.service";

export function useEstimations(projectId?: string) {
  const [estimations, setEstimations] = useState<any[]>([]);

  useEffect(() => {
    async function fetch() {
      if (projectId) {
        const { data } =
          await estimationService.getProjectEstimations(projectId);
        setEstimations(data ?? []);
      } else {
        const { data } = await estimationService.getRecentEstimations();
        setEstimations(data ?? []);
      }
    }

    fetch();
  }, [projectId]);

  return { estimations };
}
