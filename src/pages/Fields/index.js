import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Texts from "./Texts";
import Catalog from "./Catalog";

const RootWrapper = styled.div`
  padding: 80px 119px 0 32px;
`;

export default function Fields() {
  const landingNavMenu = useSelector((state) => state.app.landingNavMenu);

  const [selectedNavMenu, setSelectedNavMenu] = useState("texts");

  useEffect(() => {
    if (landingNavMenu === "texts" || landingNavMenu === "catalog") {
      setSelectedNavMenu(landingNavMenu);
    }
  }, [landingNavMenu]);

  return (
    <RootWrapper>
      {selectedNavMenu === "texts" && <Texts />}
      {selectedNavMenu === "catalog" && <Catalog />}
    </RootWrapper>
  );
}
