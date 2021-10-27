/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import ReactSpinner from "../../../components/Loader/ReactSpinner";
import AgGrid from "../../../components/AgGrid";

import {
  fetchCitation,
  setCatalogParams,
} from "../../../store/catalog/actions";
import { FETCH_CITATION_SUCCESS } from "../../../store/catalog/constants";

export default function Citations({ data }) {
  const dispatch = useDispatch();
  const resCatalogParams = useSelector((state) => state.catalog.params);

  const columnDefs = [
    {
      headerName: "Commentary",
      field: "commentary",
      sortable: true,
      cellRendererFramework: (row) => {
        const { data } = row;
        return (
          <span>
            <CellLineHeight />
            {data.commentary}
            <CellLineHeight />
          </span>
        );
      },
    },
    {
      headerName: "Citation",
      field: "citpage",
      sortable: true,
      cellRendererFramework: (row) => {
        const { data } = row;
        return (
          <div>
            <CellLineHeight />
            <div dangerouslySetInnerHTML={{ __html: data.citpage }} />
            <CellLineHeight />
          </div>
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

      const result = await dispatch(fetchCitation(data?.newcodesub));
      setIsLoading(false);

      if (result.type === FETCH_CITATION_SUCCESS) {
        setTableData(result.payload.data);
      }
    }

    fetchData();
  }, [data]);

  const handleScrollToBottom = async () => {};

  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

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
