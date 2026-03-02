export const calculateProgressMetrics = (phases: any[]) => {
  if (!phases || phases.length === 0)
    return { totalProgress: 0, phasesWithProgress: [] };

  const phasesWithProgress = phases.map((phase) => {
    const catalogos = phase.catalogo_conceptos || [];
    const conceptos = catalogos.flatMap(
      (cat: any) => cat.partida?.flatMap((p: any) => p.concepto) || [],
    );

    if (conceptos.length === 0) return { ...phase, porcentaje_avance: 0 };

    const totalImporte = conceptos.reduce(
      (sum: number, c: any) => sum + (Number(c.importe) || 0),
      0,
    );

    const completadoImporte = conceptos
      .filter((c: any) => c.completado === true)
      .reduce((sum: number, c: any) => sum + (Number(c.importe) || 0), 0);

    const progress =
      totalImporte > 0
        ? Math.round((completadoImporte / totalImporte) * 100)
        : 0;

    return { ...phase, porcentaje_avance: progress };
  });

  const totalProgress =
    phasesWithProgress.length > 0
      ? Math.round(
          phasesWithProgress.reduce(
            (acc, p) => acc + (p.porcentaje_avance || 0),
            0,
          ) / phasesWithProgress.length,
        )
      : 0;

  return { totalProgress, phasesWithProgress };
};
