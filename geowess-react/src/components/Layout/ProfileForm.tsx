import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Icons from "../Others/IconProvider";

const { LuEyeClosed, LuEye, FaCalendarAlt, IoIosArrowDown } = Icons;

interface ProfileFormProps {
  defaultValues?: {
    nombre: string;
    ap_paterno: string;
    ap_materno: string;
    fecha_nac: string;
    telefono: string;
    rfc: string;
    email: string;
    password?: string;
    rol:
      | "supervisor"
      | "superintendente"
      | "residente"
      | "contratista"
      | "contratante"
      | "representante_legal"
      | "supervisante";
  };
  onSubmit: (data: any) => void;
  loading: boolean;
  isEditMode?: boolean;
  isOAuthUser?: boolean;
}

const registerSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  ap_paterno: z.string().min(1, "El apellido paterno es requerido"),
  ap_materno: z.string().min(1, "El apellido materno es requerido"),
  fecha_nac: z.string().min(1, "La fecha de nacimiento es requerida"),
  telefono: z
    .string()
    .min(10, "Teléfono inválido")
    .max(10, "Teléfono inválido"),
  rfc: z.string().min(12, "RFC inválido").max(13, "RFC inválido"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres").or(z.literal("")),
  rol: z
    .enum([
      "supervisor",
      "superintendente",
      "residente",
      "contratista",
      "contratante",
      "representante_legal",
      "supervisante",
    ])
    .or(z.literal(""))
    .refine((val) => val !== "", {
      message: "Selecciona un rol",
    }),
});

const editProfileSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  ap_paterno: z.string().min(1, "El apellido paterno es requerido"),
  ap_materno: z.string().min(1, "El apellido materno es requerido"),
  fecha_nac: z.string().min(1, "La fecha de nacimiento es requerida"),
  telefono: z
    .string()
    .min(10, "Teléfono inválido")
    .max(10, "Teléfono inválido"),
  rfc: z.string().min(12, "RFC inválido").max(13, "RFC inválido"),
  rol: z
    .enum([
      "supervisor",
      "superintendente",
      "residente",
      "contratista",
      "contratante",
      "representante_legal",
      "supervisante",
    ])
    .optional(),
});

