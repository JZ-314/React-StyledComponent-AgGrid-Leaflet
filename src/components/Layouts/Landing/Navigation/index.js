import React, { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import {
  aboutNavigation,
  fieldNavigation,
} from "../../../../configs/landingNavigationConfigs";
import { setLandingNavMenu } from "../../../../store/app/actions";

const RootWrapper = styled.div`
  background: rgba(0, 0, 0, 0.48);
  width: 499px;
  height: 100vh;
  position: fixed;
  z-index: 10;
`;

const MenuWrapper = styled.ul`
  margin: 168px 120px 0;
  list-style-type: none;
  padding: 0;
`;

const MenuItemWrapper = styled.li`
  color: rgba(255, 255, 255, 0.64);
  margin-bottom: 32px;
  cursor: pointer;
`;
const SelectedMenuItemWrapper = styled.li`
  color: #ffffff;
  margin-bottom: 32px;
  cursor: pointer;
`;

const MenuTitle = styled.span`
  font-size: ${({ pathname }) =>
    pathname === "about" ? "18px" : pathname === "fields" ? "24px" : "18px"};
  font-weight: ${({ pathname }) =>
    pathname === "about"
      ? "normal"
      : pathname === "fields"
      ? "bold"
      : "normal"};
`;

export default function LandingNavigation() {
  const location = useLocation();
  // const history = useHistory();
  const dispatch = useDispatch();

  const [pathname, setPathname] = useState("");
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    if (location.pathname === "/about") {
      setMenuItems(aboutNavigation);
      setPathname("about");
    } else if (location.pathname === "/fields") {
      setMenuItems(fieldNavigation);
      setPathname("fields");
    } else if (location.pathname === "/resources") {
      setMenuItems([]);
      setPathname("resources");
    }
  }, [location]);

  const handleClickMenu = (item) => () => {
    const updatedMenuItem = {
      id: item.id,
      title: item.title,
      isClick: !item.isClick,
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

    dispatch(setLandingNavMenu(item.id));
  };

  return (
    <RootWrapper>
      <MenuWrapper>
        {menuItems.map((menu) => (
          <Fragment key={menu.id}>
            {!menu.isClick ? (
              <MenuItemWrapper onClick={handleClickMenu(menu)}>
                <MenuTitle pathname={pathname}>{menu.title}</MenuTitle>
              </MenuItemWrapper>
            ) : (
              <SelectedMenuItemWrapper onClick={handleClickMenu(menu)}>
                <MenuTitle pathname={pathname}>{menu.title}</MenuTitle>
              </SelectedMenuItemWrapper>
            )}
          </Fragment>
        ))}
      </MenuWrapper>
    </RootWrapper>
  );
}
