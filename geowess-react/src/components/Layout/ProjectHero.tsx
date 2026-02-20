import { useRef, useEffect } from "react";
import Typed from "typed.js";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import Icons from "../Others/IconProvider";

const { IoIosArrowBack, IoIosArrowForward } = Icons;

import project1 from "../../assets/projects-example/proyecto1-ejem.jpg";
import project2 from "../../assets/projects-example/proyecto2-ejem.jpg";
import project3 from "../../assets/projects-example/proyecto3-ejem.jpg";
import project4 from "../../assets/projects-example/proyecto4-ejem.jpg";
import project5 from "../../assets/projects-example/proyecto5-ejem.jpg";

const slides = [
  {
    img: project1,
    text: "Aeropuerto Internacional de la Ciudad de México",
  },
  {
    img: project2,
    text: "Torre Mitikah",
  },
  {
    img: project3,
    text: "Palacio de Hierro Polanco",
  },
  {
    img: project4,
    text: "Casas de Querétaro",
  },
  {
    img: project5,
    text: "Casas de Mazatlán",
  },
];

function ProjectHero() {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typed = new Typed(el.current!, {
      strings: ["Proyectos"],
      typeSpeed: 50,
      backSpeed: 50,
      loop: false,
    });

    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <motion.div className="hero projects">
      <div className="hero-bg"></div>

      <div className="hero-dots">
        <div className="hero-dot" />
        <div className="hero-dot" />
        <div className="hero-dot" />
      </div>

      <h1 className="hero-title">
        <code className="hero-title-code">&lt;</code>
        <span className="hero-title-span" ref={el} />
        <code className="hero-title-code">/&gt;</code>
      </h1>

      <h2 className="hero-subtitle">
        Estos son algunos de los proyectos que hemos ayudado a hacer realidad.
      </h2>

      <div className="projects-carousel">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          loop={true}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{ delay: 3000 }}
          navigation={{ nextEl: ".next", prevEl: ".prev" }}
          pagination={{ el: ".dots", clickable: true }}
          className="mySwiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} style={{ width: "70%" }}>
              <div className="project-slide active">
                <div className="numbertext">
                  {index + 1} / {slides.length}
                </div>
                <div className="img-container">
                  <img src={slide.img} alt={`Slide ${index + 1}`} />
                </div>
                <div className="project-text">{slide.text}</div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="prev">
          <IoIosArrowBack />
        </button>
        <button className="next">
          <IoIosArrowForward />
        </button>

        <div className="dots"></div>
      </div>

      <div className="hero-btn">
        <Link to="/registro">Comenzar</Link>
      </div>
    </motion.div>
  );
}

export default ProjectHero;
