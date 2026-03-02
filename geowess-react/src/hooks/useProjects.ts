import { useState, useEffect } from "react";
import { projectService } from "../services/project.service";

export function useProjects(role: string | null, userId?: string) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getProject = async (id: string) => {
    setLoading(true);
    try {
      const { data, error } = await projectService.getProjectById(id);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error fetching project:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (project: any) => {
    setLoading(true);

    try {
      const { data, error } = await projectService.createProject(project);
      if (error) throw error;

      setProjects((prev) => [...prev, data]);
      return data;
    } catch (error) {
      console.error("Error creating project:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateProject = async (id: string, updates: any) => {
    setLoading(true);

    try {
      const { data, error } = await projectService.updateProject(id, updates);
      if (error) throw error;

      setProjects((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...data } : p)),
      );

      return data;
    } catch (error) {
      console.error("Error updating project:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await projectService.deleteProject(id);

      if (error) {
        console.error("Error real de Supabase:", error.message);
        return false;
      }

      setProjects((prev) => prev.filter((p) => p.id !== id));
      return true;
    } catch (error) {
      console.error("Error en la petición:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

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

  return {
    projects,
    setProjects,
    loading,
    setLoading,
    getProject,
    updateProject,
    createProject,
    deleteProject,
  };
}
