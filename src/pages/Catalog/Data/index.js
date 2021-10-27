import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import ModalImage from "react-modal-image";

import MainButton from "../../../components/Buttons/MainButton";
import { closeModal } from "../../../store/app/actions";
import {
  fetchMainCatalog,
  setMainTableParams,
} from "../../../store/main/actions";
import { setSearchParams } from "../../../store/search/actions";
import ReactTooltip from "../../../components/Tooltip/ReactTooltip";
import ReactSpinner from "../../../components/Loader/ReactSpinner";
import { setPreselectParams } from "../../../store/preselect/actions";

// import { fetchCatalog } from "../../../store/catalog/actions";
// import { FETCH_CATALOG_SUCCESS } from "../../../store/catalog/constants";

// import CodeImage from "../../../assets/images/Catalog/image-code.svg";
// import TImage from "../../../assets/images/Catalog/image-t.svg";

export default function Data({ rowData }) {
  const history = useHistory();
  const dispatch = useDispatch();
  // const { pageSize } = params;

  const [isLoading, setIsLoading] = useState(false);
  // const [rowsData, setRowsData] = useState([]);
  // const [dataIndex, setDataIndex] = useState(0);
  // const [pageNumber, setPageNumber] = useState(0);
  // const [recordsFrom, setRecordsFrom] = useState(0);
  // const [recordsTo, setRecordsTo] = useState(0);
  // const [rowData, setRowData] = useState(null);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect(() => {
  //   // initial data
  //   setRowsData(params?.tableData);
  //   setRowData(params?.row);
  //   setPageNumber(params?.currentPage);

  //   const from = parseInt((params?.currentPage - 1) * pageSize) + 1;
  //   const to = from + pageSize - 1;
  //   setRecordsFrom(from);
  //   setRecordsTo(to);

  //   let index = 0;
  //   params?.tableData.forEach((item) => {
  //     if (item.codeid === params?.row?.codeid) {
  //       setDataIndex(index);
  //     }
  //     index++;
  //   });
  // }, []);

  // const handleClickButton = (type) => async () => {
  //   if (type === "prev") {
  //     if (dataIndex !== 0) {
  //       setDataIndex(dataIndex - 1);
  //       setRowData(rowsData[dataIndex - 1]);
  //     } else {
  //       fetchTableRows(type, pageNumber - 1);
  //     }
  //   } else if (type === "next") {
  //     if (dataIndex !== 9) {
  //       setDataIndex(dataIndex + 1);
  //       setRowData(rowsData[dataIndex + 1]);
  //     } else {
  //       fetchTableRows(type, pageNumber + 1);
  //     }
  //   }
  // };

  // const fetchTableRows = async (type, pageNum) => {
  //   if (isSubmitting) return;
  //   setIsSubmitting(true);

  //   let payload = {
  //     limit: pageSize,
  //     offset: parseInt((pageNum - 1) * pageSize),
  //   };

  //   const result = await dispatch(fetchCatalog(payload));
  //   setIsSubmitting(false);

  //   if (
  //     result.type === FETCH_CATALOG_SUCCESS &&
  //     result.payload?.data.length !== 0
  //   ) {
  //     setRowsData(result.payload?.data);
  //     setRowData(result.payload?.data[type === "prev" ? 9 : 0]);
  //     setPageNumber(pageNum);
  //     setDataIndex(type === "prev" ? 9 : 0);

  //     const from = parseInt((pageNum - 1) * pageSize) + 1;
  //     const to = from + pageSize - 1;
  //     setRecordsFrom(from);
  //     setRecordsTo(to);
  //   }
  // };

  const handleClickSearchTexts = async () => {
    if (isLoading) return;
    setIsLoading(true);

    if (localStorage.getItem("landingParams")) {
      const type = JSON.parse(localStorage.getItem("landingParams")).type;

      if (type !== "catalog") {
        const payload = {
          actionType: "main-catalog",
          code: `${rowData.codeid}`,
          limit: 50,
          offset: 0,
          orderkey: "blsort",
          direction: "ASC",
        };

        await dispatch(setSearchParams(null));
        await dispatch(setPreselectParams(null));
        await dispatch(setMainTableParams(payload));
        await dispatch(fetchMainCatalog(payload));
        setIsLoading(false);

        history.push("/main");
        dispatch(closeModal());
      }
    } else {
      history.push("/landing");
    }
  };

  return (
    <RootWrapper>
      <ReactSpinner loading={isLoading} />
      <DataWrapper>
        <FormWrapper>
          <InputWrapper>
            <InputLabel>code</InputLabel>
            <Input type="text" defaultValue={rowData?.graphcode} />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>subsort</InputLabel>
            <Input type="text" defaultValue={rowData?.subsort} />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>Classic/codical</InputLabel>
            <Input type="text" defaultValue={rowData?.volume} />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>technique</InputLabel>
            <Input type="text" defaultValue={rowData?.technique} />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>distribution</InputLabel>
            <Input type="text" defaultValue={rowData?.distribution} />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>usage</InputLabel>
            <Input type="text" defaultValue={rowData?.usage1} />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>syllabic</InputLabel>
            <Input type="text" defaultValue={rowData?.syllabic} />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>logographic</InputLabel>
            <Input type="text" defaultValue={rowData?.logographic} />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>logoCVC</InputLabel>
            <Input type="text" defaultValue={rowData?.logocvc} />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>English</InputLabel>
            <Input type="text" defaultValue={rowData?.english} />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>word class</InputLabel>
            <Input type="text" defaultValue={rowData?.wordclass} />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>calendrical name</InputLabel>
            <Input type="text" defaultValue={rowData?.calendrical} />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>picture</InputLabel>
            <Input type="text" defaultValue={rowData?.picture} />
          </InputWrapper>
          <InputWrapper>
            <InputLabel>notes</InputLabel>
            <Input type="text" defaultValue={rowData?.blimagenotes} />
          </InputWrapper>
        </FormWrapper>
        <ImagesWrapper>
          <ImageDataWrapper>
            <ImageDetailLabel>Code</ImageDetailLabel>
            <ImageDetailInput type="text" defaultValue={rowData?.graphcode1} />
            {/* <DataImage src={rowData?.lpict?.ThumbPubLink} /> */}
            <ImageWrapper>
              {rowData?.lpict && (
                <ImageWrapper
                  data-for="lpict"
                  data-tip="lpict"
                  data-iscapture="true"
                >
                  <ModalImage
                    small={rowData?.lpict?.ThumbPubLink}
                    large={rowData?.lpict?.OrgPubLink}
                    alt={rowData?.lpict?.FileName}
                  />
                  <ReactTooltip id="lpict" place="top" />
                  {/* <Tooltip left="20%" top="105%" width="100px">
                    lpict
                  </Tooltip> */}
                </ImageWrapper>
              )}
            </ImageWrapper>
          </ImageDataWrapper>
          <ImageDataWrapper>
            <ImageDetailSubLabel>T#</ImageDetailSubLabel>
            <ImageDetailSubInput type="text" defaultValue={rowData?.tno} />
            {/* <DataImage src={rowData?.tpict?.ThumbPubLink} /> */}
            <LowerImageWrapper>
              {rowData?.tpict && (
                <LowerImageWrapper
                  data-for="tpict"
                  data-tip="tpict"
                  data-iscapture="true"
                >
                  <ModalImage
                    small={rowData?.tpict?.ThumbPubLink}
                    large={rowData?.tpict?.OrgPubLink}
                    alt={rowData?.tpict?.FileName}
                  />
                  <ReactTooltip id="tpict" place="top" />
                  {/* <Tooltip left="20%" top="105%" width="100px">
                    tpict
                  </Tooltip> */}
                </LowerImageWrapper>
              )}
            </LowerImageWrapper>
          </ImageDataWrapper>
        </ImagesWrapper>
      </DataWrapper>
      <ActionButtonWrapper>
        {/* <SelectRecordText>
          Selected record {recordsFrom} of {recordsTo}
        </SelectRecordText> */}
        <ButtonWrapper>
          <MainButton
            color="#448344"
            size="16px"
            bgColor="#EEEEEE"
            padding="12px"
            onClick={handleClickSearchTexts}
          >
            Search Texts
          </MainButton>
          {/* <MainButton
            color="#FFFFFF"
            size="18px"
            bgColor="rgba(0, 0, 0, 0.88);"
            padding="4px"
            onClick={handleClickButton("prev")}
          >
            {"<"} Preview
          </MainButton>
          <MainButton
            color="#FFFFFF"
            size="18px"
            bgColor="rgba(0, 0, 0, 0.88);"
            padding="4px"
            onClick={handleClickButton("next")}
          >
            Next {">"}
          </MainButton> */}
        </ButtonWrapper>
      </ActionButtonWrapper>
    </RootWrapper>
  );
}

