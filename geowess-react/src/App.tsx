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

function App() {
  return (
    <ThemeProvider>
      <BGContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/proyectos" element={<Projects />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/login" element={<Login />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<PrivateLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </BGContainer>
    </ThemeProvider>
  );
}

export default App;
