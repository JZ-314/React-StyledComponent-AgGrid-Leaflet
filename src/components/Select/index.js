import React from "react";
import styled from "styled-components";

export default function MainSelect(props) {
  const { options, name, value, onChange } = props;

  return (
    <Select onChange={onChange} name={name} value={value}>
      {options.map((option) => (
        <Option value={option.value} key={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
}

const Select = styled.select`
  padding: 4px;
  border: 1px solid #b3b3b3;
  border-radius: 5px;
  color: #5a5a5a;

  &:focus {
    outline: none;
  }
`;

const Option = styled.option`
  &:hover {
    background: #5a5a5a;
  }
`;
