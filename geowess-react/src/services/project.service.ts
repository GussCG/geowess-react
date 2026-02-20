import { supabase } from "../lib/supabase";

export const projectService = {
  async getUserProjects(userId: string) {
    return supabase.from("proyecto").select("*").eq("creado_por", userId);
  },

  async getProjectById(id: string) {
    return supabase.from("proyecto").select("*").eq("id", id).single();
  },

  async createProject(project: any) {
    return supabase.from("proyecto").insert(project).select().single();
  },

  async updateProject(id: string, updates: any) {
    return supabase.from("proyecto").update(updates).eq("id", id);
  },

  async deleteProject(id: string) {
    return supabase.from("proyecto").delete().eq("id", id);
  },

  async getAllProjects() {
    return supabase.from("proyecto").select("*");
  },
};
