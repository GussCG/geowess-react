import React, { useEffect, useState } from "react";
import ProjectForm from "../../../components/Layout/ProjectForm";
import { useProjects } from "../../../hooks/useProjects";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../../../context/User/UserContext";
import { Country, State } from "country-state-city";
import Loader from "../../../components/Others/Loader";

function ProjectEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile, role } = useUserContext();
  const { getProject, updateProject } = useProjects(role || null, profile?.id);

  const [initialData, setInitialData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      if (!id) return;
      try {
        const project = await getProject(id);

        if (project) {
          const ubiParts = project.ubicacion
            ? project.ubicacion.split(",").map((part: string) => part.trim())
            : [];

          const allCountries = Country.getAllCountries();
          const country = allCountries.find((c) => c.name === ubiParts[3]);
          const countryCode = country?.isoCode || "";

          let stateIsoCode = "";
          if (countryCode) {
            const states = State.getStatesOfCountry(countryCode);
            stateIsoCode =
              states.find((s) => s.name === ubiParts[2])?.isoCode || "";
          }

          setInitialData({
            ...project,
            direccion: ubiParts[0] || "",
            ciudad: ubiParts[1] || "",
            estado: stateIsoCode,
            pais: countryCode,
            codigo_postal: ubiParts[4] || "",
          });
        } else {
          toast.error("Proyecto no encontrado");
          navigate("/projects");
        }
      } catch (error) {
        console.error("Error fetching project:", error);
        toast.error("Error al cargar el proyecto");
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  const handleUpdate = async (data: any) => {
    setIsSubmitting(true);

    try {
      const paisNombre = Country.getCountryByCode(data.pais)?.name || "";
      const estadoNombre =
        State.getStateByCodeAndCountry(data.estado, data.pais)?.name || "";

      const projectToUpdate = {
        nombre: data.nombre,
        fecha_inicio: data.fecha_inicio,
        fecha_fin: data.fecha_fin,
        supervisor_id: data.supervisor_id,
        ubicacion: `${data.direccion}, ${data.ciudad}, ${estadoNombre}, ${paisNombre}, ${data.codigo_postal}`,
      };

      const result = await updateProject(id!, projectToUpdate);
      console.log("Update result:", result);

      if (result) {
        toast.success("Proyecto actualizado exitosamente");
        navigate(`/projects/${id}`);
      }
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Error al actualizar el proyecto");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loader />;

  console.log("Initial data for form:", initialData);

  return (
    <div className="page profile-page">
      <h2 className="page-title">Editar Proyecto</h2>

      <ProjectForm
        onSubmit={handleUpdate}
        loading={isSubmitting}
        initialData={initialData}
      />
    </div>
  );
}

export default ProjectEdit;
