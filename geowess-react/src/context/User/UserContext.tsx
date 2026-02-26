import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { userService } from "../../services/user.service";

const UserContext = createContext<any>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{
    user: any | null;
    profile: any | null;
    role: string | null;
    loading: boolean;
    error: any;
  }>({
    user: null,
    profile: null,
    role: null,
    loading: true,
    error: null,
  });

  const fetchUser = async () => {
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

    const { data: profile } = await userService.getProfile(user.id);

    const { data: roleData } = await supabase
      .from("usuario_rol")
      .select("rol(nombre)")
      .eq("usuario_id", user.id)
      .single();

    const rolName = roleData?.rol?.nombre ?? null;

    setState({
      user,
      profile,
      role: rolName,
      loading: false,
      error: null,
    });
  };

  useEffect(() => {
    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      fetchUser();
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const refreshUser = () => fetchUser();

  return (
    <UserContext.Provider value={{ ...state, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
