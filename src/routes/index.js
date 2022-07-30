import { lazy } from 'react'

import { auth, notify } from "../helpers";

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Constituency = lazy(() => import("../pages/Constituencies"));
const Wards = lazy(() => import("../pages/Wards"));
const PollingStations = lazy(() => import("../pages/PollingStations"));
const RegistrationCentres = lazy(() => import("../pages/RegistrationCentres"));
const Aspirant = lazy(() => import("../pages/Aspirants"));
const Agents = lazy(() => import("../pages/Agents"));
const Page404 = lazy(() => import("../pages/404"));
const Page401 = lazy(() => import("../pages/401"));
const Blank = lazy(() => import("../pages/Blank"));

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */

//get logg in user role
//const role = auth.getToken().user.authorities[0].authority;
const routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/aspirants",
    component: Aspirant,
  },
  {
    path: "/agents",
    component: Agents,
  },
  {
    path: "/constituencies",
    component: Constituency,
  },
  {
    path: "/wards",
    component: Wards,
  },
  {
    path: "/registration-centres",
    component: RegistrationCentres,
  },
  {
    path: "/polling-stations",
    component: PollingStations,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/blank",
    component: Blank,
  },
];

export default routes
