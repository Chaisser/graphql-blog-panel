import React from "react";
import { Link } from "react-router-dom";

const SubMenuItem = (props) => {
  return (
    <Link
      to={props.url}
      className="flex items-center font-semibold text-sm bg-gray-200 rounded-lg py-1 px-4 mr-5 text-gray-600 hover:bg-blue-100"
    >
      {props.title}
    </Link>
  );
};

export default SubMenuItem;
