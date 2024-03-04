export function handleToDate(date: string | Date) {
  const newDate = new Date(date);

  newDate.setDate(newDate.getDate() + 1);

  return newDate;
}
