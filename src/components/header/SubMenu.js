import React from "react";
import SubMenuItem from "./subMenuItem";

const SubMenu = (props) => {
  return (
    <div className="bg-white py-3 mb-5">
      <div className="container mx-auto">
        <div className="flex justify-center items-center">
          {props.data.map((item, i) => (
            <SubMenuItem key={i} url={item.url} title={item.title} />
          ))}
        </div>
        <div className="flex"></div>
      </div>
    </div>
  );
};

export default SubMenu;
