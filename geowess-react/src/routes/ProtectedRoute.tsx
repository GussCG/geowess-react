import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { isProfileComplete } from "../utils/isProfileComplete";

export const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        setLoading(false);
        return;
      }

      setSession(session);

      const { data } = await supabase
        .from("perfil")
        .select("*")
        .eq("id", session.user.id)
        .single();

      setProfile(data);
      setLoading(false);
    };

    checkSession();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!session) return <Navigate to="/login" replace />;
  if (!isProfileComplete(profile))
    return <Navigate to="/editar-perfil" replace />;

  return <Outlet />;
};
