/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import ReactSpinner from "../../../components/Loader/ReactSpinner";
import AgGrid from "../../../components/AgGrid";
import MayanLanguageKeyModal from "../../../components/Modals/MayanLanguageKeyModal";
// import { openModal } from "../../../store/app/actions";

import IconQuestionCircleImage from "../../../assets/images/icons/icon-question-circle.svg";
import { fetchLexical, setCatalogParams } from "../../../store/catalog/actions";
import { FETCH_LEXICAL_SUCCESS } from "../../../store/catalog/constants";

export default function Lexical({ data }) {
  const dispatch = useDispatch();

  const resCatalogParams = useSelector((state) => state.catalog.params);

  const columnDefs = [
    {
      headerName: "Mayan Language",
      width: 150,
      field: "mayanlang",
      cellRendererFramework: (row) => {
        const { data } = row;
        return (
          <span>
            <CellLineHeight />
            {data.Catlex?.mayanlang}
            <CellLineHeight />
          </span>
        );
      },
    },
    {
      headerName: "Mayan Word",
      width: 120,
      field: "mayanentry",
      cellRendererFramework: (row) => {
        const { data } = row;
        return (
          <span>
            <CellLineHeight />
            {data.Catlex?.mayanentry}
            <CellLineHeight />
          </span>
        );
      },
    },
    {
      headerName: "Gloss",
      width: 150,
      field: "trans",
      cellStyle: cellStyle,
      cellRendererFramework: (row) => {
        const { data } = row;
        return (
          <span>
            <CellLineHeight />
            {data.Catlex?.trans}
            <CellLineHeight />
          </span>
        );
      },
    },
    {
      headerName: "Citation",
      field: "citation",
      width: 700,
      cellStyle: cellStyle,
      cellRendererFramework: (row) => {
        const { data } = row;
        return (
          <div>
            <CellLineHeight />
            <div dangerouslySetInnerHTML={{ __html: data.Catlex?.citation }} />
            <CellLineHeight />
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const payload = {
        actionType: "lexical",
        data: resCatalogParams.data,
        limit: resCatalogParams.pageSize,
        offset: resCatalogParams.offset,
        orderkey: resCatalogParams.orderkey,
        direction: resCatalogParams.direction,
      };
      await dispatch(setCatalogParams(payload));

      const result = await dispatch(fetchLexical(data?.newcodesub));
      setIsLoading(false);

      if (result.type === FETCH_LEXICAL_SUCCESS) {
        // console.log(result);
        setTableData(result.payload.data);
      }
    }

    fetchData();
  }, [data]);

  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);
  const [isLanguage, setIsLanguage] = useState(false);

  const handleClickLanguageKey = () => {
    // dispatch(
    //   openModal({
    //     modal: "MAYAN_LANGUAGE_KEY",
    //   })
    // );
    setIsLanguage(!isLanguage);
  };

  const handleScrollToBottom = async () => {};

  return (
    <RootWrapper>
      <ReactSpinner loading={isLoading} />
      <AgGrid
        columnDefs={columnDefs}
        rowData={tableData}
        onScrollToBottom={handleScrollToBottom}
      />
      <LinkWrapper onClick={handleClickLanguageKey}>
        <Link>Mayan language key</Link>
        <IconWrapper>
          <IconImage src={IconQuestionCircleImage} />
        </IconWrapper>
      </LinkWrapper>
      {isLanguage && (
        <MayanLanguageKeyWrapper>
          <MayanLanguageKeyModal />
        </MayanLanguageKeyWrapper>
      )}
    </RootWrapper>
  );
}

const RootWrapper = styled.div`
  margin-top: 20px;
  position: relative;
`;

const LinkWrapper = styled.div`
  position: relative;
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const Link = styled.div`
  font-size: 18px;
  color: #001e89;
  text-decoration-line: underline;
  cursor: pointer;
  margin-right: 10px;
`;

const IconWrapper = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const IconImage = styled.img`
  width: 20px;
`;

const MayanLanguageKeyWrapper = styled.div`
  position: relative;
`;

const cellStyle = {
  lineHeight: "20px",
};

const CellLineHeight = styled.div`
  height: 10px;
`;