const RootWrapper = styled.div`
  margin: 30px 0;
`;

const DataWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FormWrapper = styled.div``;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

const InputLabel = styled.label`
  color: rgba(0, 0, 0, 0.8);
  font-size: 18px;
  margin-right: 8px;
`;

const Input = styled.input`
  width: 300px;
  height: 24px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  border-radius: 4px;
  padding-left: 10px;

  &:focus {
    outline: none !important;
  }
`;

const ActionButtonWrapper = styled.div`
  margin-left: 100px;
`;

// const SelectRecordText = styled.div`
//   margin-top: 16px;
//   color: rgba(0, 0, 0, 0.32);
//   font-size: 18px;
// `;

const ButtonWrapper = styled.div`
  float: left;
  margin-top: 25px;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 20px 30px;
`;

const ImagesWrapper = styled.div`
  background: #eeeeee;
  border-radius: 4px;
  padding: 16px 72px;
`;

const ImageDataWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const ImageDetailLabel = styled.label`
  color: rgba(0, 0, 0, 0.8);
  font-weight: bold;
  font-size: 32px;
  margin-right: 8px;
`;

const ImageDetailInput = styled.input`
  width: 170px;
  min-height: 32px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  border-radius: 4px;
  padding-left: 10px;
  margin-right: 8px;
  font-size: 32px;

  &:focus {
    outline: none !important;
  }
`;

const ImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  background: #fff;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover span {
    visibility: visible;
  }

  img:not(#react-modal-image-img) {
    opacity: 0.89;
    max-width: 200px !important;
    max-height: 200px !important;
  }
`;

const LowerImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  background: #fff;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  div:first-child {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover span {
    visibility: visible;
  }

  img:not(#react-modal-image-img) {
    opacity: 0.89;
    max-width: 150px !important;
    max-height: 150px !important;
  }
`;

// const DataImage = styled.img`
//   opacity: 0.89;
//   border-radius: 4px;
//   width: 200px;
//   height: 200px;
// `;

// const ImageStyle = {
//   opacity: 0.89,
//   borderRadius: 4,
//   width: 200,
//   height: 200,
// };

const ImageDetailSubLabel = styled.label`
  font-size: 24px;
  color: rgba(0, 0, 0, 0.8);
  margin-right: 8px;
`;

const ImageDetailSubInput = styled.input`
  width: 170px;
  min-height: 24px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  border-radius: 4px;
  margin-right: 8px;
  padding-left: 10px;
  font-size: 24px;

  &:focus {
    outline: none !important;
  }
`;
