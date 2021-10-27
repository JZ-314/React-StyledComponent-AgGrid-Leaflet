import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import AboutProject from "./AboutProject";
import HistoryProject from "./HistoryProject";
import ProjectTeam from "./ProjectTeam";
import Acknowledgments from "./Acknowledgments";
import Legal from "./Legal";

const RootWrapper = styled.div`
  padding: 80px 119px 0 32px;
`;

export default function About() {
  const landingNavMenu = useSelector((state) => state.app.landingNavMenu);

  const [selectedNavMenu, setSelectedNavMenu] = useState("about-project");

  useEffect(() => {
    if (
      landingNavMenu === "about-project" ||
      landingNavMenu === "history-project" ||
      landingNavMenu === "project-team" ||
      landingNavMenu === "acknowledgments" ||
      landingNavMenu === "legal"
    ) {
      setSelectedNavMenu(landingNavMenu);
    }
  }, [landingNavMenu]);

  return (
    <RootWrapper>
      {selectedNavMenu === "about-project" && <AboutProject />}
      {selectedNavMenu === "history-project" && <HistoryProject />}
      {selectedNavMenu === "project-team" && <ProjectTeam />}
      {selectedNavMenu === "acknowledgments" && <Acknowledgments />}
      {selectedNavMenu === "legal" && <Legal />}
    </RootWrapper>
  );
}
