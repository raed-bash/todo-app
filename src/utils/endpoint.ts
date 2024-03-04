import { Endpoint } from "../constants/endpoints";

type Endpoints = keyof typeof Endpoint;

export const endPoint = (...endpoints: (Endpoints | number | undefined)[]) =>
  endpoints.filter((endpoint) => endpoint).join("/");
