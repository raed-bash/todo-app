import { dueDateToInput, inputToDueDate, isOverdue } from "./task-dates";

test("due date round-trips through the date input", () => {
  expect(dueDateToInput(inputToDueDate("2026-03-15"))).toBe("2026-03-15");
  expect(inputToDueDate("")).toBeNull();
  expect(dueDateToInput(null)).toBe("");
});

test("overdue only for past, incomplete tasks", () => {
  const past = inputToDueDate("2000-01-01");
  const future = inputToDueDate("2999-01-01");
  expect(isOverdue({ dueDate: past, completed: false })).toBe(true);
  expect(isOverdue({ dueDate: past, completed: true })).toBe(false);
  expect(isOverdue({ dueDate: future, completed: false })).toBe(false);
  expect(isOverdue({ dueDate: null, completed: false })).toBe(false);
});
