import React from "react";
import { Link } from "react-router-dom";
const TopMenuItem = (props) => {
  return (
    <Link to={props.url} className="rounded-t-sm py-3 px-4 inline-block hover:text-yellow-400">
      {props.title}
    </Link>
  );
};

export default TopMenuItem;
