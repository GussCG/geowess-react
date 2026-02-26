import React, { useState } from "react";
import ProjectForm from "../../../components/Layout/ProjectForm";
import { useProjects } from "../../../hooks/useProjects";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../../context/User/UserContext";
import { Country, State } from "country-state-city";

function ProjectCreate() {
  const { profile, role } = useUserContext();
  const { createProject } = useProjects(role || null, profile?.id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (data: any) => {
    setIsSubmitting(true);

    try {
      const paisNombre = Country.getCountryByCode(data.pais)?.name || "";
      const estadoNombre =
        State.getStateByCodeAndCountry(data.estado, data.pais)?.name || "";

      const projectToSave = {
        nombre: data.nombre,
        fecha_inicio: data.fecha_inicio,
        fecha_fin: data.fecha_fin,
        supervisor_id: data.supervisor_id,
        ubicacion: `${data.direccion}, ${data.ciudad}, ${estadoNombre}, ${paisNombre}, ${data.codigo_postal}`,
        status: true,
        porcentaje_avance: 0,
        creado_por: profile?.id,
      };

      console.log("Project to save:", projectToSave);

      const result = await createProject(projectToSave);

      if (result) {
        toast.success("Proyecto creado exitosamente");
        navigate(`/projects/${result.id}`);
      }
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Error al crear el proyecto");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page profile-page">
      <h2 className="page-title">Crear Proyecto</h2>

      <ProjectForm onSubmit={handleCreate} loading={isSubmitting} />
    </div>
  );
}

export default ProjectCreate;
