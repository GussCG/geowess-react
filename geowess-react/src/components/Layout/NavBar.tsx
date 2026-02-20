import { Link } from "react-router-dom";
import { useTheme } from "../../context/Theme/ThemeContext";
import Icons from "../Others/IconProvider";

const { GeoWessLogo, MdLightMode, MdNightlightRound } = Icons;

export default function NavBar() {
  const { toggleTheme, theme } = useTheme();

  return (
    <nav className="navbar">
      <div className="navbar__left-buttons">
        <Link to="/" className="navbar__logo">
          <GeoWessLogo />
        </Link>
      </div>

      <div className="navbar__center-buttons">
        <ul className="navbar__links">
          <li className="navbar__item">
            <Link to="/" className="navbar__link">
              Inicio
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/proyectos" className="navbar__link">
              Proyectos
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="/nosotros" className="navbar__link">
              Nosotros
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar__right-buttons">
        <button className="navbar__theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? <MdNightlightRound /> : <MdLightMode />}
        </button>

        <Link to="/login" className="navbar__link--login">
          Iniciar Sesión
        </Link>
      </div>
    </nav>
  );
}
