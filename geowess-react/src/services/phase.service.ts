import { supabase } from "../lib/supabase";

export const phaseService = {
  async calculateProjectProgress(projectId: string) {
    const { data, error } = await supabase.rpc("calcular_progreso_proyecto", {
      p_proyecto_id: projectId,
    });

    if (error) throw error;

    return data ?? 0;
  },

  async getPhases(projectId: string) {
    return supabase.from("fase").select("*").eq("proyecto_id", projectId);
  },

  async createPhase(phase: any) {
    return supabase.from("fase").insert(phase);
  },

  async updatePhase(id: string, updates: any) {
    return supabase.from("fase").update(updates).eq("id", id);
  },
};
