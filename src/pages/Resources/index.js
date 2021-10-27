import React from "react";
import styled from "styled-components";

export default function Resources() {
  return (
    <RootWrapper>
      <Title>Resources</Title>
    </RootWrapper>
  );
}

const RootWrapper = styled.div`
  padding: 80px 119px 0 32px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 36px;
`;
