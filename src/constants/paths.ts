export enum Path {
  home,
  user,
  task,
  "user/view",
  "task/view",
  view,
  notification,
  "notification/view",
}

export type Paths = keyof typeof Path;
export type PathsWithSlash = `/${Paths}`;
export type TypePaths = Paths | PathsWithSlash;
