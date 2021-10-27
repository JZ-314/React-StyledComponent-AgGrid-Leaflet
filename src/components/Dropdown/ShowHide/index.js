/* eslint-disable react/jsx-key */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { ShowHideOptions } from "../../../configs/searchQueryConfigs";
import Checkbox from "../../Checkbox";

import { setMainTableColumns } from "../../../store/main/actions";

export default function ShowHideDropdown() {
  const dispatch = useDispatch();
  const resCheckboxOptions = useSelector(
    (state) => state.main.mainTableColumns
  );

  const [checkboxOptions, setCheckboxOptions] = useState(ShowHideOptions);

  useEffect(() => {
    if (resCheckboxOptions) {
      setCheckboxOptions(resCheckboxOptions);
    }
  }, [resCheckboxOptions]);

  const handleCheckboxChange = (headerName) => async (value) => {
    const temp = checkboxOptions;

    temp.forEach((item) => {
      if (item.headerName === headerName) {
        item.isChecked = value;
      }
    });

    setCheckboxOptions(temp);
    await dispatch(setMainTableColumns(temp));
  };

  return (
    <DropdownWrapper>
      {checkboxOptions.map((option) => (
        <Checkbox
          key={option.headerName}
          title={option.headerName}
          checked={option.isChecked}
          onChange={handleCheckboxChange}
        />
      ))}
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
  padding: 20px;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px 10px;
`;
