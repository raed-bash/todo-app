import { withAllowedRoles } from "../../HOC/with-allowed-Roles";
import { PagesController } from "../../constants/pages-conroller";

function Home() {
  return <h1>Home</h1>;
}

export default withAllowedRoles(Home, PagesController.home.roles);
