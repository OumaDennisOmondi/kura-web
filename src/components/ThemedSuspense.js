import React from "react";
import Loader from "../assets/img/suspense-loader.svg";
function ThemedSuspense() {
  return (
    <div className="flex justify-center align-center w-full h-screen p-6 text-lg font-medium text-gray-600 dark:text-gray-400 dark:bg-gray-900">
      <img
        src={Loader}
        style={{ width: "6rem", height: "6rem" }}
        alt="Loading..."
      ></img>
    </div>
  );
}

export default ThemedSuspense;
