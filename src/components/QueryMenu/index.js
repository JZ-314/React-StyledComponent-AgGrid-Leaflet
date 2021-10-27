import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import OutsideAlerter from "../OutsideAlerter";
// import SelectDropDown from "../../../Dropdown/Select";
import PreSelectDropdown from "../Dropdown/PreSelect";
// import DownloadDropdown from "../Dropdown/Download";
import NameDropdown from "../Dropdown/Name";
import WordListDropDown from "../Dropdown/WordList";
import ShowHideDropdown from "../Dropdown/ShowHide";

import { clickDownload, openModal } from "../../store/app/actions";

import { fetchMainTable, setMainTableParams } from "../../store/main/actions";
import { fetchCatalog, setCatalogParams } from "../../store/catalog/actions";
import { setSearchParams } from "../../store/search/actions";

export default function QueryMenu() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const resSelectParams = useSelector((state) => state.search.params);
  const queryMenu = useSelector((state) => state.app.queryMenu);
  const topMenu = location.pathname.includes("catalog") ? "Texts" : "Catalog";

  const [isTopMenu, setIsTopMenu] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [queryMenuList, setQueryMenuList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("landingParams")) {
      const landingParams = JSON.parse(localStorage.getItem("landingParams"));

      if (landingParams.type === "catalog") {
        setIsTopMenu(false);
      } else {
        setIsTopMenu(true);
      }
    }
  }, []);

  useEffect(() => {
    if (queryMenu) {
      const pathname = location.pathname;
      const searchType = JSON.parse(localStorage.getItem("landingParams")).type;
      let temp = queryMenu;

      if (searchType.includes("block") && !pathname.includes("catalog")) {
        const nameMenuIndex = queryMenu.findIndex(
          (menu) => menu.id === "names"
        );
        temp = [
          ...temp.slice(0, nameMenuIndex),
          ...temp.slice(nameMenuIndex + 1),
        ];
      }

      // if (
      //   (searchType === "codical-graphemes" ||
      //     searchType === "all-graphemes") &&
      //   !pathname.includes("catalog")
      // ) {
      //   const preSelectMenuIndex = queryMenu.findIndex(
      //     (menu) => menu.id === "pre-select"
      //   );
      //   temp = [
      //     ...temp.slice(0, preSelectMenuIndex),
      //     ...temp.slice(preSelectMenuIndex + 1),
      //   ];
      // }

      setQueryMenuList(temp);
    }
  }, [queryMenu]);

  const handleClickTopMenu = async () => {
    const landingParams = localStorage.getItem("landingParams");
    const landingSearchType = JSON.parse(landingParams).type;

    if (topMenu === "Catalog") {
      let type;

      if (landingSearchType.includes("classic")) {
        type = "classic";
      } else if (landingSearchType.includes("codical")) {
        type = "codical";
      } else {
        type = "";
      }

      const payload = {
        type,
        limit: 50,
        offset: 0,
      };

      localStorage.setItem("catalogParams", JSON.stringify(payload));
    }

    await dispatch(setSearchParams(null));
    if (topMenu === "Texts") {
      history.push("/main");
    } else {
      history.push("/catalog");
    }
  };

  const handleClickMenu = (item) => async () => {
    const pathname = location.pathname;
    const landingParams = localStorage.getItem("landingParams");
    const catalogParams = localStorage.getItem("catalogParams");
    setSelectedMenu(item.id);

    const limit = 50;
    const offset = 0;

    if (item.id === "select") {
      dispatch(
        openModal({
          modal: "SELECT_QUERY_MODAL",
        })
      );
    } else if (item.id === "save-search") {
      if (resSelectParams) {
        const { actionType, data, type, limit, search_type } = resSelectParams;
        const payload = {
          actionType,
          data,
          type,
          search_type,
          limit,
          offset: 0,
        };

        // save select query options
        localStorage.setItem("savedSelectOption", JSON.stringify(payload));
      }
    } else if (item.id === "download") {
      dispatch(clickDownload(true));
    } else if (item.id === "refresh") {
      // remove select query options
      localStorage.removeItem("savedSelectOption");
      await dispatch(setSearchParams(null));

      if (pathname.includes("catalog")) {
        const payload = {
          actionType: "catalog",
          type: JSON.parse(catalogParams).type,
          limit,
          offset,
          direction: "ASC",
          orderkey: "codeid",
        };

        await dispatch(setCatalogParams(payload));
        await dispatch(fetchCatalog(payload));
      }
      if (pathname.includes("main")) {
        if (pathname === "/main") {
          const payload = {
            actionType: "main",
            type: JSON.parse(landingParams).type,
            limit,
            offset,
            direction: "ASC",
            orderkey: "blsort",
          };

          await dispatch(setMainTableParams(payload));
          await dispatch(fetchMainTable(payload));
        } else {
          history.push("/main");
        }
      }
    }
  };

  return (
    <QueryMenuBar>
      <OutsideAlerter onClickOutside={() => setSelectedMenu("")}>
        <MenuWrapper>
          {isTopMenu && (
            <TopMenuWrapper onClick={handleClickTopMenu}>
              <MenuTitle>Switch To {topMenu}</MenuTitle>
            </TopMenuWrapper>
          )}
          {queryMenuList?.map((item) => (
            <MenuItemWrapper key={item.id}>
              <MenuItem onClick={handleClickMenu(item)}>
                <MenuTitle
                  isDisable={item.id === "save-search" && !resSelectParams}
                >
                  {item.title}
                </MenuTitle>
                {(item.id === "select" ||
                  item.id === "download" ||
                  item.id === "names" ||
                  item.id === "pre-select" ||
                  item.id === "show-hide" ||
                  item.id === "word-list") &&
                  item.icon}
                {item.id === "save-search" &&
                  localStorage.getItem("savedSelectOption") &&
                  item.icon}
              </MenuItem>
              {item.id === "pre-select" && selectedMenu === "pre-select" && (
                <PreSelectDropdown onClose={() => setSelectedMenu("")} />
              )}
              {/* {item.id === "download" && selectedMenu === "download" && (
                <DownloadDropdown onClose={() => setSelectedMenu("")} />
              )} */}
              {item.id === "names" && selectedMenu === "names" && (
                <NameDropdown onClose={() => setSelectedMenu("")} />
              )}
              {item.id === "word-list" && selectedMenu === "word-list" && (
                <WordListDropDown onClose={() => setSelectedMenu("")} />
              )}
              {item.id === "show-hide" && selectedMenu === "show-hide" && (
                <ShowHideDropdown onClose={() => setSelectedMenu("")} />
              )}
            </MenuItemWrapper>
          ))}
        </MenuWrapper>
      </OutsideAlerter>
    </QueryMenuBar>
  );
}

const QueryMenuBar = styled.div`
  background: #ffffff;
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  top: 88px;
  padding: 10px;
  z-index: 20;
`;

const TopMenuWrapper = styled.div`
  margin-bottom: 15px;
  cursor: pointer;
  font-weight: bold;

  span {
    font-size: 18px !important;
  }
`;

const MenuWrapper = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  margin-left: 120px;
  position: relative;
`;

const MenuItemWrapper = styled.li`
  position: relative;
  float: left;
  cursor: pointer;
`;

const MenuItem = styled.div`
  margin-right: 32px;
  display: fix;
  align-items: center;
`;

const MenuTitle = styled.span`
  color: ${({ isDisable }) => (isDisable ? "#d8d8d8cc" : "#000000cc")};
  letter-spacing: 0.01em;
  font-size: 16px;
  margin-right: 10px;
`;
