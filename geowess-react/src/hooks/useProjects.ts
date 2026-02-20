import { useState, useEffect } from "react";
import { projectService } from "../services/project.service";

export function useProjects(role: string | null, userId?: string) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!role) return;

    async function fetchProjects() {
      setLoading(true);

      let response;

      if (role === "administrador") {
        response = await projectService.getAllProjects();
      } else {
        response = await projectService.getUserProjects(userId!);
      }

      setProjects(response.data ?? []);
      setLoading(false);
    }

    fetchProjects();
  }, [role, userId]);

  return { projects, loading };
}
