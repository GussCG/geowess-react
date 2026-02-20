export const formatName = (
  name: string | null | undefined,
  apPaterno: string | null | undefined,
  apMaterno: string | null | undefined,
) => {
  if (!name) return "Usuario";
  let fullName = name;
  if (apPaterno) fullName += ` ${apPaterno}`;
  if (apMaterno) fullName += ` ${apMaterno}`;
  return fullName;
};
