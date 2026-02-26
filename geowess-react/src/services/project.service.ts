import { supabase } from "../lib/supabase";

export const projectService = {
  async getUserProjects(userId: string) {
    return supabase
      .from("proyecto")
      .select(
        `
        *,
        supervisor:perfil!supervisor_id (id, nombre, ap_paterno, ap_materno)
      `,
      )
      .eq("creado_por", userId);
  },

  async getProjectById(id: string) {
    return supabase
      .from("proyecto")
      .select(
        `
      *,
      supervisor:perfil!supervisor_id (id, nombre, ap_paterno, ap_materno)
    `,
      )
      .eq("id", id)
      .single();
  },

  async getAllProjects() {
    return supabase.from("proyecto").select(`
        *,
        supervisor:perfil!supervisor_id (id, nombre, ap_paterno, ap_materno)
      `);
  },

  async createProject(project: any) {
    return supabase.from("proyecto").insert(project).select().single();
  },

  async updateProject(id: string, updates: any) {
    return supabase
      .from("proyecto")
      .update(updates)
      .eq("id", id)
      .select(
        `
        *,
        supervisor:perfil!supervisor_id (id, nombre, ap_paterno, ap_materno)
      `,
      )
      .single();
  },

  async deleteProject(id: string) {
    return supabase.from("proyecto").delete().eq("id", id);
  },
};
