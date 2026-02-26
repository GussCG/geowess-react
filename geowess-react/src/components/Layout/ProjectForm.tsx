import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Icons from "../Others/IconProvider";
import { useSupervisors } from "../../hooks/useSupervisors";
import { Country, State, City } from "country-state-city";
import { formatName } from "../../utils/formatName";

const { FaCalendarAlt, IoIosArrowDown } = Icons;

interface ProjectFormProps {
  onSubmit?: (data: any) => void;
  loading?: boolean;
  initialData?: any;
}

const projectSchema = z
  .object({
    nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    fecha_inicio: z.string().min(1, "Fecha de inicio requerida"),
    fecha_fin: z.string().min(1, "Fecha de fin requerida"),
    supervisor_id: z.string().min(1, "Debe seleccionar un supervisor"),
    direccion: z.string().min(5, "La dirección es muy corta"),
    ciudad: z.string().min(2, "Ciudad requerida"),
    estado: z.string().min(2, "Selecciona un estado/provincia"),
    pais: z.string().min(1, "Selecciona un país"),
    codigo_postal: z.string().min(1, "Código postal requerido"),
  })
  .refine(
    (data) => {
      if (data.pais === "MX") {
        return /^\d{5}$/.test(data.codigo_postal);
      }
      return data.codigo_postal.length > 2;
    },
    {
      message: "El código postal para México debe tener 5 dígitos",
      path: ["codigo_postal"],
    },
  )
  .refine(
    (data) => {
      const inicio = new Date(data.fecha_inicio);
      const fin = new Date(data.fecha_fin);
      return fin >= inicio;
    },
    {
      message:
        "La fecha de finalización debe ser mayor o igual a la fecha de inicio",
      path: ["fecha_fin"],
    },
  );

