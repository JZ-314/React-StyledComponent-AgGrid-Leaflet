import React from "react";
import ReactTooltip from "react-tooltip";

export default function ReactTooltipComponent({ id, type, place }) {
  return (
    <ReactTooltip
      id={id}
      place={place}
      type={type}
      // effect={effect}
      multiline={true}
    />
  );
}
