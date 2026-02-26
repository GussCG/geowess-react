import { useState } from "react";
import { authService } from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../context/User/UserContext";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { refreshUser } = useUserContext();

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

  const handleRegister = async (data: any) => {
    setLoading(true);
    setError(null);

    try {
      await authService.signUp(data.email, data.password, data);

      toast.success(
        "Registro exitoso. Por favor, verifica tu correo para activar tu cuenta.",
      );

      navigate("/login");
    } catch (err: any) {
      toast.error(
        err.message || "Ocurrió un error inesperado durante el registro",
      );
      setError(
        err.message || "Ocurrió un error inesperado durante el registro",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (userId: string, data: any) => {
    setLoading(true);
    setError(null);

    try {
      const result = await authService.updateProfile(userId, data);

      if (result.error) throw result.error;

      toast.success("Perfil actualizado correctamente");
      refreshUser();
      navigate("/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Error actualizando perfil");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleLogin,
    handleGoogleLogin,
    handleRegister,
    handleUpdateProfile,
  };
};
