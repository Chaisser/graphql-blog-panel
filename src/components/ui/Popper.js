import React from "react";
import ReactTooltip from "react-tooltip";

export default (props) => {
  const { data } = props;
  return (
    <React.Fragment>
      <span data-for={props.dataId} data-tip>
        {props.title}
      </span>
      <ReactTooltip id={props.dataId} effect="solid" type="dark" place="right">
        {data.map((item, i) => (
          <p key={i}>
            <span>{item.title}</span>
          </p>
        ))}
      </ReactTooltip>
    </React.Fragment>
  );
};
