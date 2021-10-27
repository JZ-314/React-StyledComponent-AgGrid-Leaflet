import React, { Fragment, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import Logo from "../../../../assets/images/header/logo-black.svg";
import { landingMenu } from "../../../../configs/menuConfig";

const RootWrapper = styled.div`
  background: #f3f3f3;
  width: 100%;
  height: 88px;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 20;
`;

const LogoWrapper = styled.a``;

const LogoImage = styled.img`
  height: 72px;
  padding-left: 120px;
`;

const LandingMenuWrapper = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  margin-right: 120px;
`;

const MenuItemWrapper = styled.li`
  float: left;
  margin-left: 80px;
  color: rgba(0, 0, 0, 0.64);
  cursor: pointer;
`;

const SelectedMenuItemWrapper = styled.li`
  float: left;
  margin-left: 80px;
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
`;

const MenuTitle = styled.span`
  font-size: 18px;
`;

const UserWrapper = styled.div`
  background: #c4c4c4;
  border-radius: 50%;
  color: #000000;
  font-size: 18px;
  padding: 5px;
  margin-left: 84px;
  cursor: pointer;
`;

export default function LandingHeader() {
  const history = useHistory();

  const [menuItems, setMenuItems] = useState(landingMenu);

  const handleClickMenu = (item) => () => {
    const updatedMenuItem = {
      id: item.id,
      title: item.title,
      isClick: !item.isClick,
      navLink: item.navLink,
    };

    const tempMenuItems = [];
    menuItems.forEach((item) => {
      if (item.id !== updatedMenuItem.id) {
        item.isClick = false;
        tempMenuItems.push(item);
      } else {
        item.isClick = true;
        tempMenuItems.push(item);
      }
    });
    setMenuItems(tempMenuItems);

    history.push(item.link);
  };

  return (
    <RootWrapper>
      <LogoWrapper href="/">
        <LogoImage src={Logo} />
      </LogoWrapper>
      <LandingMenuWrapper>
        {menuItems.map((menu) => (
          <Fragment key={menu.id}>
            {!menu.isClick ? (
              <MenuItemWrapper onClick={handleClickMenu(menu)}>
                <MenuTitle>{menu.title}</MenuTitle>
              </MenuItemWrapper>
            ) : (
              <SelectedMenuItemWrapper onClick={handleClickMenu(menu)}>
                <MenuTitle>{menu.title}</MenuTitle>
              </SelectedMenuItemWrapper>
            )}
          </Fragment>
        ))}
        <UserWrapper>AB</UserWrapper>
      </LandingMenuWrapper>
    </RootWrapper>
  );
}
