import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { SidebarContext } from "../context/SidebarContext";
import { MoonIcon, SunIcon, BellIcon, MenuIcon } from "../icons";
import Logo from "../assets/img/logo.png";
import User from "../assets/img/user.png";
import {
  Avatar,
  Badge,
  Input,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from "@windmill/react-ui";

import { auth, notify } from "../helpers";
function Header() {
  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);

  const [dateTime, setDateTime] = useState(new Date().toISOString());
  const [timeofDay, setTimeofday] = useState("");
  const user = auth.getToken();
  let history = useHistory();
  let location = useLocation();

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  function calenderClock() {
    setInterval(function () {
      const date = new Date().toDateString();
      const time = new Date().toLocaleTimeString();

      //time of day
      const curHr = new Date().getHours();

      if (curHr < 12) {
        setTimeofday("Good morning");
      } else if (curHr < 18) {
        setTimeofday("Good afternoon");
      } else {
        setTimeofday("Good evening");
      }
      setDateTime(date + " " + time);
    }, 1000);
  }

  useEffect(() => {
    calenderClock();
    return () => {};
  }, [dateTime]);

  const logout = () => {
    auth.logout(() => {
      notify("Success", "Logged out succesfully", "success");
      history.push("/login");
    });
  };

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between  h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6 text-blue-500" aria-hidden="true" />
        </button>
        <h1 className="ml-6 text-md font-bold text-gray-800 dark:text-gray-200">
          Wajir 2022
        </h1>
        <div className="flex items-center justify-end align-center">
          <p className="text-gray-700 text-sm dark:text-gray-400">
            <i className="fas fa-calendar" aria-hidden="true"></i> {dateTime}
          </p>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === "dark" ? (
                <SunIcon className="w-5 h-5 text-blue-500" aria-hidden="true" />
              ) : (
                <MoonIcon
                  className="w-5 h-5 text-blue-500"
                  aria-hidden="true"
                />
              )}
            </button>
          </li>
          {/* <!-- Notifications menu --> */}
          <li className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={handleNotificationsClick}
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <BellIcon className="w-5 h-5 text-blue-500" aria-hidden="true" />
              {/* <!-- Notification badge --> */}
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
              ></span>
            </button>

            {/*<Dropdown
              align="right"
              isOpen={isNotificationsMenuOpen}
              onClose={() => setIsNotificationsMenuOpen(false)}
            >
              <DropdownItem tag="a" href="#" className="justify-between">
                <span>Complete</span>
                <Badge type="success">1</Badge>
              </DropdownItem>
              <DropdownItem tag="a" href="#" className="justify-between">
                <span>Running</span>
                <Badge type="primary">2</Badge>
              </DropdownItem>
              <DropdownItem tag="a" href="#" className="justify-between">
                <span>Failed</span>
                <Badge type="danger">5</Badge>
              </DropdownItem>
            </Dropdown>*/}
          </li>
          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <Avatar
                className="align-middle"
                src={User}
                alt=""
                aria-hidden="true"
              />
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <DropdownItem tag="a" href="#">
                <span>
                  {" "}
                  {timeofDay}, "Omosh"
                  {/*{timeofDay}, {user.user.username.split("@")[0]}*/}
                </span>
                <hr />
              </DropdownItem>

              <DropdownItem onClick={() => logout()}>
                <i className="fas fa-power-off mr-1 text-gray-400"></i>
                <span>Logout</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
