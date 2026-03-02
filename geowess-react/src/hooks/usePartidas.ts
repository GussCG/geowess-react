import { useState, useCallback } from "react";
import { partidaService } from "../services/partida.service";
import { toast } from "react-toastify";

export function usePartidas() {
  const [partidas, setPartidas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPartidas = useCallback(async (faseId: string) => {
    if (!faseId) return;
    setLoading(true);

    try {
      const data = await partidaService.getPartidasByFase(faseId);
      setPartidas(data);
    } catch (error) {
      console.error("Error fetching partidas:", error);
      toast.error("Error al cargar las partidas");
    } finally {
      setLoading(false);
    }
  }, []);

  const addPartida = async (partida: any) => {
    const { data, error } = await partidaService.createPartida(partida);
    if (!error) {
      setPartidas((prev) => [...prev, { ...data, concepto: [] }]);
      toast.success("Partida creada exitosamente");
    } else {
      toast.error("Error al crear partida");
    }
  };

  const updatePartida = async (id: string, updates: any) => {
    const { data, error } = await partidaService.updatePartida(id, updates);
    if (!error) {
      setPartidas((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...data } : p)),
      );
      toast.success("Partida actualizada");
    } else {
      toast.error("Error al actualizar partida");
    }
  };

  const deletePartida = async (id: string) => {
    const { error } = await partidaService.deletePartida(id);
    if (!error) {
      setPartidas((prev) => prev.filter((p) => p.id !== id));
      toast.success("Partida eliminada");
    } else {
      toast.error("Error al eliminar partida");
    }
  };

  const updateLocalConcepto = (
    partidaId: string,
    conceptoId: string,
    updatedData: any,
  ) => {
    setPartidas((prev) =>
      prev.map((p) => {
        if (p.id === partidaId) {
          return {
            ...p,
            concepto: p.concepto.map((c: any) =>
              c.id === conceptoId ? { ...c, ...updatedData } : c,
            ),
          };
        }
        return p;
      }),
    );
  };

  return {
    partidas,
    loading,
    fetchPartidas,
    addPartida,
    updatePartida,
    deletePartida,
    updateLocalConcepto,
  };
}
