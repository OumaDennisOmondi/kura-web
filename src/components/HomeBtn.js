import React from "react";

function HomeBtn({ title, icon }) {
  return (
    <div className="flex flex-col items-center justify-between p-2 mb-4 text-xs font-semibold text-blue-100 bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer shadow-md focus:outline-none focus:shadow-outline-blue">
      <i className={icon}></i>
      <p>{title}</p>
    </div>
  );
}

function SecondaryBtn({ title, icon }) {
  return (
    <div className="flex flex-col items-center justify-between rounded-lg mb-4 text-sm p-1  text-gray-200  cursor-pointer hover:bg-gray-200 focus:outline-none hover:shadow-outline-gray">
      <i className={icon}></i>
      <p className="text-xs text-gray-600 dark:text-gray-400">{title}</p>
    </div>
  );
}

export { HomeBtn, SecondaryBtn };


