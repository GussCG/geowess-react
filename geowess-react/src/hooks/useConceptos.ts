import { useState, useCallback } from "react";
import { conceptoService } from "../services/concepto.service";
import { toast } from "react-toastify";

export function useConceptos() {
  const [loading, setLoading] = useState(false);

  const addConcepto = async (concepto: any) => {
    setLoading(true);
    try {
      const { data, error } = await conceptoService.createConcepto(concepto);
      if (error) throw error;
      toast.success("Concepto añadido al catálogo");
      return data;
    } catch (error) {
      toast.error("Error al crear concepto");
    } finally {
      setLoading(false);
    }
  };

  const updateConcepto = async (id: string, updates: any) => {
    setLoading(true);
    try {
      const { data, error } = await conceptoService.updateConcepto(id, updates);
      if (error) throw error;
      toast.success("Concepto actualizado");
      return data;
    } catch (error) {
      toast.error("Error al actualizar concepto");
    } finally {
      setLoading(false);
    }
  };

  const deleteConcepto = async (id: string) => {
    setLoading(true);
    try {
      const { error } = await conceptoService.deleteConcepto(id);
      if (error) throw error;
      toast.success("Concepto eliminado");
      return true;
    } catch (error) {
      toast.error("Error al eliminar concepto");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    addConcepto,
    updateConcepto,
    deleteConcepto,
  };
}
