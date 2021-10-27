/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import ReactSpinner from "../../../components/Loader/ReactSpinner";
import AgGrid from "../../../components/AgGrid";

import {
  fetchComplementation,
  setCatalogParams,
} from "../../../store/catalog/actions";
import { FETCH_COMPLEMENTATION_SUCCESS } from "../../../store/catalog/constants";

export default function Complementation({ data }) {
  const dispatch = useDispatch();
  const resCatalogParams = useSelector((state) => state.catalog.params);

  const columnDefs = [
    {
      headerName: "Objabbr",
      field: "objabbr",
      width: "200px",
      sortable: true,
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
      headerName: "Surface/pgfr",
      field: "blsurfpgfr",
      width: "200px",
      sortable: true,
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
      headerName: "Coordinate",
      field: "blcoord",
      width: "150px",
      sortable: true,
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
      headerName: "Grapheme hyphenated",
      field: "grhyphen",
      width: "350px",
      sortable: true,
      cellRendererFramework: (row) => {
        const { data } = row;
        return (
          <span>
            <CellLineHeight />
            {data?.grhyphen}
            <CellLineHeight />
          </span>
        );
      },
    },
    {
      headerName: "Grapheme transcription",
      field: "grmaya",
      sortable: true,
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
  ];

  useEffect(() => {
    async function fetchData() {
      const payload = {
        actionType: "complementation",
        data: resCatalogParams.data,
        limit: resCatalogParams.pageSize,
        offset: resCatalogParams.offset,
        orderkey: resCatalogParams.orderkey,
        direction: resCatalogParams.direction,
      };
      await dispatch(setCatalogParams(payload));

      const result = await dispatch(fetchComplementation(data?.graphcode));
      setIsLoading(false);

      if (result.type === FETCH_COMPLEMENTATION_SUCCESS) {
        setTableData(result.payload.data);
      }
    }

    fetchData();
  }, [data]);

  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  const handleScrollToBottom = async () => {};

  return (
    <RootWrapper>
      <ReactSpinner loading={isLoading} />
      <AgGrid
        columnDefs={columnDefs}
        rowData={tableData}
        onScrollToBottom={handleScrollToBottom}
      />
    </RootWrapper>
  );
}

const RootWrapper = styled.div`
  margin-top: 20px;
  position: relative;
`;

const CellLineHeight = styled.div`
  height: 10px;
`;
