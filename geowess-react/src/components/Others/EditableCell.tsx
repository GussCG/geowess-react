import { useState, useEffect } from "react";
import Icons from "./IconProvider";
const { FaTimes } = Icons;

interface EditableCellProps {
  value: string | number | boolean;
  onSave: (newValue: string | number | boolean) => void;
  type?: "text" | "number" | "date" | "boolean" | "select";
  options?: { label: string; value: any }[];
}

export function EditableCell({
  value,
  onSave,
  type = "text",
  options,
}: EditableCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const [isCustom, setIsCustom] = useState(false);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const isValueCustom =
    type === "select" &&
    !!value &&
    !options?.some((o) => o.value.toString() === value.toString());

  const handleSave = (valOverride?: any) => {
    const val = valOverride !== undefined ? valOverride : currentValue;

    // Evitar guardar vacíos si es select para que no se bloquee
    if (type === "select" && val === "" && value !== "") {
      setIsEditing(false);
      setIsCustom(false);
      setCurrentValue(value); // Revertir
      return;
    }

    let finalValue = type === "number" ? Number(val) : val;
    onSave(finalValue);
    setIsEditing(false);
    setIsCustom(false);
  };

  if (isEditing) {
    return (
      <div className="editable-cell is-editing">
        {type === "select" ? (
          !isCustom ? (
            <select
              autoFocus
              className="filter-btn"
              value={isValueCustom ? "custom" : currentValue.toString()}
              onChange={(e) => {
                if (e.target.value === "custom") {
                  setIsCustom(true);
                  setCurrentValue("");
                } else {
                  setCurrentValue(e.target.value);
                  handleSave(e.target.value);
                }
              }}
              onBlur={() => {
                setTimeout(() => {
                  if (!isCustom) handleSave();
                }, 100);
              }}
            >
              <option value="">Seleccionar...</option>
              {options?.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  style={{
                    color: opt.value === "custom" ? "orange" : "inherit",
                    fontWeight: opt.value === "custom" ? "600" : "normal",
                  }}
                >
                  {opt.label}
                </option>
              ))}
            </select>
          ) : (
            <div
              style={{
                display: "flex",
                gap: "4px",
                alignItems: "stretch",
                height: "100%",
              }}
            >
              <input
                autoFocus
                type="text"
                className="filter-btn"
                style={{
                  border: "1px solid orange",
                  flex: 1,
                  height: "100%",
                }}
                placeholder="¿Cuál?"
                value={currentValue.toString()}
                onChange={(e) => setCurrentValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") {
                    setIsCustom(false);
                    setCurrentValue(value);
                  }
                }}
                onBlur={() => {
                  if (!isCustom) handleSave();
                }}
              />
              <button
                type="button"
                className="filter-btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 10px",
                  color: "#666",
                  cursor: "pointer",
                  height: "auto", // Se estira gracias al alignItems: stretch del padre
                  border: "1px solid #ccc",
                }}
                // Usamos onMouseDown porque ocurre ANTES que el onBlur del input
                onMouseDown={(e) => {
                  e.preventDefault(); // Evita que el input pierda el foco antes de tiempo
                  setIsCustom(false);
                  setCurrentValue(value);
                }}
                title="Volver a la lista"
              >
                <FaTimes />
              </button>
            </div>
          )
        ) : (
          <input
            autoFocus
            type={type}
            className="filter-btn"
            value={currentValue.toString()}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            onBlur={() => handleSave()}
          />
        )}
      </div>
    );
  }

  return (
    <div
      onDoubleClick={() => {
        setIsEditing(true);
        if (isValueCustom) setIsCustom(true);
      }}
      className="editable-cell"
      title="Doble clic para editar"
    >
      <div
        className="cell-content"
        style={{
          color: isValueCustom ? "#ff9800" : "inherit",
          fontWeight: isValueCustom ? "600" : "normal",
        }}
      >
        {type === "select"
          ? options?.find((o) => o.value.toString() === value?.toString())
              ?.label || (value ? value : "---")
          : value}
      </div>
    </div>
  );
}
