import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import SearchIcon from "../../assets/images/Landing/icon-search.svg";
import { SearchQueryList } from "../../configs/searchQueryConfigs";
import {
  Notification,
  NotificationContainer,
} from "../../components/Notification";
import Tooltip from "../../components/Tooltip";
import { fetchMainTable, setMainTableParams } from "../../store/main/actions";
import { useDispatch } from "react-redux";

const RootWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  max-width: 740px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin-top: 114px;
`;

const Title = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  line-height: 58px;
  text-align: center;
  text-transform: uppercase;
`;

const Description = styled.div`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 32px;
  text-align: center;
  margin: 32px 0;
`;

const SearchWrapper = styled.div`
  width: 100%;
  position: relative;
  display: inline-block;
`;

const SearchInputWrapper = styled.div`
  width: 100%;
  height: 56px;
  position: relative;
  display: flex;+
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.32);
  border-radius: ${({ isFocusSearchInput }) =>
    !isFocusSearchInput ? `0 8px 8px 0` : `0 8px 0 0`};
  border: none;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  padding: 0px;
  color: rgba(255, 255, 255, 0.64);
  position: relative;

  &:focus {
    outline: none !important;
    border: none;
  }

  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: rgba(255, 255, 255, 0.64);
    opacity: 1; /* Firefox */
  }
`;

const SearchIconButton = styled.button`
  height: 100%;
  padding: 0 18px;
  background: rgba(255, 255, 255, 0.32);
  border: none;
  border-radius: ${({ isFocusSearchInput }) =>
    !isFocusSearchInput ? `8px 0 0 8px` : `8px 0 0 0px`};
`;

const SearchIconImage = styled.img`
  width: 19px;
  height: 19px;
`;

// const SearchButton = styled.button`
//   padding: 16px 45px;
//   height: 100%;
//   background: #ffffff;
//   border-radius: 8px;
//   border: none;
//   position: absolute;
//   text-transform: uppercase;
//   color: rgba(0, 0, 0, 0.88);
//   font-weight: 600;
//   font-size: 18px;
//   top: 0;
//   right: 0;
//   cursor: pointer;

//   &:hover {
//     background: #dcdcdc;
//   }
// `;

const QuestionIconWrapper = styled.div`
  height: 100%;
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;

  &:hover span {
    visibility: visible;
  }
`;

const QuestionIcon = styled.i`
  font-size: 24px;
`;

const SearchQueryListWrapper = styled.ul`
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const SearchQueryItemWrapper = styled.li`
  max-width: 740px;
  height: 64px;
  background: rgba(0, 0, 0, 0.64);
  border-bottom: 0.3px solid rgba(255, 255, 255, 0.32);
  border-left: 0.3px solid rgba(255, 255, 255, 0.32);
  border-right: 0.3px solid rgba(255, 255, 255, 0.32);
  border-radius: 0px;
  cursor: pointer;
  font-weight: normal;
  display: fixed;
  align-items: center;

  &:hover {
    font-weight: bold;
  }
`;
const SearchQueryLabel = styled.span`
  font-size: 18px;
  padding-left: 45px;
`;

export default function Landing() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    Notification(
      "success",
      "We have sent a verification email. Please verify email."
    );
  }, []);

  const [isFocusSearchInput, setIsFocusSearchInput] = useState(false);
  const [searchText, setSearchText] = useState({
    label: "",
    value: "",
  });

  const handleSearchInputFocus = () => {
    setIsFocusSearchInput(true);
  };

  const handleChangeInput = () => {
    setIsFocusSearchInput(false);
    // setSearchText(e.target.value);
  };

  const handleClickSearchQuery = (query) => async () => {
    setSearchText(query);
    setIsFocusSearchInput(false);

    let payload = {
      actionType: "landing",
      type: query.value,
      limit: 50,
      offset: 0,
    };

    if (query.value === "catalog") {
      localStorage.setItem("landingParams", JSON.stringify(payload));

      history.push(`/catalog`);
    } else {
      payload = {
        actionType: "landing",
        type: query.value,
        limit: 50,
        offset: 0,
        orderkey: "blsort",
        direction: "ASC",
      };

      localStorage.setItem("landingParams", JSON.stringify(payload));

      history.push(`/main`);

      await dispatch(setMainTableParams(payload));
      await dispatch(fetchMainTable(payload));
    }
  };

  // const handleClickSearchButton = async () => {
  //   if (searchText.value === "") {
  //     setIsFocusSearchInput(true);
  //   } else {
  //     const payload = {
  //       type: searchText.value,
  //       limit: 10,
  //       offset: 0,
  //     };

  //     if (searchText.value === "catalog") {
  //       history.push(`/catalog`, { params: payload });
  //     } else {
  //       history.push(`/main`, { params: payload });
  //     }
  //   }
  // };

  return (
    <RootWrapper>
      <ContentWrapper>
        <Title>Explore the maya hieroglyphic script</Title>
        <Description>
          The Maya people of southern Mexico, Guatemala, Belize and parts
          of Honduras and El Salvador developed the most sophisticated writing
          system of ancient Mesoamerica. Representing the full phonetic
          inventory of the Mayan language, the script was used continuously for
          nearly 2000 years. Explore the content of these texts, which were
          inscribed on monuments, portable objects, and books.
        </Description>
        <SearchWrapper>
          <SearchInputWrapper>
            <SearchIconButton isFocusSearchInput={isFocusSearchInput}>
              <SearchIconImage src={SearchIcon} />
            </SearchIconButton>
            <SearchInput
              type="text"
              placeholder="Search Texts and/or Catalog"
              onFocus={handleSearchInputFocus}
              // onBlur={() => setIsFocusSearchInput(false)}
              onChange={handleChangeInput}
              value={searchText.label}
              isFocusSearchInput={isFocusSearchInput}
            />
            <QuestionIconWrapper>
              <QuestionIcon className="far fa-question-circle"></QuestionIcon>
              <Tooltip top="60%" left="-20%">
                Select "Classic" to choose non-codical texts. Select "Blocks" to
                choose glyph blocks. Select "Graphemes" to choose records for
                each grapheme, including dynamic integration with catalog and
                name search. See Resources page for more details.
              </Tooltip>
            </QuestionIconWrapper>
            {/* <SearchButton onClick={handleClickSearchButton}>
              Search
            </SearchButton> */}
          </SearchInputWrapper>
        </SearchWrapper>
        {isFocusSearchInput && (
          <SearchQueryListWrapper>
            {SearchQueryList.map((item) => (
              <SearchQueryItemWrapper
                onClick={handleClickSearchQuery(item)}
                key={item.value}
              >
                <SearchQueryLabel>{item.label}</SearchQueryLabel>
              </SearchQueryItemWrapper>
            ))}
          </SearchQueryListWrapper>
        )}
      </ContentWrapper>
      <NotificationContainer />
    </RootWrapper>
  );
}
