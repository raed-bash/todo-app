import { withAllowedRoles } from "../../HOC/with-allowed-Roles";
import { PagesController } from "../../constants/pages-conroller";

function TaskList() {
  return <h1>Task list</h1>;
}

export default withAllowedRoles(TaskList, PagesController.home.roles);
