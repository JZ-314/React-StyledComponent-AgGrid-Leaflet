/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ReactSpinner from "../../../components/Loader/ReactSpinner";

import AgGrid from "../../../components/AgGrid";

import {
  fetchMainCatalog,
  fetchMainTable,
  fetchMainText,
  setMainTableParams,
} from "../../../store/main/actions";
import {
  fetchMainSearch,
  setSearchParams,
} from "../../../store/search/actions";
import {
  fetchPreSelect,
  setPreselectParams,
} from "../../../store/preselect/actions";
import { openModal } from "../../../store/app/actions";
import {
  FETCH_MAIN_CATALOG_SUCCESS,
  FETCH_MAIN_TABLE_SUCCESS,
} from "../../../store/main/constants";
import { FETCH_MAIN_SEARCH_SUCCESS } from "../../../store/search/constants";
import { PRE_SELECT_SUCCESS } from "../../../store/preselect/constants";

export const columnDefs = [
  {
    headerName: "blsort",
    field: "blsort",
    sort: "asc",
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.blsort}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "objabbr",
    field: "objabbr",
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.objabbr}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "blsurfpgfr",
    field: "blsurfpgfr",
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.blsurfpgfr}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "blcoord",
    field: "blcoord",
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.blcoord}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "bllogosyll",
    field: "bllogosyll",
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.bllogosyll}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "blmaya1 ",
    field: "blmaya1",
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.blmaya1}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "blengl",
    field: "blengl",
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.blengl}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "blgraphcodes",
    field: "blgraphcodes",
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.blgraphcodes}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "objlc",
    field: "objlc",
    cellRendererFramework: (row) => {
      const { data } = row;
      return <span>{data.Object?.objlc}</span>;
    },
  },
];

