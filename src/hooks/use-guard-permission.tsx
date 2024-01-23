import { useAppSelector } from "../app/hooks";
import { Role } from "../constants/roles";

export function useGuardPermission(allowedRoles: Role[]) {
  const roles = useAppSelector((state) => state.app.roles);

  allowedRoles.sort();
  roles.sort();

  if (allowedRoles.some((role) => roles.includes(role as never))) {
    return true;
  } else {
    return false;
  }
}
