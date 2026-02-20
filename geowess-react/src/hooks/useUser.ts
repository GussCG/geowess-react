import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { userService } from "../services/user.service";

interface User {
  user: any;
  profile: any;
  role: string | null;
  loading: boolean;
  error: string | null;
}

export function useUser() {
  const [state, setState] = useState<User>({
    user: null,
    profile: null,
    role: null,
    loading: true,
    error: null,
  });
  useEffect(() => {
    async function fetchUser() {
      try {
        setState((prev) => ({ ...prev, loading: true }));

        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setState({
            user: null,
            profile: null,
            role: null,
            loading: false,
            error: null,
          });
          return;
        }

        const { data: profile, error: profileError } =
          await userService.getProfile(user.id);

        if (profileError) throw profileError;

        const { data: roleData, error: roleError } = await supabase
          .from("usuario_rol")
          .select("rol(nombre)")
          .eq("usuario_id", user.id)
          .single();

        if (roleError) throw roleError;

        setState({
          user,
          profile,
          role: roleData?.rol?.nombre ?? null,
          loading: false,
          error: null,
        });
      } catch (err: any) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: err.message,
        }));
      }
    }

    fetchUser();
  }, []);

  return state;
}
