import React from "react";
import styled from "styled-components";
import { Default } from "react-spinners-css";

export default function ReactSpinner({ loading }) {
  return (
    <SpinnerWrapper>
      {loading && <Default color="#696969" style={override} size={90} />}
    </SpinnerWrapper>
  );
}

const SpinnerWrapper = styled.div`
  position: absolute;
  left: 47%;
  top: 40%;
  z-index: 20;
`;

const override = {
  display: "block",
};
