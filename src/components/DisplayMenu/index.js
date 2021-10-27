import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import DisplayMenuItem from "./DisplayMenuItem";

export default function DisplayMenu({
  menu = [],
  activeTab,
  bgColor,
  onClickTab = () => {},
}) {
  const history = useHistory();

  const handleClickTab = (id) => {
    onClickTab(id);

    if (id === "main-table") {
      history.push("/main");
    }
  };

  return (
    <RootWrapper bgColor={bgColor}>
      <MenuWrapper>
        {menu.map((item) => (
          <DisplayMenuItem
            key={item.id}
            title={item.title}
            isActive={activeTab === item.id}
            onTabItemClicked={() => handleClickTab(item.id)}
          />
        ))}
      </MenuWrapper>
    </RootWrapper>
  );
}

const RootWrapper = styled.div`
  background: ${({ bgColor }) => bgColor};
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 170px;
  z-index: 20;
`;

const MenuWrapper = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-left: 120px;
`;
