import { withAllowedRoles } from "src/HOC/with-allowed-Roles";
import { PagesController } from "src/constants/pages-controller";

function UserView() {
  return <>View</>;
}
export default withAllowedRoles(UserView, PagesController.user.roles);
