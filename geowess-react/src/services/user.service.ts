import { supabase } from "../lib/supabase";

export const userService = {
  async getProfile(userId: string) {
    return supabase.from("perfil").select("*").eq("id", userId).single();
  },

  async updateProfile(updates: any) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) throw new Error("Usuario no autenticado");

    return supabase
      .from("perfil")
      .update(updates)
      .eq("id", user.id)
      .select()
      .single();
  },

  async assignContractor(
    userId: string,
    repLegal: string,
    supervisante: string,
  ) {
    return supabase.rpc("asignar_contratista", {
      p_usuario: userId,
      p_rep_legal: repLegal,
      p_supervisante: supervisante,
    });
  },
};
