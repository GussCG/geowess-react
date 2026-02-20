import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Icons from "../Others/IconProvider";

const { GeoWessLogo } = Icons;

export default function About() {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typed = new Typed(el.current!, {
      strings: ["¿Quiénes somos?"],
      typeSpeed: 50,
      backSpeed: 50,
      loop: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <motion.div className="hero about">
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

      <div className="hero-about-content">
        <p>
          En{" "}
          <span className="logo-container">
            <GeoWessLogo />
          </span>
          , nos apasiona hacer realidad tu proyecto de ensueño y ofrecer
          soluciones innovadoras y eficientes. Nuestro equipo de (un)
          profesional(es) altamente cualificados y dedicados, especializados en
          brindar servicios y soluciones informáticas para proyectos de
          construcción.
        </p>
        <p>
          Entendemos que cada organización es única y enfrenta desafíos
          específicos, por lo que nos comprometemos a ofrecer soluciones a
          medida que se adapten a sus necesidades individuales.
        </p>
      </div>

      <div className="hero-btn">
        {/* <img src="/images/cohete.gif" /> */}
        <Link to="/registro">Comenzar</Link>
      </div>
    </motion.div>
  );
}
