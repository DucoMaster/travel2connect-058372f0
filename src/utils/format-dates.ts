export const convertToPST = (date: Date): string => {
  const localDate = new Date(date);
  localDate.setHours(localDate.getHours() + 5);
  localDate.setMinutes(0);
  return localDate.toISOString();
};
