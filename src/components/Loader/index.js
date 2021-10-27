import React from "react";
import styled, { keyframes } from "styled-components";

export default function LoaderComponent({ border, width }) {
  const LoaderAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

  const Loader = styled.div`
    border: ${border};
    border-left: 4px solid;
    animation: load 1s infinite linear;
    border-radius: 50%;
    width: ${`${width}px`};
    height: ${`${width}px`};
    animation-name: ${LoaderAnimation};
    animation-duration: 1s;
    animation-iteration-count: infinite;
  `;

  return (
    <LoaderWrapper>
      <Loader />
    </LoaderWrapper>
  );
}

const LoaderWrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  z-index: 20;
`;
