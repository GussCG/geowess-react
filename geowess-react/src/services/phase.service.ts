import { supabase } from "../lib/supabase";

export const phaseService = {
  async getPhasesByProject(projectId: string) {
    const phasesPromise = supabase
      .from("fase_proyecto")
      .select("*")
      .eq("proyecto_id", projectId);

    const catalogPromise = supabase
      .from("catalogo_conceptos")
      .select(
        `
        id,
        partida (
          id,
          nombre,
          concepto (
            id,
            importe,
            completado,
            partida_id
          )
        )
      `,
      )
      .eq("proyecto_id", projectId);

    const [phasesRes, catalogRes] = await Promise.all([
      phasesPromise,
      catalogPromise,
    ]);

    if (phasesRes.error) return phasesRes;
    if (catalogRes.error) return catalogRes;

    return {
      data: phasesRes.data.map((phase) => ({
        ...phase,
        catalogo_conceptos: catalogRes.data,
      })),
      error: null,
    };
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

  async getPhaseById(id: string) {
    return await supabase
      .from("fase_proyecto")
      .select("*, proyecto(nombre)")
      .eq("id", id)
      .single();
  },
};
