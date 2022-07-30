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
    icon: "fas fa-tachometer-alt", // the component being exported from icons/index.js
    name: "Dashboard", // name that appear in Sidebar
  },

  {
    icon: "fas fa-globe",
    name: "Constituencies",
    path: "/app/constituencies",
  },
  {
    icon: "fas fa-map",
    name: "Wards",
    path: "/app/wards",
  },
  {
    icon: "fas fa-map-marked",
    name: "Registration Centres",
    path: "/app/registration-centres",
  },
  {
    icon: "fas fa-map-marker-alt",
    name: "Polling Stations",
    path: "/app/polling-stations",
  },
  {
    icon: "fas fa-users",
    name: "Aspirants",
    path: "/app/aspirants",
  },
  {
    icon: "fas fa-user-edit",
    name: "Agents",
    path: "/app/agents",
  },
];

//hide user menu item from sidebar menu
//ensure user object menu is last in routes array so we array.pop to remove it(last item)
//role === "USER" && routes.pop();
export default routes;
