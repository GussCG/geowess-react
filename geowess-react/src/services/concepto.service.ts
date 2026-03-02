import { supabase } from "../lib/supabase";

export const conceptoService = {
  async updateConcepto(id: string, updates: any) {
    return await supabase
      .from("concepto")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
  },

  async createConcepto(concepto: any) {
    return await supabase.from("concepto").insert([concepto]).select().single();
  },

  async deleteConcepto(id: string) {
    return await supabase.from("concepto").delete().eq("id", id);
  },

  async getConceptosByPartida(partidaId: string) {
    const { data, error } = await supabase
      .from("concepto")
      .select("*")
      .eq("partida_id", partidaId);

    if (error) throw error;
    return data;
  },
};
