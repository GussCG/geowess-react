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

  async updateEstimation(id: string, updates: any) {
    return supabase
      .from("estimacion")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
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
      )
      .order("created_at", { ascending: false })
      .limit(limit);
  },

  async updateEstimationStatus(
    id: string,
    estado: "Pendiente" | "Validada" | "Rechazada",
  ) {
    return supabase.from("estimacion").update({ estado }).eq("id", id);
  },

  async getEstimationSummary(projectId: string) {
    return supabase
      .from("estimacion")
      .select("importe_contrato, neto_recibir")
      .eq("proyecto_id", projectId);
  },

  async deleteEstimation(id: string) {
    return supabase.from("estimacion").delete().eq("id", id);
  },
};
