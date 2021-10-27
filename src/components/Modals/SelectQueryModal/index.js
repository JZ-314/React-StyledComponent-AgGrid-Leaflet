import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";

import MainSelect from "../../Select";
import MainInput from "../../Input";
import MainButton from "../../Buttons/MainButton";

import {
  SelectTitleOption,
  SelectOperatorOptions,
  SelectCatalogColumnOptions,
} from "../../../configs/searchQueryConfigs";
import IconClose from "../../../assets/images/icons/icon-close.svg";
import {
  fetchMainSearch,
  setSearchParams,
  setSearchSelectQuery,
} from "../../../store/search/actions";
import ReactSpinner from "../../Loader/ReactSpinner";

// const AndOrOptions = [
//   { value: "AND", label: "AND" },
//   { value: "OR", label: "OR" },
// ];

export default function SelectQueryModal({ closeModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const resSearchSelectQuery = useSelector((state) => state.search.selectQuery);
  const resSearch = useSelector((state) => state.search);

  useEffect(() => {
    const { loading } = resSearch;
    setIsSubmitting(loading);
  }, [resSearch]);

  const [columnOptions, setColumnOptions] = useState([]);
  const [formState, setFormState] = useState({
    column: columnOptions[0]?.value,
    operator: SelectOperatorOptions[0]?.value,
    keyword: "",
    fromNumber: null,
    toNumber: null,
  });

  const [selectedOptionForms, setSelectedOptionForms] = useState([]);
  const [orArray] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const options = location.pathname.includes("catalog")
      ? SelectCatalogColumnOptions
      : SelectTitleOption;
    setColumnOptions(options);
    setFormState({ ...formState, column: options[0].value });
  }, [location.pathname]);

  const handleChangeInput = useCallback(
    (e) => {
      e.preventDefault();
      if (e.target.name === "subsort" || e.target.name === "codeid") {
        setFormState({
          ...formState,
          [e.target.name]: parseInt(e.target.value),
        });
      } else {
        setFormState({ ...formState, [e.target.name]: e.target.value });
      }
    },
    [formState]
  );

  const handleAddSelectOptions = () => {
    setSelectedOptionForms([...selectedOptionForms, formState]);

    // if (formState.query === "OR" && selectedOptionForms.length !== 0) {
    //   setOrArray([...orArray, selectedOptionForms]);
    // } else {
    //   if (formState.query === "OR") {
    //     updated.push(formState);
    //     setOrArray([...orArray, updated]);
    //   } else {
    //     updated = [...selectedOptionForms, formState];
    //     setSelectedOptionForms(updated);

    //     if (orArray.length === 0) {
    //       setOrArray([...orArray, updated]);
    //     } else {
    //       orArray[orArray.length - 1] = [
    //         ...orArray[orArray.length - 1],
    //         formState,
    //       ];
    //       setOrArray(orArray);
    //     }
    //   }
    // }
    // setSelectedOptionForms([]);
    setFormState({
      ...formState,
      keyword: "",
      fromNumber: 0,
      toNumber: 0,
    });
  };

  const handleClickRemoveRow = (index) => () => {
    const updated = [
      ...selectedOptionForms.slice(0, index),
      ...selectedOptionForms.slice(index + 1),
    ];
    setSelectedOptionForms(updated);
  };

  const handleSubmitSearch = (type) => async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const landingParams = localStorage.getItem("landingParams");
    const catalogParams = localStorage.getItem("catalogParams");

    // setOrArray([...orArray, selectedOptionForms]);
    const tempArray = [...orArray, selectedOptionForms];

    // const oldSelectedQuery = localStorage.getItem("selectedQuery");
    const oldSelectedQuery = resSearchSelectQuery;

    if (landingParams) {
      const pathname = location.pathname;
      let dataQueryType;
      let searchType;
      let payload;
      let orderkey;
      let direction = "ASC";
      const limit = 50;

      if (pathname.includes("catalog")) {
        searchType = "catalog";
        dataQueryType = JSON.parse(catalogParams).type;
        orderkey = "codeid";
      } else {
        searchType = "text";
        dataQueryType = JSON.parse(landingParams).type;
        orderkey = "blsort";
      }

      if (type === "select" || type === "find") {
        await dispatch(setSearchSelectQuery(selectedOptionForms));

        payload = {
          actionType: "select",
          data: tempArray,
          type: dataQueryType,
          search_type: searchType,
          limit: type === "select" ? limit : 1,
          orderkey,
          direction,
          offset: 0,
        };
      } else if (type === "select-within") {
        let withInArray = [];

        if (oldSelectedQuery) {
          withInArray = [
            ...orArray,
            [...selectedOptionForms, ...oldSelectedQuery],
          ];
        } else {
          withInArray = [...orArray, selectedOptionForms];
        }

        payload = {
          actionType: "select",
          data: withInArray,
          type: dataQueryType,
          search_type: searchType,
          limit,
          orderkey,
          direction,
          offset: 0,
        };

        await dispatch(
          setSearchSelectQuery([...selectedOptionForms, ...oldSelectedQuery])
        );
      } else if (type === "select-additional") {
        let additionalArray = tempArray;

        if (oldSelectedQuery) {
          additionalArray = [
            ...additionalArray,
            [...orArray, ...oldSelectedQuery],
          ];
        }

        payload = {
          actionType: "select",
          data: additionalArray,
          type: dataQueryType,
          search_type: searchType,
          orderkey,
          direction,
          limit,
          offset: 0,
        };
      }

      history.push(searchType === "text" ? "/main" : "catalog");
      await dispatch(setSearchParams(payload));
      await dispatch(fetchMainSearch("select", payload));
      closeModal();
    } else {
      history.push("/");
    }
  };

  return (
    <ModalWrapper>
      <ReactSpinner loading={isSubmitting} />
      <Form>
        <ModalHeader>
          <IconShareImage src={IconClose} onClick={closeModal} />
        </ModalHeader>
        <ModalContent>
          <SelectOptionButtonsWrapper>
            {/* <OptionButton
              onClick={handleSubmitSearch("find")}
              disabled={selectedOptionForms.length === 0}
            >
              Find
            </OptionButton> */}
            <OptionButton
              onClick={handleSubmitSearch("select")}
              disabled={selectedOptionForms.length === 0}
            >
              Select
            </OptionButton>
            <OptionButton
              onClick={handleSubmitSearch("select-within")}
              disabled={selectedOptionForms.length === 0}
            >
              Select Within
            </OptionButton>
            <OptionButton
              onClick={handleSubmitSearch("select-additional")}
              disabled={selectedOptionForms.length === 0}
            >
              Select Additional
            </OptionButton>
          </SelectOptionButtonsWrapper>
          <SelectOptionsWrapper>
            <MainSelect
              options={SelectOperatorOptions}
              name="operator"
              value={formState.operator}
              onChange={handleChangeInput}
            />
            <MainSelect
              options={columnOptions}
              name="column"
              value={formState.column}
              onChange={handleChangeInput}
            />
            {formState.operator === "number_of_words_is_between" ? (
              <KeywordsInputWrapper>
                <Input
                  type="number"
                  name="fromNumber"
                  placeholder="From"
                  width="95px"
                  value={formState.fromNumber}
                  onChange={handleChangeInput}
                  required
                />
                <Input
                  type="number"
                  name="toNumber"
                  width="95px"
                  placeholder="To"
                  value={formState.toNumber}
                  onChange={handleChangeInput}
                  required
                />
              </KeywordsInputWrapper>
            ) : (
              <Input
                type="text"
                name="keyword"
                placeholder="Keyword"
                value={formState.keyword}
                onChange={handleChangeInput}
                readOnly={
                  formState.operator === "not_empty" ||
                  formState.operator === "empty"
                }
                required
              />
            )}
            <MainButton
              type="button"
              color="#FFFFFF"
              size="16px"
              bgColor="rgba(0, 0, 0, 0.88)"
              padding="4px"
              onClick={handleAddSelectOptions}
            >
              Add
            </MainButton>
          </SelectOptionsWrapper>
          <OperatorWrapper>
            {/* {orArray.map((orItem, index) => (
              <OperatorFieldSet key={index}>
                <OperatorText runat="server" visible="true">
                  OR
                </OperatorText>
                <DeleteIconImageWrapper>
                  <DeleteIconImage
                    src={IconClose}
                    onClick={handleClickRemoveRow(orItem, index)}
                  />
                </DeleteIconImageWrapper> */}
            {selectedOptionForms?.map((item, index) => (
              <SelectedOptionsFormsWrapper
                key={`${index}-${item.query}`}
                isNumberWordsBetween={
                  item.operator === "number_of_words_is_between"
                }
              >
                <FormText isFirstChild={index === 0}>AND</FormText>
                <MainInput
                  type="text"
                  name="operator"
                  value={item.operator}
                  readOnly
                />
                <MainInput
                  type="text"
                  name="column"
                  value={item.column}
                  readOnly
                />
                {item.operator === "number_of_words_is_between" ? (
                  <KeywordsInputWrapper>
                    <MainInput
                      type="number"
                      name="fromNumber"
                      width="95px"
                      value={item.fromNumber}
                      readOnly
                    />
                    <MainInput
                      type="number"
                      name="toNumber"
                      width="95px"
                      value={item.toNumber}
                      readOnly
                    />
                  </KeywordsInputWrapper>
                ) : (
                  <MainInput
                    type="text"
                    name="keyword"
                    value={item.keyword}
                    readOnly
                  />
                )}
                <DeleteIconImageWrapper>
                  <DeleteIconImage
                    src={IconClose}
                    onClick={handleClickRemoveRow(index)}
                  />
                </DeleteIconImageWrapper>
              </SelectedOptionsFormsWrapper>
            ))}
            {/* </OperatorFieldSet>
            ))} */}
          </OperatorWrapper>
        </ModalContent>
        {/* <ModalFooter>
          <ButtonWrapper>
            <MainButton
              type="button"
              color="#FFFFFF"
              size="16px"
              bgColor="rgba(0, 0, 0, 0.88)"
              padding="3px"
              onClick={handleSubmitSearch}
            >
              Search
            </MainButton>
          </ButtonWrapper>
        </ModalFooter> */}
      </Form>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.04);
  border-radius: 2px;
  padding: 12px;
