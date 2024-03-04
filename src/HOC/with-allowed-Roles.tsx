import { Navigate } from "react-router-dom";
import { Role } from "../constants/roles";
import { useGuardPermission } from "../hooks/use-guard-permission";

export function withAllowedRoles(
  Component: (props: any) => JSX.Element,
  allowedRoles: Role[],
  to: string = "/home"
) {
  return (props: any) => {
    const isAllowed = useGuardPermission(allowedRoles);

    if (isAllowed) {
      return <Component {...props} />;
    } else {
      return <Navigate to={to} replace />;
    }
  };
}
