export enum Roles {
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
}

export type Role = keyof typeof Roles;
