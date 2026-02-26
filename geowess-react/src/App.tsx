import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home";
import "./styles/App.scss";
import { ThemeProvider } from "./context/Theme/ThemeContext";
import BGContainer from "./components/Others/BGContainer";
import Projects from "./pages/public/Projects";
import About from "./pages/public/About";
import Login from "./pages/public/Login";

import { ProtectedRoute } from "./routes/ProtectedRoute";
import Dashboard from "./pages/private/dashboard/components/roles/Dashboard";
import PrivateLayout from "./layouts/PrivateLayout";
import SignUp from "./pages/public/SignUp";
import EditarPerfil from "./pages/private/profile/EditarPerfil";
import ProjectsPage from "./pages/private/projects/ProjectsPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/User/UserContext";
import ProjectCreate from "./pages/private/projects/ProjectCreate";
import Estimaciones from "./pages/private/projects/Estimaciones";
import CatalogoMaestro from "./pages/private/projects/CatalogoMaestro";
import Project from "./pages/private/projects/Project";
import ProjectEdit from "./pages/private/projects/ProjectEdit";

function App() {
  return (
    <ThemeProvider>
      <BGContainer>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/proyectos" element={<Projects />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<SignUp />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<PrivateLayout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/editar-perfil" element={<EditarPerfil />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/projects/create" element={<ProjectCreate />} />
                  <Route path="/estimaciones" element={<Estimaciones />} />
                  <Route path="/projects/:id" element={<Project />} />
                  <Route path="/projects/:id/edit" element={<ProjectEdit />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </UserProvider>
        <ToastContainer />
      </BGContainer>
    </ThemeProvider>
  );
}

export default App;
