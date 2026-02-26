import { useState, useEffect } from "react";
import Icons from "./IconProvider";
const { FaCircleInfo } = Icons;

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

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleSave = () => {
    let finalValue = currentValue;

    // CORRECCIÓN DE TIPOS:
    if (type === "number") finalValue = Number(currentValue);
    if (type === "boolean")
      finalValue = currentValue === "true" || currentValue === true;

    onSave(finalValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setCurrentValue(value);
      setIsEditing(false);
    }
  };
  if (isEditing) {
    return (
      <div className="editable-cell is-editing">
        {type === "select" ? (
          <select
            autoFocus
            className="filter-btn"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onBlur={handleSave}
          >
            {options?.map((opt) => (
              <option key={opt.label} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            autoFocus
            type={type}
            className="filter-btn"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleSave}
            min={0}
          />
        )}
      </div>
    );
  }

  return (
    <div
      onDoubleClick={() => setIsEditing(true)}
      className="editable-cell"
      title="Doble clic para editar"
    >
      <div className="cell-content">
        {type === "select"
          ? options?.find(
              (o) =>
                o.value === value || o.value.toString() === value.toString(),
            )?.label || value
          : value}
      </div>
    </div>
  );
}