`;

const Form = styled.div``;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const IconShareImage = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const ModalContent = styled.div`
  padding: 20px;
`;

const SelectOptionButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 10px;
  padding-bottom: 10px;
  padding-left: 200px;
`;

const OptionButton = styled.button`
  border-radius: 5px;
  border: 1px solid #b3b3b3;
  padding: 4px;
`;

const SelectOptionsWrapper = styled.form`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #5a5a5a;
  justify-content: space-between;
  align-items: center;
`;

const OperatorWrapper = styled.form`
  margin: 10px 0;
  overflow: auto;
  max-height: 400px;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const KeywordsInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: auto;

  input:last-child {
    margin-left: 10px;
  }
`;

// const OperatorFieldSet = styled.fieldset`
//   position: relative;
//   margin: 20px 0;
//   border-radius: 5px;
//   border: 1px solid #5a5a5a;
//   align-items: center;
//   padding: 10px;
//   margin-bottom: 20px;
// `;

// const OperatorText = styled.legend`
//   position: absolute;
//   width: auto;
//   padding: 0 10px;
//   top: -18px;
//   left: 10px;
//   font-size: 20px;
//   font-weight: bold;
//   background: #fff;
// `;

const SelectedOptionsFormsWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-gap: 10px;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
`;

const FormText = styled.span`
  color: #5a5a5a;
  text-align: center;
  color: ${({ isFirstChild }) => (isFirstChild ? "#fff" : "#5a5a5a")};
`;

const DeleteIconImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const DeleteIconImage = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

// const ModalFooter = styled.div`
//   padding: 0 20px;
// `;

// const ButtonWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-end;
//   margin-bottom: 10px;

//   button {
//     margin-left: 10px;
//   }
// `;

const Input = styled.input`
  padding: 5px 10px;
  border: 1px solid #b3b3b3;
  border-radius: 5px;
  color: #5a5a5a;
  width: ${({ width }) => width};

  &:focus {
    outline: none;
  }
`;
