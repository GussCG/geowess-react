import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";
import Typed from "typed.js";
import { Link } from "react-router-dom";
import Icons from "../Others/IconProvider";

const { LuEyeClosed, LuEye, FcGoogle, GeoWessLogo } = Icons;

const loginSchema = z.object({
  email: z.string().min(1, "El correo es requerido").email("Correo inválido"),
  password: z
    .string()
    .min(1, "La contraseña es requerida")
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

function LoginHero() {
  const {
    handleLogin,
    loading,
    error: authError,
    handleGoogleLogin,
  } = useAuth();
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const emailValue = watch("email", "");
  const passwordValue = watch("password", "");

  const onSubmit = (data: LoginFormInputs) => {
    handleLogin(data);
  };

  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typed = new Typed(el.current!, {
      strings: ["Iniciar Sesión"],
      typeSpeed: 50,
      backSpeed: 50,
      loop: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <motion.div className="hero login split-layout">
      <div className="hero-bg"></div>
      <div className="hero-dots">
        <div className="hero-dot" />
        <div className="hero-dot" />
        <div className="hero-dot" />
      </div>

      <div className="login-card">
        <div className="login-section form-side">
          <h1 className="hero-title">
            <code className="hero-title-code">&lt;</code>
            <span ref={el}></span>
            <code className="hero-title-code">/&gt;</code>
          </h1>

          <div className="login-content">
            <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
              <div
                className={`field ${emailValue ? "has-value" : ""} ${errors.email ? "has-error" : ""}`}
              >
                <div className="input-wrapper">
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    autoComplete="off"
                    className={emailValue ? "has-value" : ""}
                  />
                  <label htmlFor="email">Correo electrónico</label>
                </div>
                {errors.email && (
                  <span className="error-msg">{errors.email.message}</span>
                )}
              </div>

              <div
                className={`field ${passwordValue ? "has-value" : ""} ${errors.password ? "has-error" : ""}`}
              >
                <div className="input-wrapper">
                  <input
                    {...register("password")}
                    type={showPass ? "text" : "password"}
                    id="password"
                    autoComplete="off"
                    className={passwordValue ? "has-value" : ""}
                  />
                  <label htmlFor="password">Contraseña</label>

                  <button
                    type="button"
                    className="show-pass-btn"
                    onClick={() => setShowPass(!showPass)}
                    tabIndex={-1} // Evita que el tabulador se detenga en el ojo
                  >
                    {showPass ? <LuEye /> : <LuEyeClosed />}
                  </button>
                </div>
                {errors.password && (
                  <span className="error-msg">{errors.password.message}</span>
                )}
              </div>

              {authError && (
                <div className="auth-error-container">
                  <span className="error-msg">{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="hero-btn-submit"
                disabled={loading}
              >
                {loading ? "Verificando..." : "Entrar"}
              </button>
            </form>

            <div className="social-login">
              <div className="separator">
                <span>o</span>
              </div>

              <button
                type="button"
                className="google-btn"
                onClick={() => {
                  handleGoogleLogin();
                }}
              >
                <FcGoogle /> {/* Asegúrate de tenerlo en tu IconProvider */}
                Continuar con Google
              </button>
            </div>
          </div>

          <div className="login-footer">
            <Link to="/recuperar" className="register-link">
              ¿Olvidaste tu contraseña?
            </Link>
            <p>
              ¿No tienes cuenta aún?
              <Link to="/registro" className="register-link">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>

        <div className="login-section visual-side">
          <div className="visual-content">
            <div className="placeholder-logo">
              <span className="logo-wrapper">
                <GeoWessLogo />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default LoginHero;
