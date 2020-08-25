import React from "react";

export default (props, { value, name }, snapshot, className) => {
  return (
    <button
      {...props}
      className="select-search w-full block text-left py-2 pl-2"
      type="button"
    >
      {name}
    </button>
  );
};
