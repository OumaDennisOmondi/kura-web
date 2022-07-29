import React from "react";
import classNames from "classnames";

function RoundIcon({
  icon,
  iconColorClass = "text-purple-600 dark:text-purple-100",
  bgColorClass = "bg-purple-100 dark:bg-purple-600",
  className,
}) {
  const baseStyle = "p-3 rounded-full";

  const cls = classNames(baseStyle, iconColorClass, bgColorClass, className);
  return (
    <div
      className={cls}
      style={{ width: "50px", height: "50px", textAlign: "center" }}
    >
      <i className={icon}></i>
    </div>
  );
}

export default RoundIcon;