export default function MainTable({ params }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const resMain = useSelector((state) => state.main);
  const resSearch = useSelector((state) => state.search);
  const resSelectParams = useSelector((state) => state.search.params);
  const resPreselect = useSelector((state) => state.preselect);
  const resPreselectParams = useSelector((state) => state.preselect.params);

  useEffect(() => {
    async function fetchData() {
      if (params) {
        const savedSelectedOption = localStorage.getItem("savedSelectOption");

        if (
          savedSelectedOption &&
          JSON.parse(savedSelectedOption).search_type === "text"
        ) {
          const payload = JSON.parse(savedSelectedOption);

          await dispatch(setSearchParams(payload));
          await dispatch(fetchMainSearch("select", payload));
        }
        // else {
        // if (
        //   resMain.params?.actionType !== "name" &&
        //   resMain.params?.actionType !== "main-catalog"
        // ) {
        //   const { type, limit, offset } = JSON.parse(params);
        //   const payload = {
        //     actionType: "main",
        //     type,
        //     limit,
        //     offset,
        //     orderkey: "blsort",
        //     direction: "ASC",
        //   };

        //   await dispatch(setMainTableParams(payload));
        //   await dispatch(fetchMainTable(payload));
        // }
        // }
        setIsLoading(false);
      } else {
        history.push("/");
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const { loading, mainTableColumns, data, params } = resMain;
    setIsLoading(loading);

    if (mainTableColumns) {
      const checkedColumns = [];

      mainTableColumns.forEach((item) => {
        if (item.isChecked) {
          checkedColumns.push(item);
        }
      });

      if (Array.isArray(checkedColumns)) {
        setTableColumn(checkedColumns);
      }
    }

    if (data.data) {
      if (params?.actionType === "main" || params?.actionType === "landing") {
        setDataSource("main");
        setTableDetails(data, 50);
      } else if (params?.actionType === "main-catalog") {
        setDataSource("main-catalog");
        setTableDetails(data, 50);
      } else if (params?.actionType === "name") {
        setDataSource("name");
        setTableDetails(data, data.counts);
      }
    }
  }, [resMain]);

  useEffect(() => {
    const { loading, data, params } = resSearch;
    setIsLoading(loading);

    if (data.data) {
      if (params?.actionType === "select") {
        setDataSource("select");
        setTableDetails(data, 50);
      }
    }
  }, [resSearch]);

  useEffect(() => {
    const { loading, data, params } = resPreselect;
    setIsLoading(loading);

    if (data.data) {
      if (params?.actionType === "preselect") {
        setDataSource("preselect");
        setTableDetails(data, 50);
      }
    }
  }, [resPreselect]);

  const setTableDetails = (data, limit) => {
    // console.log(data);
    setTableData(data.data);
    setTotalRecords(data.counts);
    setPageSize(limit);
    setDataOffset(0);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [isScrollBottom, setIsScrollBottom] = useState(false);
  const [dataSource, setDataSource] = useState("main");
  const [tableColumn, setTableColumn] = useState(columnDefs);
  const [tableData, setTableData] = useState([]);
  const [sortState, setSortState] = useState({
    colId: "blsort",
    sort: "ASC",
  });
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [dataOffset, setDataOffset] = useState(0);

  const handleSortColumn = async (e) => {
    if (isLoading) return;
    // setTableData(tableData);

    let sortModel = e.api.getSortModel();
    const colId = sortModel[0].colId;
    const sort = sortModel[0].sort.toUpperCase();

    setSortState({ colId, sort });
    setDataOffset(0);

    if (dataSource === "main") {
      const payload = {
        actionType: "main",
        type: JSON.parse(params).type,
        limit: pageSize,
        offset: 0,
        orderkey: colId,
        direction: sort,
      };

      await dispatch(setMainTableParams(payload));
      await dispatch(fetchMainTable(payload));
    } else if (dataSource === "main-catalog") {
      const payload = {
        actionType: "main-catalog",
        code: `${resMain.params?.code}`,
        limit: pageSize,
        offset: 0,
        orderkey: colId,
        direction: sort,
      };

      await dispatch(setMainTableParams(payload));
      await dispatch(fetchMainCatalog(payload));
    } else if (dataSource === "select") {
      const payload = {
        actionType: "select",
        data: resSelectParams.data,
        type: resSelectParams.type,
        search_type: resSelectParams.search_type,
        limit: pageSize,
        offset: 0,
        orderkey: colId,
        direction: sort,
      };

      await dispatch(setSearchParams(payload));
      await dispatch(fetchMainSearch("select", payload));
    } else if (dataSource === "preselect") {
      let payload = {
        actionType: "preselect",
        type: resPreselectParams.type,
        keyword: resPreselectParams.keyword,
        limit: pageSize,
        offset: 0,
        orderkey: colId,
        direction: sort,
      };

      await dispatch(setSearchParams(payload));
      await dispatch(fetchPreSelect(payload));
    }
  };

  const handleRowClicked = (row) => {
    const { colId, sort } = sortState;

    dispatch(
      openModal({
        modal: "MAIN_TABLE_ROW_MODAL",
        params: {
          category: JSON.parse(params).type,
          row: row.data,
          tableData,
          pageSize,
          dataOffset,
          dataSource,
          orderkey: colId,
          direction: sort,
        },
      })
    );
  };

  const handleScrollToBottom = async () => {
    if (isLoading) return;
    if (isScrollBottom) return;
    if (tableData?.length === totalRecords) return;
    setIsScrollBottom(true);

    const { colId, sort } = sortState;
    const offset = dataOffset + pageSize;
    setDataOffset(offset);

    if (dataSource === "main") {
      const payload = {
        actionType: "scrollToBottom",
        type: JSON.parse(params).type,
        limit: pageSize,
        offset,
        orderkey: colId,
        direction: sort,
        dataSource,
      };

      await dispatch(setMainTableParams(payload));
      const result = await dispatch(fetchMainTable(payload));
      if (result.type === FETCH_MAIN_TABLE_SUCCESS) {
        setTableData([...tableData, ...result.payload.data]);
      }
      setIsScrollBottom(false);
    } else if (dataSource === "main-catalog") {
      const payload = {
        actionType: "scrollToBottom",
        code: `${resMain.params?.code}`,
        limit: pageSize,
        offset,
        orderkey: colId,
        direction: sort,
      };

      await dispatch(setMainTableParams(payload));
      const result = await dispatch(fetchMainCatalog(payload));
      if (result.type === FETCH_MAIN_CATALOG_SUCCESS) {
        setTableData([...tableData, ...result.payload.data]);
      }
      setIsScrollBottom(false);
    } else if (dataSource === "name") {
      const payload = {
        actionType: "scrollToBottom",
        landingType: resMain.params?.landingType,
        pncode: resMain.params?.pncode,
        orderkey: colId,
        direction: sort,
      };

      await dispatch(setMainTableParams(payload));
      const result = await dispatch(fetchMainText(payload));
      if (result.type === FETCH_MAIN_CATALOG_SUCCESS) {
        setTableData([...tableData, ...result.payload.data]);
      }
      setIsScrollBottom(false);
    } else if (dataSource === "select") {
      const payload = {
        actionType: "scrollToBottom",
        data: resSelectParams.data,
        type: resSelectParams.type,
        search_type: resSelectParams.search_type,
        limit: pageSize,
        offset,
        orderkey: colId,
        direction: sort,
      };

      await dispatch(setSearchParams(payload));
      const result = await dispatch(fetchMainSearch("select", payload));
      if (result.type === FETCH_MAIN_SEARCH_SUCCESS) {
        setTableData([...tableData, ...result.payload.data]);
      }
      setIsScrollBottom(false);
    } else if (dataSource === "preselect") {
      const payload = {
        actionType: "scrollToBottom",
        type: resPreselectParams.type,
        keyword: resPreselectParams.keyword,
        limit: pageSize,
        offset,
        orderkey: colId,
        direction: sort,
      };

      await dispatch(setPreselectParams(payload));
      const result = await dispatch(fetchPreSelect(payload));
      if (result.type === PRE_SELECT_SUCCESS) {
        setTableData([...tableData, ...result.payload.data]);
      }
      setIsScrollBottom(false);
    }
  };

  return (
    <MainTableWrapper>
      <ReactSpinner loading={isLoading} />
      <AgGrid
        columnDefs={tableColumn}
        rowData={tableData}
        totalRecords={totalRecords}
        dataOffset={dataOffset}
        sortState={sortState}
        onSortChanged={handleSortColumn}
        onRowClicked={handleRowClicked}
        onScrollToBottom={handleScrollToBottom}
        isTotalRecords
      />
    </MainTableWrapper>
  );
}

const MainTableWrapper = styled.div``;

const CellLineHeight = styled.div`
  height: 10px;
`;
