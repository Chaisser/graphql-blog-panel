import React from "react";

export default (props) => {
  return (
    <td
      className={`${props.custom} text-gray-800 text-sm bg-white border border-gray-200 px-4 py-2`}
      {...props}
    >
      {props.children}
    </td>
  );
};
