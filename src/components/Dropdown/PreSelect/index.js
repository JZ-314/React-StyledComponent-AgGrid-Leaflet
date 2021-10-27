import React, { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import MainButton from "../../Buttons/MainButton";
import ReactCollapsible from "../../ReactCollapsible";

import { preSelectMenu } from "../../../configs/searchQueryConfigs";

import {
  setPreselectParams,
  fetchPreSelect,
} from "../../../store/preselect/actions";

export default function PreSelectDropdown({ onClose }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const limit = 50;
  let orderkey = "blsort";
  let direction = "ASC";

  const [preselectMenuList, setPreselectMenuList] = useState([]);
  const [showSubMenu, setShowSubMenu] = useState({
    isShow: false,
    option: null,
  });
  // const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedSemanticOption, setSelectedSemanticOption] =
    useState("260 cycle");

  useEffect(() => {
    if (localStorage.getItem("landingParams")) {
      const type = JSON.parse(localStorage.getItem("landingParams")).type;

      if (type === "classic-block" || type === "classic-graphemes") {
        setPreselectMenuList(preSelectMenu);
      } else if (type === "codical-block" || type === "all-block") {
        const temp = [
          {
            title: "Blocks",
            options: [preSelectMenu[0].options[3]],
          },
        ];

        setPreselectMenuList(temp);
      }
    }
  }, []);

  const handleClickMenu = (option) => async () => {
    setShowSubMenu({
      isShow: false,
      option: null,
    });

    // setSelectedMenu(option.value);
    if (localStorage.getItem("landingParams")) {
      const landingType = JSON.parse(
        localStorage.getItem("landingParams")
      ).type;

      const payload = {
        actionType: "preselect",
        type: option.value,
        landingType,
        keyword: "",
        limit,
        offset: 0,
        orderkey,
        direction,
      };

      await dispatch(setPreselectParams(payload));
      history.push("/main");
      await dispatch(fetchPreSelect(payload));
    } else {
      history.push("/landing");
    }

    onClose();
  };

  const handleClickSubMenu = (option) => async () => {
    const payload = {
      actionType: "preselect",
      type: option.value,
      keyword: selectedSemanticOption,
      limit,
      offset: 0,
      orderkey,
      direction,
    };

    history.push("/main");
    await dispatch(setPreselectParams(payload));
    await dispatch(fetchPreSelect(payload));

    onClose();
  };
  // console.log(preselectMenuList);
  return (
    <DropdownWrapper>
      <OptionsWrapper>
        {preselectMenuList.map((menu) => (
          <Fragment key={menu.title}>
            <ReactCollapsible title={menu.title}>
              {menu.options.map((option) => (
                <Fragment key={option.value}>
                  {!option.isSubMenu ? (
                    <OptionItem
                      key={option.value}
                      onClick={handleClickMenu(option)}
                    >
                      <OptionLabel>{option.label}</OptionLabel>
                    </OptionItem>
                  ) : (
                    <OptionSubMenuItemWrapper
                      key={option.value}
                      onMouseEnter={() =>
                        setShowSubMenu({
                          isShow: true,
                          option,
                        })
                      }
                      onClick={() =>
                        setShowSubMenu({
                          isShow: false,
                          option: null,
                        })
                      }
                    >
                      <OptionItem isShowSub={showSubMenu.isShow}>
                        <OptionLabel>{option.label}</OptionLabel>
                      </OptionItem>
                    </OptionSubMenuItemWrapper>
                  )}
                </Fragment>
              ))}
            </ReactCollapsible>
            {showSubMenu.isShow && (
              <SubMenuWrapper>
                <SubMenuTitle>{showSubMenu.option?.label}</SubMenuTitle>
                <SubMenuSelect
                  onChange={(e) => setSelectedSemanticOption(e.target.value)}
                >
                  {showSubMenu.option?.subMenu.map((subOption) => (
                    <SubMenuOption
                      key={subOption.label}
                      value={subOption.label}
                    >
                      {subOption.label}
                    </SubMenuOption>
                  ))}
                </SubMenuSelect>
                <ButtonWrapper>
                  <MainButton
                    color="#FFFFFF"
                    size="16px"
                    bgColor="rgba(0, 0, 0, 0.88)"
                    padding="3px"
                    onClick={handleClickSubMenu(showSubMenu.option)}
                  >
                    Apply
                  </MainButton>
                </ButtonWrapper>
              </SubMenuWrapper>
            )}
          </Fragment>
        ))}
      </OptionsWrapper>
    </DropdownWrapper>
  );
}

const DropdownWrapper = styled.div`
  position: absolute;
  background: #ffffff;
  border: 1px solid #0000004a;
  top: 35px;
  z-index: 100;
  box-shadow: 0 14px 28px rgb(0 0 0 / 10%), 0 10px 10px rgb(0 0 0 / 10%);
`;

const OptionsWrapper = styled.div`
  width: 250px;
`;

const OptionItem = styled.div`
  padding: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  cursor: pointer;

  background: ${({ isShowSub }) => (isShowSub ? "#eeeeee" : "#fff")};

  &:hover {
    background: #eeeeee;
  }
`;

const OptionLabel = styled.div`
  font-size: 14px;
  color: #2f2f2fe0;
`;

const OptionSubMenuItemWrapper = styled.div`
  position: relative;
`;

const SubMenuWrapper = styled.div`
  width: 400px;
  height: 230px;
  position: absolute;
  background: #ffffff;
  border: 1px solid #bdbdbd;
  z-index: 100;
  top: -1px;
  left: 100%;
  padding: 20px;
  box-shadow: 0 14px 28px rgb(0 0 0 / 10%), 0 10px 10px rgb(0 0 0 / 10%);
`;

const SubMenuTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #6b6b6b;
`;

const SubMenuSelect = styled.select`
  width: 100%;
  border: 1px solid #5f5f5fcc;
  color: #6b6b6b;
  padding: 4px;
  font-size: 14px;

  &:focus {
    outline: none;
  }
`;

const SubMenuOption = styled.option`
  color: #6b6b6b;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
`;
