import React from "react";
import styled, { keyframes } from "styled-components";
import { useSpring, animated } from "react-spring";

export default function LoadingButton({
  children,
  type,
  color,
  bgColor,
  size,
  padding,
  isLoading,
}) {
  const Button = styled.button`
    width: 100%;
    color: ${color};
    background: ${bgColor};
    font-size: ${size};
    padding: ${padding};
    border: none;
    border-radius: 4px;
    cursor: pointer;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  `;

  const ButtonText = styled.span`
    color: ${color};
    font-size: ${size};
    margin-right: 10px;
  `;

  const LoaderAnimation = keyframes`
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  `;

  const Loader = styled.div`
    border: 4px solid rgb(128 128 128 / 55%);
    border-left: 4px solid;
    animation: load 1s infinite linear;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    animation-name: ${LoaderAnimation};
    animation-duration: 1s;
    animation-iteration-count: infinite;
  `;

  const fadeOutProps = useSpring({ opacity: isLoading ? 1 : 0 });
  const fadeInProps = useSpring({ opacity: isLoading ? 0 : 1 });

  return (
    <Button type={type} disabled={isLoading}>
      {isLoading ? (
        <animated.div style={fadeOutProps}>
          <ButtonText>{children}</ButtonText>
          <Loader />
        </animated.div>
      ) : (
        <animated.div style={fadeInProps}>{children}</animated.div>
      )}
    </Button>
  );
}
