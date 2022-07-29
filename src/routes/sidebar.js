/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
import { auth, notify } from "../helpers";
//get logg in user role
//const role = auth.getToken().user.authorities[0].authority;

let routes = [
  {
    path: "/app/dashboard", // the url
    icon: "fas fa-tachometer", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },
  {
    path: "/app/tally",
    name: "Tally",
    icon: "far fa-file-alt",
  },
  {
    icon: "fas fa-server",
    name: "Aspirants",
    path: "/app/aspirants",
  },
  {
    icon: "fas fa-bolt",
    name: "Agents",
    path: "/app/experiments",
  },
  {
    icon: "fas fa-hourglass",
    name: "Constituencies",
    path: "/app/constituencies",
  },
  {
    icon: "fas fa-chart-pie",
    name: "Wards",
    path: "/app/wards",
  },
  {
    icon: "fas fa-chart-pie",
    name: "RegistrationCentres",
    path: "/app/registration-centres",
  },
  {
    icon: "fas fa-chart-pie",
    name: "PollingStations",
    path: "/app/polling-stations",
  },


  {
    icon: "fas fa-users",
    name: "Users",
    path: "/app/users",
  },
];

//hide user menu item from sidebar menu
//ensure user object menu is last in routes array so we array.pop to remove it(last item)
//role === "USER" && routes.pop();
export default routes;
