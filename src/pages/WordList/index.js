/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import ReactSpinner from "../../components/Loader/ReactSpinner";
import AgGrid from "../../components/AgGrid";

// import { openModal } from "../../store/app/actions";
import { setQueryMenu } from "../../store/app/actions";

import { mainQueryMenu } from "../../configs/queryMenuConfigs";
import {
  fetchMainWordList,
  setWordListParams,
} from "../../store/wordList/actions";
import { FETCH_MAIN_WORD_LIST_SUCCESS } from "../../store/wordList/constants";

export default function WordList() {
  const dispatch = useDispatch();

  const columnDefs = [
    {
      headerName: "Maya",
      field: "grmaya",
      cellRendererFramework: (row) => {
        const { data } = row;
        return (
          <span>
            <CellLineHeight />
            {data?.grmaya}
            <CellLineHeight />
          </span>
        );
      },
    },
    {
      headerName: "English",
      field: "grengl",
      cellRendererFramework: (row) => {
        const { data } = row;
        return (
          <span>
            <CellLineHeight />
            {data?.grengl}
            <CellLineHeight />
          </span>
        );
      },
    },
  ];

  const resWordList = useSelector((state) => state.wordList);
  const resWordListParams = resWordList.params;

  const [isLoading, setIsLoading] = useState(true);
  const [isScroll, setIsScroll] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize] = useState(50);
  const [dataOffset, setDataOffset] = useState(0);

  useEffect(() => {
    async function fetchData() {
      await dispatch(setQueryMenu(mainQueryMenu));
    }

    fetchData();
  }, []);

  useEffect(() => {
    const { loading, data, params } = resWordList;
    setIsLoading(loading);

    if (data.data) {
      if (params?.actionType === "wordList") {
        setTableData(data.data);
        setTotalRecords(data.counts);
        setDataOffset(0);
      }
    }
  }, [resWordList]);

  const handleScrollToBottom = async () => {
    if (isLoading) return;
    if (isScroll) return;
    if (tableData?.length === totalRecords) return;
    setIsScroll(true);

    // const { colId, sort } = sortState;
    const offset = dataOffset + pageSize;
    setDataOffset(offset);

    const payload = {
      actionType: "scrollToBottom",
      type: resWordListParams.type,
      limit: pageSize,
      offset,
    };

    await dispatch(setWordListParams(payload));
    const result = await dispatch(fetchMainWordList(payload));
    if (result.type === FETCH_MAIN_WORD_LIST_SUCCESS) {
      setTableData([...tableData, ...result.payload.data]);
    }
    setIsScroll(false);
  };

  return (
    <RootWrapper>
      <ReactSpinner loading={isLoading} />
      <AgGrid
        columnDefs={columnDefs}
        rowData={tableData}
        totalRecords={totalRecords}
        dataOffset={dataOffset}
        onScrollToBottom={handleScrollToBottom}
        isTotalRecords
      />
    </RootWrapper>
  );
}

const RootWrapper = styled.div`
  margin-top: 130px;
  padding: 0px 120px;
  position: relative;
`;
const CellLineHeight = styled.div`
  height: 10px;
`;
