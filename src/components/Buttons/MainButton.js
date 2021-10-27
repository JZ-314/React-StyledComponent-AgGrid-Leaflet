import React from "react";
import styled from "styled-components";

export default function MainButton({
  type,
  children,
  color,
  bgColor,
  size,
  padding,
  onClick,
}) {
  const Button = styled.button`
    min-width: 145px;
    color: ${color};
    background: ${bgColor};
    font-size: ${size};
    padding: ${padding};
    border: none;
    border-radius: 4px;
    cursor: pointer;
  `;

  return (
    <Button type={type} onClick={onClick}>
      {children}
    </Button>
  );
}
