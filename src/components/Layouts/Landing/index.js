import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import Navigation from "./Navigation";
import Header from "./Header";
// import Modal from '../../Modals';

import BannerBg from "../../../assets/images/Landing/banner.svg";

const RootWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  font-family: Inter;
`;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(28, 28, 28, 0) 9.22%,
    #1c1c1c 96.55%
  );
  transform: matrix(1, 0, 0, -1, 0, 0);
  position: absolute;
  z-index: 10;
`;

const BannerImage = styled.img`
  width: 100%;
  height: 100vh;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
`;

const Container = styled.div`
  position: relative;
  padding-top: 88px;
  color: #fff;
  z-index: 10;
  margin-left: ${({ isSideNav }) => (!isSideNav ? "0px" : "499px")};
  overflow: auto;
  height: 90vh;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const LandingLayout = ({ children }) => {
  // const history = useHistory();
  const location = useLocation();
  // const dispatch = useDispatch();
  // const app = useSelector((state) => state.app);

  const [isHeader, setIsHeader] = useState(false);
  const [isSideNav, setIsSideNav] = useState(false);

  useEffect(() => {
    const path = location.pathname;

    if (
      path === "/" ||
      path === "/about" ||
      path === "/fields" ||
      path === "/resources"
    ) {
      setIsHeader(true);
    }
    if (path === "/about" || path === "/fields" || path === "/resources") {
      setIsSideNav(true);
    }
  }, [location]);
  return (
    <RootWrapper>
      <Background />
      <BannerImage src={BannerBg} />
      {isHeader && <Header />}
      {isSideNav && <Navigation />}
      <Container isSideNav={isSideNav}>{children}</Container>
      {/* <Modal /> */}
    </RootWrapper>
  );
};

export default LandingLayout;
