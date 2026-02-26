import { useRef, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";
import Typed from "typed.js";
import ProfileForm from "./ProfileForm";

function SignUpHero() {
  const { handleRegister, loading } = useAuth();

  const onSubmit = (data: any) => {
    handleRegister(data);
  };

  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typed = new Typed(el.current!, {
      strings: ["Crear Cuenta"],
      typeSpeed: 50,
      backSpeed: 50,
      loop: false,
    });

    return () => typed.destroy();
  }, []);

  return (
    <motion.div className="hero signup">
      <div className="hero-bg"></div>
      <div className="hero-dots">
        <div className="hero-dot" />
        <div className="hero-dot" />
        <div className="hero-dot" />
      </div>

      <div className="signup-card">
        <div className="signup-section">
          <h1 className="hero-title">
            <code className="hero-title-code">&lt;</code>
            <span ref={el}></span>
            <code className="hero-title-code">/&gt;</code>
          </h1>

          <div className="signup-content">
            <ProfileForm onSubmit={onSubmit} loading={loading} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SignUpHero;
