import React from "react";
import styled from "styled-components";

const Alert = styled.div`
  width: ${({ width }) => width};
  background: ${({ bgColor }) => bgColor};
  border: 1px solid ${({ border }) => border};
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.45);
  border-radius: 4px;
  font-size: 12px;
  padding: 6px;
`;

export default function AlertComponent(props) {
  const { width, bgColor, border, color, children } = props;

  return (
    <Alert width={width} bgColor={bgColor} border={border} color={color}>
      {children}
    </Alert>
  );
}
