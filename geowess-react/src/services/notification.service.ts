import { supabase } from "../lib/supabase";

export const notificationService = {
  async getUnread(userId: string) {
    return supabase
      .from("notificacion")
      .select("*")
      .eq("usuario_id", userId)
      .eq("visto", false);
  },

  async getRecent(userId: string) {
    return supabase
      .from("notificacion")
      .select("*")
      .eq("usuario_id", userId)
      .order("created_at", { ascending: false })
      .limit(5);
  },
};
