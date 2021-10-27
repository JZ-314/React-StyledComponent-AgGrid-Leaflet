/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import ReactSpinner from "../../components/Loader/ReactSpinner";
import AgGrid from "../../components/AgGrid";

// import { openModal } from "../../store/app/actions";
import { setQueryMenu } from "../../store/app/actions";

import { mainQueryMenu } from "../../configs/queryMenuConfigs";
import { fetchMainSearch, setSearchParams } from "../../store/search/actions";
import { FETCH_MAIN_SEARCH_SUCCESS } from "../../store/search/constants";
import { fetchMainText, setMainTableParams } from "../../store/main/actions";
import { setPreselectParams } from "../../store/preselect/actions";

export default function Names() {
  const history = useHistory();
  const dispatch = useDispatch();

  const columnDefs = [
    {
      headerName: "Name",
      field: "propname",
      sort: "asc",
      cellRendererFramework: (row) => {
        const { data } = row;
        return (
          <span>
            <CellLineHeight />
            {data?.propname}
            <CellLineHeight />
          </span>
        );
      },
    },
    {
      headerName: "Translation",
      field: "engltrans",
      cellRendererFramework: (row) => {
        const { data } = row;
        return (
          <span>
            <CellLineHeight />
            {data?.engltrans}
            <CellLineHeight />
          </span>
        );
      },
    },
    {
      headerName: "Nickname",
      field: "nickname",
      cellRendererFramework: (row) => {
        const { data } = row;
        return (
          <span>
            <CellLineHeight />
            {data?.nickname}
            <CellLineHeight />
          </span>
        );
      },
    },
    {
      headerName: "Site",
      field: "pnsite",
      cellRendererFramework: (row) => {
        const { data } = row;
        return (
          <span>
            <CellLineHeight />
            {data?.pnsite}
            <CellLineHeight />
          </span>
        );
      },
    },
  ];

  const resSearch = useSelector((state) => state.search);
  const resSearchParams = resSearch.params;
  const resMain = useSelector((state) => state.main);

  const [isLoading, setIsLoading] = useState(false);
  const [isScrollBottom, setIsScrollBottom] = useState(false);
  // const [dataSource, setDataSource] = useState("name");
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
    const { loading, data } = resSearch;
    setIsLoading(loading);

    if (data.data) {
      if (resSearchParams?.actionType === "name") {
        // setDataSource("name");
        setTableData(data.data);
        setTotalRecords(data.counts);
        setDataOffset(0);
      }
    }
  }, [resSearch]);

  useEffect(() => {
    const { loading } = resMain;
    setIsLoading(loading);
  }, [resMain.loading]);

  const handleRowClicked = async (row) => {
    if (isLoading) return;
    setIsLoading(true);

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
      pncode: row.data?.pncode.replace(/ /g, ""),
      orderkey: "blsort",
      direction: "ASC",
    };

    await dispatch(setSearchParams(null));
    await dispatch(setPreselectParams(null));
    await dispatch(setMainTableParams(payload));
    await dispatch(fetchMainText(payload));
    setIsLoading(false);

    history.push("/main");
  };

  const handleScrollToBottom = async () => {
    if (isLoading) return;
    if (isScrollBottom) return;
    if (tableData?.length === totalRecords) return;
    setIsScrollBottom(true);

    // const { colId, sort } = sortState;
    const offset = dataOffset + pageSize;
    setDataOffset(offset);

    // const payload = {
    //   actionType: "scrollToBottom",
    //   type: resSearchParams.type,
    //   keyword: resSearchParams.keyword,
    //   orderkey: "propname",
    //   direction: "ASC",
    //   limit: pageSize,
    //   offset,
    // };

    // await dispatch(setSearchParams(payload));
    // const result = await dispatch(fetchMainSearch("name", payload));
    // if (result.type === FETCH_MAIN_SEARCH_SUCCESS) {
    //   setTableData([...tableData, ...result.payload.data]);
    // }

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
        actionType: "scrollToBottom",
        landingType,
        type: resSearchParams.type,
        keyword: resSearchParams.keyword,
        orderkey: "propname",
        direction: "ASC",
        limit: pageSize,
        offset,
      };

      await dispatch(setSearchParams(payload));
      const result = await dispatch(fetchMainSearch("name", payload));
      if (result.type === FETCH_MAIN_SEARCH_SUCCESS) {
        setTableData([...tableData, ...result.payload.data]);
      }
      setIsScrollBottom(false);
    } else {
      history.push("/landing");
    }
  };

  return (
    <RootWrapper>
      <ReactSpinner loading={isLoading} />
      <AgGrid
        columnDefs={columnDefs}
        rowData={tableData}
        totalRecords={totalRecords}
        dataOffset={dataOffset}
        // sortState={sortState}
        // onSortChanged={handleSortColumn}
        onRowClicked={handleRowClicked}
        onScrollToBottom={handleScrollToBottom}
        isTotalRecords
      />
    </RootWrapper>
  );
}

const RootWrapper = styled.div`
  margin-top: 130px;
  padding: 56px 120px;
  position: relative;
`;
const CellLineHeight = styled.div`
  height: 10px;
`;
