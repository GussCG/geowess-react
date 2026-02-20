import { supabase } from "../lib/supabase";

export const estimationService = {
  async getUniqueConcepts() {
    const { data, error } = await supabase
      .from("concepto")
      .select("nombre, importe");

    if (error) throw error;
    if (!data) return [];

    const unique = Array.from(
      new Map(data.map((item) => [item.nombre, item])).values(),
    );

    return unique;
  },

  async createEstimation(estimation: any) {
    return supabase.from("estimacion").insert(estimation).select().single();
  },

  async getProjectEstimations(projectId: string) {
    return supabase.from("estimacion").select("*").eq("proyecto_id", projectId);
  },

  async getRecentEstimations(limit = 5) {
    return supabase
      .from("estimacion")
      .select(
        `
      *,
      proyecto:proyecto_id ( nombre )
    `,
      ) // Esto hace un join para traer el nombre del proyecto
      .order("created_at", { ascending: false })
      .limit(limit);
  },
};
