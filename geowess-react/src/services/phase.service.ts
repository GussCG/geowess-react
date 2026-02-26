import { supabase } from "../lib/supabase";

export const phaseService = {
  async getPhasesByProject(projectId: string) {
    return await supabase
      .from("fase_proyecto")
      .select("*")
      .eq("proyecto_id", projectId);
  },

  async createPhase(phase: {
    nombre: string;
    fecha_inicio: string;
    fecha_fin: string;
    proyecto_id: string;
  }) {
    return await supabase
      .from("fase_proyecto")
      .insert([phase])
      .select()
      .single();
  },

  async updatePhase(id: string, updates: any) {
    return await supabase
      .from("fase_proyecto")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
  },

  async deletePhase(id: string) {
    return await supabase.from("fase_proyecto").delete().eq("id", id);
  },

  async calculateProjectProgress(projectId: string) {
    const { data, error } = await supabase.rpc("calcular_progreso_proyecto", {
      p_proyecto_id: projectId,
    });
    if (error) throw error;
    return data ?? 0;
  },
};
