export const roles = ["ADMIN", "EMPLOYEE"] as const;

export type Role = (typeof roles)[number];
