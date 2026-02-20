import { useState } from "react";
import { authService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const executeAuthAction = async (
    action: () => Promise<any>,
    redirectPath: string,
  ) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: sbError } = await action();

      if (sbError) throw sbError;

      if (redirectPath) navigate(redirectPath);
      return data;
    } catch (err: any) {
      setError(err.message || "Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (data: any) =>
    executeAuthAction(
      () => authService.login(data.email, data.password),
      "/dashboard",
    );

  const handleGoogleLogin = () =>
    executeAuthAction(() => authService.loginWithGoogle(), "");

  return {
    loading,
    error,
    handleLogin,
    handleGoogleLogin,
  };
};
