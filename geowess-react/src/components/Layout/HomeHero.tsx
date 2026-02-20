import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Hero() {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typed = new Typed(el.current!, {
      strings: [
        "Alguna idea?",
        "Un sueño?",
        "Tienes un proyecto en mente?",
        "Te ayudamos a hacerlo realidad!",
      ],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <motion.div className="hero home">
      <div className="hero-bg"></div>

      <div className="hero-dots">
        <div className="hero-dot" />
        <div className="hero-dot" />
        <div className="hero-dot" />
      </div>

      <h1 className="hero-title">
        <code className="hero-title-code">&lt;</code>
        <span className="hero-title-span" ref={el}></span>
        <code className="hero-title-code">/&gt;</code>
      </h1>

      <div className="hero-btn">
        {/* <img src="/images/cohete.gif" /> */}
        <Link to="/registro">Comenzar</Link>
      </div>
    </motion.div>
  );
}
