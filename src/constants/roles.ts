export enum Roles {
  ADMIN,
  EMPLOYEE,
}

export type Role = keyof typeof Roles;
