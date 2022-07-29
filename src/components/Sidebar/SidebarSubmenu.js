import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DropdownIcon } from "../../icons";
import { Transition } from "@windmill/react-ui";

function SidebarSubmenu({ route }) {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
  const [isSubDropdownMenuOpen, setIsSubDropdownMenuOpen] = useState(false);

  function handleDropdownMenuClick() {
    setIsDropdownMenuOpen(!isDropdownMenuOpen);
  }
  function handleSubDropdownMenuClick() {
    setIsSubDropdownMenuOpen(!isSubDropdownMenuOpen);
  }

  return (
    <li className="relative px-6 py-3" key={route.name}>
      <button
        className="py-2 inline-flex items-center justify-between w-full text-sm duration-150 hover:text-gray-800 dark:hover:text-gray-200"
        onClick={handleDropdownMenuClick}
        aria-haspopup="true"
      >
        <span className="inline-flex items-center">
          <i className={route.icon}></i>
          <span className="ml-2 text-md">{route.name}</span>
        </span>
        <DropdownIcon className="w-4 h-4" aria-hidden="true" />
      </button>
      <Transition
        show={isDropdownMenuOpen}
        enter="transition-all ease-in-out duration-300"
        enterFrom="opacity-25 max-h-0"
        enterTo="opacity-100 max-h-xl"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100 max-h-xl"
        leaveTo="opacity-0 max-h-0"
      >
        <ul
          className="p-2 mt-2 space-y-2 overflow-hidden  text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
          aria-label="submenu"
        >
          {route.routes.map((r) => (
            <li
              className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              key={r.name}
            >
              {r.routes ? (
                <>
                  <button
                    className=" py-2 px-1 inline-flex items-center justify-between w-full  transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                    onClick={handleSubDropdownMenuClick}
                    aria-haspopup="true"
                  >
                    <span className="inline-flex items-center">
                      <i className={r.icon}></i>
                      <span className="ml-4 text-md">{r.name}55</span>
                    </span>
                    <DropdownIcon className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <Transition
                    show={isSubDropdownMenuOpen}
                    enter="transition-all ease-in-out duration-300"
                    enterFrom="opacity-25 max-h-0"
                    enterTo="opacity-100 max-h-xl"
                    leave="transition-all ease-in-out duration-300"
                    leaveFrom="opacity-100 max-h-xl"
                    leaveTo="opacity-0 max-h-0"
                  >
                    <ul
                      className="p-2 mt-2 space-y-2 overflow-hidden font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                      aria-label="submenu"
                    >
                      {r.routes.map((rr) => (
                        <li
                          className="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                          key={rr.name}
                        >
                          <Link
                            className="w-full d-flex align-center"
                            to={rr.path}
                          >
                            <span className="inline-flex items-center">
                              <i className={rr.icon}></i>
                              <span className="ml-4 text-md">{rr.name}yy</span>
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Transition>
                </>
              ) : (
                <Link className="w-full" to={r.path}>
                  <span className="inline-flex items-center">
                    <i className={r.icon}></i>
                    <span className="ml-4 text-xs">{r.name}</span>
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </Transition>
    </li>
  );
}

export default SidebarSubmenu;
