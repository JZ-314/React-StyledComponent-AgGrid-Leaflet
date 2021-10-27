import React from "react";
import Checkbox from "react-custom-checkbox";
import * as Icon from "react-icons/fi";

const CustomCheckbox = ({ checked, title, onChange }) => (
  <Checkbox
    icon={<Icon.FiCheck color="#545454" size={14} />}
    name="my-input"
    checked={checked}
    onChange={onChange(title)}
    borderColor="#929292"
    borderRadius={3}
    style={{ cursor: "pointer" }}
    labelStyle={{
      marginLeft: 10,
      userSelect: "none",
      fontSize: 14,
      color: "#505050",
    }}
    label={title}
  />
);

export default CustomCheckbox;
