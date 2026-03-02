export const generateClave = (partidaNombre: string) => {
  const prefix = partidaNombre.substring(0, 2).toUpperCase();
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${randomNum}`;
};
