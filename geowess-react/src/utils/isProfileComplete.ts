export const isProfileComplete = (profile: any) => {
  if (!profile) return false;

  return (
    profile.nombre &&
    profile.ap_paterno &&
    profile.ap_materno &&
    profile.fecha_nac &&
    profile.telefono &&
    profile.rfc
  );
};
