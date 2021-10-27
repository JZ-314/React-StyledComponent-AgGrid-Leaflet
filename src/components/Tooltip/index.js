import React from "react";
import styled from "styled-components";

export default function TooltipComponent({
  children,
  top,
  left,
  fontSize,
  width,
}) {
  return (
    <TooltipWrapper top={top} left={left} fontSize={fontSize} width={width}>
      {children}
    </TooltipWrapper>
  );
}

const TooltipWrapper = styled.span`
  visibility: hidden;
  width: ${({ width }) => (width ? width : "350px")};
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
  text-align: left;
  border-radius: 6px;
  padding: 10px;
  position: absolute;
  z-index: 1;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "14px")};
  word-wrap: break-word;
  line-height: 24px;
  border: 1px solid #e5e5e5;
  box-shadow: 0 14px 28px rgb(0 0 0 / 10%), 0 10px 10px rgb(0 0 0 / 10%);

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 100%;
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent #e5e5e5 transparent transparent;
  }
`;
