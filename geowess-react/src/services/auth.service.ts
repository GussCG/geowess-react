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

  async signUp(email: string, password: string, profileData: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      await supabase.from("perfil").insert({
        id: data.user.id,
        ...profileData,
      });
    }

    return data;
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
};
