import { supabase } from "../lib/supabase";

export const partidaService = {
  async getPartidasByFase(faseId: string) {
    const { data: fase, error: faseError } = await supabase
      .from("fase_proyecto")
      .select("proyecto_id")
      .eq("id", faseId)
      .maybeSingle();

    if (faseError) throw faseError;
    if (!fase) return [];

    let { data: catalogo, error: catError } = await supabase
      .from("catalogo_conceptos")
      .select("id")
      .eq("proyecto_id", fase.proyecto_id)
      .maybeSingle();

    if (!catalogo && !catError) {
      const { data: newCat, error: createError } = await supabase
        .from("catalogo_conceptos")
        .insert({ proyecto_id: fase.proyecto_id })
        .select("id")
        .single();

      if (createError) throw createError;
      catalogo = newCat;
    }

    if (catError) throw catError;

    const { data, error } = await supabase
      .from("partida")
      .select(
        `
      id, nombre,
      concepto (id, clave, nombre, unidad, cantidad, precio_unitario, importe, completado)
    `,
      )
      .eq("catalogo_id", catalogo?.id);

    if (error) throw error;
    return data || [];
  },

  async createPartida(partida: any) {
    return await supabase.from("partida").insert([partida]).select().single();
  },

  async updatePartida(id: string, updates: any) {
    return await supabase
      .from("partida")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
  },

  async deletePartida(id: string) {
    return await supabase.from("partida").delete().eq("id", id);
  },
};
