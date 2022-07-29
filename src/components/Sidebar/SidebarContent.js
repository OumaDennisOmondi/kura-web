import React from "react";
import routes from "../../routes/sidebar";
import { NavLink, Route } from "react-router-dom";
import SidebarSubmenu from "./SidebarSubmenu";
import { Button } from "@windmill/react-ui";

import Logo from "../../assets/img/logo.png";
import { auth, notify } from "../../helpers";
import { useHistory } from "react-router-dom";

function SidebarContent() {
  let history = useHistory();

  const logout = () => {
    auth.logout(() => {
      notify("Success", "Logged out succesfully", "success");
      history.push("/login");
    });
  };
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <a
        className="ml-6 text-md font-bold text-gray-800 dark:text-gray-200"
        href="/"
      >
        Kura 2022
      </a>
      <ul className="mt-6">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 mt-5 py-3" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex items-center w-full  transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                activeClassName="text-gray-800 dark:text-gray-100"
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                </Route>
                <i className={route.icon}></i>
                <span className="ml-4  text-md">{route.name}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
      <div className="px-6 my-6">
        <Button className="font-sm" onClick={() => logout()}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default SidebarContent;
