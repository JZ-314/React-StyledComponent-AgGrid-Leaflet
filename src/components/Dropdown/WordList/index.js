import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  fetchMainWordList,
  setWordListParams,
} from "../../../store/wordList/actions";

const options = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "All non-names",
    value: "all-non-names",
  },
  {
    label: "Classic",
    value: "classic",
  },
  {
    label: "Classic non-names",
    value: "classic-non-names",
  },
  {
    label: "Codical",
    value: "codical",
  },
  {
    label: "Codical non-names",
    value: "codical-non-names",
  },
];

export default function WordListDropDown({ onClose }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickOption = (option) => async () => {
    const payload = {
      actionType: "wordList",
      type: option.value,
      limit: 50,
      offset: 0,
    };

    history.push(`/main-words`);
    onClose();

    await dispatch(setWordListParams(payload));
    await dispatch(fetchMainWordList(payload));
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
