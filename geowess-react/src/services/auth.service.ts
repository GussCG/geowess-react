import { supabase } from "../lib/supabase";

export const authService = {
  async login(email: string, password: string) {
    return await supabase.auth.signInWithPassword({ email, password });
  },

  async loginWithGoogle() {
    return await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });
  },

  async signUp(email: string, password: string, extraData: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre: extraData.nombre,
          ap_paterno: extraData.ap_paterno,
          ap_materno: extraData.ap_materno,
          fecha_nac: extraData.fecha_nac,
          telefono: extraData.telefono,
          rfc: extraData.rfc,
          rol: extraData.rol,
        },
      },
    });

    if (error) throw error;

    return { data, error: null };
  },

  async logout() {
    return await supabase.auth.signOut();
  },

  async resetPassword(email: string) {
    return supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
  },

  async updatePassword(newPassword: string) {
    return supabase.auth.updateUser({ password: newPassword });
  },

  async updateProfile(userId: string, profileData: any) {
    const { rol, ...perfilData } = profileData;

    const perfilUpdate = await supabase
      .from("perfil")
      .update(perfilData)
      .eq("id", userId);

    if (perfilUpdate.error) throw perfilUpdate.error;

    if (rol) {
      const { data: rolData, error: rolError } = await supabase
        .from("rol")
        .select("id")
        .eq("nombre", rol)
        .single();

      if (rolError) throw rolError;
      if (!rolData) throw new Error("Rol no encontrado");

      await supabase
        .from("usuario_rol")
        .update({ rol_id: rolData.id })
        .eq("usuario_id", userId);
    }

    return perfilUpdate;
  },
};