function ProjectForm({ onSubmit, loading, initialData }: ProjectFormProps) {
  const { supervisors } = useSupervisors();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData || {
      nombre: "",
      fecha_inicio: "",
      fecha_fin: "",
      supervisor_id: "",
      direccion: "",
      ciudad: "",
      estado: "",
      pais: "",
      codigo_postal: "",
    },
  });

  const selectedPais = watch("pais");
  const selectedEstado = watch("estado");

  const countries = useMemo(() => Country.getAllCountries(), []);
  const states = useMemo(
    () => (selectedPais ? State.getStatesOfCountry(selectedPais) : []),
    [selectedPais],
  );
  const cities = useMemo(
    () =>
      selectedEstado ? City.getCitiesOfState(selectedPais, selectedEstado) : [],
    [selectedPais, selectedEstado],
  );

  const values = watch();

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-grid">
        <div className="form-section">
          <h3 className="form-section-title">Información del Proyecto</h3>

          <div
            className={`field ${values.nombre ? "has-value" : ""} ${errors.nombre ? "has-error" : ""}`}
          >
            <div className="input-wrapper">
              <input
                {...register("nombre")}
                type="text"
                id="nombre"
                className={values.nombre ? "has-value" : ""}
              />
              <label htmlFor="nombre">Nombre del Proyecto</label>
            </div>
            {errors.nombre && (
              <span className="error-msg">
                {errors.nombre.message as string}
              </span>
            )}
          </div>

          <div
            className={`field date-field ${values.fecha_inicio ? "has-value" : ""} ${errors.fecha_inicio ? "has-error" : ""}`}
          >
            <div className="input-wrapper date-wrapper">
              <input
                {...register("fecha_inicio")}
                type="date"
                id="fecha_inicio"
                className={values.fecha_inicio ? "has-value" : ""}
              />
              <label htmlFor="fecha_inicio">Fecha de inicio del proyecto</label>
              <FaCalendarAlt className="date-icon" />
            </div>
            {errors.fecha_inicio && (
              <span className="error-msg">
                {errors.fecha_inicio.message as string}
              </span>
            )}
          </div>

          <div
            className={`field date-field ${values.fecha_fin ? "has-value" : ""} ${errors.fecha_fin ? "has-error" : ""}`}
          >
            <div className="input-wrapper date-wrapper">
              <input
                {...register("fecha_fin")}
                type="date"
                id="fecha_fin"
                className={values.fecha_fin ? "has-value" : ""}
              />
              <label htmlFor="fecha_fin">
                Fecha de finalización del proyecto
              </label>
              <FaCalendarAlt className="date-icon" />
            </div>
            {errors.fecha_fin && (
              <span className="error-msg">
                {errors.fecha_fin.message as string}
              </span>
            )}
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">Supervisor del Proyecto</h3>

          <div
            className={`field ${values.supervisor_id ? "has-value" : ""} ${errors.supervisor_id ? "has-error" : ""}`}
          >
            <div className="input-wrapper">
              <select
                {...register("supervisor_id")}
                id="supervisor_id"
                className={values.supervisor_id ? "has-value" : ""}
              >
                <option value="" disabled>
                  Selecciona un supervisor
                </option>
                {supervisors.map((sup) => (
                  <option key={sup.id} value={sup.id}>
                    {formatName(sup.nombre, sup.ap_paterno, sup.ap_materno)}
                  </option>
                ))}
              </select>
              <IoIosArrowDown className="select-arrow" />
            </div>
            {errors.supervisor_id && (
              <span className="error-msg">
                {errors.supervisor_id.message as string}
              </span>
            )}
          </div>
        </div>

        <div className="form-section">
          <h3 className="form-section-title">Ubicación del Proyecto</h3>

          <div
            className={`field ${values.pais ? "has-value" : ""} ${errors.pais ? "has-error" : ""}`}
          >
            <div className="input-wrapper">
              <select
                {...register("pais")}
                onChange={(e) => {
                  const val = e.target.value;
                  setValue("pais", val);
                  setValue("estado", "");
                  setValue("ciudad", "");
                }}
              >
                <option value="" disabled>
                  Selecciona un país
                </option>
                {countries.map((c) => (
                  <option key={c.isoCode} value={c.isoCode}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.pais && (
              <span className="error-msg">{errors.pais.message as string}</span>
            )}
          </div>

          <div
            className={`field ${values.estado ? "has-value" : ""} ${errors.estado ? "has-error" : ""}`}
          >
            <div className="input-wrapper">
              <select
                {...register("estado")}
                onChange={(e) => {
                  const val = e.target.value;
                  setValue("estado", val);
                  setValue("ciudad", "");
                }}
                disabled={!selectedPais}
              >
                <option value="" disabled>
                  Selecciona un estado/provincia
                </option>
                {states.map((s) => (
                  <option key={s.isoCode} value={s.isoCode}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.estado && (
              <span className="error-msg">
                {errors.estado.message as string}
              </span>
            )}
          </div>

          <div
            className={`field ${values.ciudad ? "has-value" : ""} ${errors.ciudad ? "has-error" : ""}`}
          >
            <div className="input-wrapper">
              <select {...register("ciudad")} disabled={!selectedEstado}>
                <option value="" disabled>
                  Selecciona una ciudad
                </option>
                {cities.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.ciudad && (
              <span className="error-msg">
                {errors.ciudad.message as string}
              </span>
            )}
          </div>

          <div
            className={`field ${values.direccion ? "has-value" : ""} ${errors.direccion ? "has-error" : ""}`}
          >
            <div className="input-wrapper">
              <input
                {...register("direccion")}
                type="text"
                id="direccion"
                className={values.direccion ? "has-value" : ""}
              />
              <label htmlFor="direccion">Dirección</label>
            </div>
            {errors.direccion && (
              <span className="error-msg">
                {errors.direccion.message as string}
              </span>
            )}
          </div>

          <div
            className={`field ${values.codigo_postal ? "has-value" : ""} ${errors.codigo_postal ? "has-error" : ""}`}
          >
            <div className="input-wrapper">
              <input
                {...register("codigo_postal")}
                type="text"
                id="codigo_postal"
                className={values.codigo_postal ? "has-value" : ""}
              />
              <label htmlFor="codigo_postal">Código Postal</label>
            </div>
            {errors.codigo_postal && (
              <span className="error-msg">
                {errors.codigo_postal.message as string}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        type="submit"
        className={loading ? "btn-submit disabled" : "btn-submit"}
        disabled={loading}
      >
        {loading ? "Guardando..." : "Guardar Proyecto"}
      </button>
    </form>
  );
}

export default ProjectForm;
