import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { SearchQueryList } from "../../../configs/searchQueryConfigs";

export default function SelectDropDown({ onClose }) {
  const history = useHistory();

  const handleClickOption = (option) => async () => {
    const payload = {
      type: option.value,
      limit: 10,
      offset: 0,
    };

    if (option.value === "catalog") {
      history.push(`/catalog`, { params: payload });
    } else {
      history.push(`/main`, { params: payload });
    }

    onClose();
  };

  return (
    <DropdownWrapper>
      <OptionsWrapper>
        {SearchQueryList.map((option) => (
          <OptionItem key={option.value} onClick={handleClickOption(option)}>
            <OptionLabel>{option.label}</OptionLabel>
          </OptionItem>
        ))}
      </OptionsWrapper>
    </DropdownWrapper>
  );
}

const DropdownWrapper = styled.div`
  position: absolute;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  top: 35px;
  z-index: 100;
`;

const OptionsWrapper = styled.div`
  width: 250px;
`;

const OptionItem = styled.div`
  padding: 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  cursor: pointer;

  &:hover {
    background: #eeeeee;
  }
`;

const OptionLabel = styled.div`
  color: #000000;
  font-size: 14px;
`;
