import React from "react";

export default (props) => {
  return (
    <th className={`${props.custom} text-sm px-4 py-2 font-semibold border border-yellow-200 bg-yellow-100`}>
      {props.children}
    </th>
  );
};
