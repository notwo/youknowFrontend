export const timeFormat = (timeStr) => {
  const date = new Date(timeStr);
  return `${date.getFullYear().toString()}` +
    `/${(date.getMonth() + 1).toString().padStart(2, '0')}` +
    `/${date.getDate().toString().padStart(2, '0')}`;
};
