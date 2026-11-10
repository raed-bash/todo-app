// Due dates are picked as a calendar day and stored as the end of that local day,
// so a task due "today" only becomes overdue after today ends.
export const dueDateToInput = (iso?: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

export const inputToDueDate = (day?: string | null) =>
  day ? new Date(`${day}T23:59:59.999`).toISOString() : null;

export const isOverdue = (task: {
  dueDate?: string | null;
  completed: boolean;
}) =>
  Boolean(
    task.dueDate && !task.completed && new Date(task.dueDate) < new Date()
  );

export const formatDueDate = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleDateString() : "";
