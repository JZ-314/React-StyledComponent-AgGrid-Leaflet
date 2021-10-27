import React from "react";
import styled from "styled-components";

import Header from "./Header";
import QueryMenu from "../../QueryMenu";
import Modal from "../../Modals";

const RootWrapper = styled.div`
  ${"" /* width: 100%; */}
  height: 100vh;
  position: relative;
  background: #fafafa;
`;

const Container = styled.div`
  position: relative;
  padding-top: 88px;
  color: #fff;
  z-index: 15;
`;

const MainLayout = ({ children }) => {
  return (
    <RootWrapper>
      <Header />
      <QueryMenu />
      <Container>{children}</Container>
      <Modal />
    </RootWrapper>
  );
};

export default MainLayout;
