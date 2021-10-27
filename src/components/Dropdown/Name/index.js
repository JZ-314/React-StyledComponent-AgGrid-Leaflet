import React, { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  fetchMainSearch,
  setSearchParams,
} from "../../../store/search/actions";

import MainButton from "../../Buttons/MainButton";

export default function NameDropdown({ onClose }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    nickname: "",
    translation: "",
    bySite: "",
    find: "",
  });

  const handleChangeInput = useCallback(
    (e) => {
      setFormState({ ...formState, [e.target.name]: e.target.value });
    },
    [formState]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isSubmitting) return;
      setIsSubmitting(true);

      let type;
      let keyword;
      if (formState.name !== "") {
        type = "name-search";
        keyword = formState.name;
      } else if (formState.nickname !== "") {
        type = "nickname";
        keyword = formState.nickname;
      } else if (formState.translation !== "") {
        type = "translation";
        keyword = formState.translation;
      } else if (formState.bySite !== "") {
        type = "bysite";
        keyword = formState.bySite;
      } else if (formState.find !== "") {
        type = formState.find;
        keyword = "";
      }

      if (localStorage.getItem("landingParams")) {
        const landingSearchType = JSON.parse(
          localStorage.getItem("landingParams")
        ).type;
        let landingType;

        if (landingSearchType.includes("classic")) {
          landingType = "classic";
        } else if (landingSearchType.includes("codical")) {
          landingType = "codical";
        } else if (landingSearchType.includes("all")) {
          landingType = "all";
        }

        const payload = {
          actionType: "name",
          landingType,
          type,
          keyword,
          orderkey: "propname",
          direction: "ASC",
          limit: 50,
          offset: 0,
        };

        history.push("/main-names");
        onClose();

        await dispatch(setSearchParams(payload));
        await dispatch(fetchMainSearch("name", payload));
        setIsSubmitting(false);
      } else {
        history.push("/landing");
      }
    },
    [formState]
  );

  return (
    <DropdownWrapper>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <Label>Name search</Label>
          <Input
            type="text"
            name="name"
            value={formState.name}
            onChange={handleChangeInput}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Nickname search</Label>
          <Input
            type="text"
            name="nickname"
            value={formState.nickname}
            onChange={handleChangeInput}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Translation search</Label>
          <Input
            type="text"
            name="translation"
            value={formState.translation}
            onChange={handleChangeInput}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Personal name by site</Label>
          <Input
            type="text"
            name="bySite"
            value={formState.bySite}
            onChange={handleChangeInput}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Find</Label>
          <Select
            value={formState.find}
            name="find"
            onChange={handleChangeInput}
          >
            <SelectOption value="" disabled>
              Select
            </SelectOption>
            <SelectOption value="deities">Deities</SelectOption>
            <SelectOption value="structures">Structures</SelectOption>
            <SelectOption value="monuments">Monuments</SelectOption>
            <SelectOption value="persons">Persons</SelectOption>
            <SelectOption value="toponyms">Toponyms</SelectOption>
          </Select>
        </InputWrapper>
        <ButtonWrapper>
          <MainButton
            type="submit"
            color="#FFFFFF"
            size="16px"
            bgColor="rgba(0, 0, 0, 0.88)"
            padding="4px"
          >
            Search
          </MainButton>
        </ButtonWrapper>
      </Form>
    </DropdownWrapper>
  );
}

const DropdownWrapper = styled.div`
  position: absolute;
  top: 36px;
  z-index: 100;
  background: #fff;
  padding: 20px;
  border: 1px solid #bdbdbd;
  box-shadow: 0 14px 28px rgb(0 0 0 / 10%), 0 10px 10px rgb(0 0 0 / 10%);
`;

const Form = styled.form``;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.8);
  margin-right: 8px;
  white-space: nowrap;
`;

const Input = styled.input`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  padding: 5px 10px;

  &:focus {
    outline: none;
  }
`;

const Select = styled.select`
  width: 190px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  padding: 5px 10px;

  &:focus {
    outline: none;
  }
`;

const SelectOption = styled.option``;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
