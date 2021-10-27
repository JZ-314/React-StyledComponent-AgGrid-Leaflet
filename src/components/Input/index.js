import React from "react";
import styled from "styled-components";

export default function MainInput(props) {
  const { type, placeholder, value, name, onChange, readOnly, width } = props;

  const Input = styled.input`
    padding: 5px 10px;
    border: 1px solid #b3b3b3;
    border-radius: 5px;
    color: #5a5a5a;
    width: ${width};

    &:focus {
      outline: none;
    }
  `;

  return (
    <Input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
  );
}