function ProfileForm({
  defaultValues,
  onSubmit,
  loading,
  isEditMode = false,
  isOAuthUser = false,
}: ProfileFormProps) {
  const [showPass, setShowPass] = React.useState(false);
  const schema = isEditMode ? editProfileSchema : registerSchema;

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const nombreValue = watch("nombre", defaultValues?.nombre || "");
  const apellidoPaternoValue = watch(
    "ap_paterno",
    defaultValues?.ap_paterno || "",
  );
  const apellidoMaternoValue = watch(
    "ap_materno",
    defaultValues?.ap_materno || "",
  );
  const fechaNacimientoValue = watch(
    "fecha_nac",
    defaultValues?.fecha_nac || "",
  );
  const telefonoValue = watch("telefono", defaultValues?.telefono || "");
  const rfcValue = watch("rfc", defaultValues?.rfc || "");
  const emailValue = watch("email", defaultValues?.email || "");
  const passwordValue = watch("password", "");
  const rolValue = watch("rol", defaultValues?.rol || "supervisor");

  return (
    <form className="signup-form two-cols" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-grid">
        <div className="form-section">
          <h3 className="form-section-title">Información Personal</h3>

          <div
            className={`field ${nombreValue ? "has-value" : ""} ${errors.nombre ? "has-error" : ""}`}
          >
            <div className="input-wrapper">
              <input
                {...register("nombre")}
                type="text"
                id="nombre"
                className={nombreValue ? "has-value" : ""}
              />
              <label htmlFor="nombre">Nombre</label>
            </div>
            {errors.nombre && (
              <span className="error-msg">
                {errors.nombre.message as string}
              </span>
            )}
          </div>

          <div
            className={`field ${apellidoPaternoValue ? "has-value" : ""} ${errors.ap_paterno ? "has-error" : ""}`}
          >
            <div className="input-wrapper">
              <input
                {...register("ap_paterno")}
                type="text"
                id="ap_paterno"
                className={apellidoPaternoValue ? "has-value" : ""}
              />
              <label htmlFor="ap_paterno">Apellido Paterno</label>
            </div>
            {errors.ap_paterno && (
              <span className="error-msg">
                {errors.ap_paterno.message as string}
              </span>
            )}
          </div>

          <div
            className={`field ${apellidoMaternoValue ? "has-value" : ""} ${errors.ap_materno ? "has-error" : ""}`}
          >
            <div className="input-wrapper">
              <input
                {...register("ap_materno")}
                type="text"
                id="ap_materno"
                className={apellidoMaternoValue ? "has-value" : ""}
              />
              <label htmlFor="ap_materno">Apellido Materno</label>
            </div>
            {errors.ap_materno && (
              <span className="error-msg">
                {errors.ap_materno.message as string}
              </span>
            )}
          </div>

          <div
            className={`field date-field ${fechaNacimientoValue ? "has-value" : ""} ${errors.fecha_nac ? "has-error" : ""}`}
          >
            <div className="input-wrapper date-wrapper">
              <input
                {...register("fecha_nac")}
                type="date"
                id="fecha_nac"
                className={fechaNacimientoValue ? "has-value" : ""}
              />
              <label htmlFor="fecha_nac">Fecha de nacimiento</label>
              <FaCalendarAlt className="date-icon" />
            </div>
            {errors.fecha_nac && (
              <span className="error-msg">
                {errors.fecha_nac.message as string}
              </span>
            )}
          </div>

          <div
            className={`field ${telefonoValue ? "has-value" : ""} ${errors.telefono ? "has-error" : ""}`}
          >
            <div className="input-wrapper">
              <input
                {...register("telefono")}
                type="tel"
                id="telefono"
                className={telefonoValue ? "has-value" : ""}
              />
              <label htmlFor="telefono">Teléfono</label>
            </div>
            {errors.telefono && (
              <span className="error-msg">
                {errors.telefono.message as string}
              </span>
            )}
          </div>

          <div
            className={`field ${rfcValue ? "has-value" : ""} ${errors.rfc ? "has-error" : ""}`}
          >
            <div className="input-wrapper">
              <input
                {...register("rfc")}
                type="text"
                id="rfc"
                className={rfcValue ? "has-value" : ""}
              />
              <label htmlFor="rfc">RFC</label>
            </div>
            {errors.rfc && (
              <span className="error-msg">{errors.rfc.message as string}</span>
            )}
          </div>
        </div>
        <div className="form-section">
          <h3 className="form-section-title">Cuenta</h3>

          {defaultValues?.rol !== "administrador" && (
            <div
              className={`field ${rolValue ? "has-value" : ""} ${errors.rol ? "has-error" : ""}`}
            >
              <div className="input-wrapper">
                <select
                  {...register("rol")}
                  id="rol"
                  className={rolValue ? "has-value" : ""}
                >
                  <option value="" disabled>
                    Selecciona un rol
                  </option>
                  <option value="supervisor">Supervisor</option>
                  <option value="superintendente">Superintendente</option>
                  <option value="residente">Residente</option>
                  <option value="contratista">Contratista</option>
                  <option value="contratante">Contratante</option>
                  <option value="representante_legal">
                    Representante Legal
                  </option>
                  <option value="supervisante">Supervisante</option>
                </select>
                <IoIosArrowDown className="select-arrow" />
              </div>

              {errors.rol && (
                <span className="error-msg">
                  {errors.rol.message as string}
                </span>
              )}
            </div>
          )}

          {!isEditMode && !isOAuthUser && (
            <>
              <div
                className={`field ${emailValue ? "has-value" : ""} ${errors.email ? "has-error" : ""}`}
              >
                <div className="input-wrapper">
                  <input
                    {...register("email")}
                    type="email"
                    id="email"
                    className={emailValue ? "has-value" : ""}
                  />
                  <label htmlFor="email">Correo electrónico</label>
                </div>
                {errors.email && (
                  <span className="error-msg">
                    {errors.email.message as string}
                  </span>
                )}
              </div>
              <div
                className={`field ${passwordValue ? "has-value" : ""} ${errors.password ? "has-error" : ""}`}
              >
                <div className="input-wrapper">
                  <input
                    {...register("password")}
                    type={showPass ? "text" : "password"}
                    id="password"
                    className={passwordValue ? "has-value" : ""}
                  />
                  <label htmlFor="password">Contraseña</label>

                  <button
                    type="button"
                    className="show-pass-btn"
                    onClick={() => setShowPass && setShowPass(!showPass)}
                  >
                    {showPass ? <LuEye /> : <LuEyeClosed />}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <button
        type="submit"
        className={loading ? "btn-submit disabled" : "btn-submit"}
        disabled={loading}
      >
        {loading
          ? "Guardando..."
          : isEditMode
            ? "Guardar Cambios"
            : "Crear Cuenta"}
      </button>
    </form>
  );
}

export default ProfileForm;
