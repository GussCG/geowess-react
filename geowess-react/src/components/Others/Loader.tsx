import Spinner from "./Spinner";

interface LoaderProps {
  message?: string;
}

function Loader({ message }: LoaderProps) {
  return (
    <div className="loader-container">
      <div className="loader-overlay">
        <div className="loader">
          <Spinner />
        </div>
        <p className="loader-text">{message || "Cargando..."}</p>
      </div>
    </div>
  );
}

export default Loader;
