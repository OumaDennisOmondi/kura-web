import React from "react";

function GridCard({ children, title }) {
  return (
    <div className="min-w-0 px-10 py-5 flex flex-col bg-white rounded-lg shadow-xs dark:bg-gray-800">
      <div className="flex justify-between">
        <p className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
          {title}
        </p>
        <p className="mb-4 font-semibold text-blue-800 dark:text-blue-300 cursor-pointer">
          View All &nbsp;
          <i className="fas fa-arrow-right text-sm" aria-hidden="true"></i>
        </p>
      </div>
      {/*<hr className="mb-2 text-gray-800 dark:text-gray-300" />*/}
      <p>{children}</p>
    </div>
  );
}

export default GridCard;
