import React from "react";
import styled from "styled-components";

const options = [
  {
    label: "All results with all columns",
    value: "all-results-all columns",
  },
  {
    label: "All results with visible columns",
    value: "all-results-visible-columns",
  },
  {
    label: "Filtered results with all columns",
    value: "filtered-results-all-columns",
  },
  {
    label: "Filtered results with visible columns",
    value: "filtered-results-visible-columns",
  },
];

export default function DownloadDropDown({ onClose }) {
  const handleClickOption = () => () => {
    onClose();
  };

  return (
    <DropdownWrapper>
      <OptionsWrapper>
        {options.map((option) => (
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
  border: 1px solid #bdbdbd;
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

  &:hover {
    background: #eeeeee;
  }
`;

const OptionLabel = styled.div`
  color: #000000;
  font-size: 14px;
`;
