/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import AgGrid from "../../components/AgGrid";
import ReactSpinner from "../../components/Loader/ReactSpinner";

import { categoryQueryMenu } from "../../configs/queryMenuConfigs";

import { setQueryMenu } from "../../store/app/actions";
import { fetchCatalog, setCatalogParams } from "../../store/catalog/actions";
import { fetchMainSearch, setSearchParams } from "../../store/search/actions";
import { openModal } from "../../store/app/actions";
import { FETCH_CATALOG_SUCCESS } from "../../store/catalog/constants";
import { FETCH_MAIN_SEARCH_SUCCESS } from "../../store/search/constants";

export const catalogColumnDefs = [
  {
    headerName: "codeid",
    field: "codeid",
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.codeid}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "catcodem",
    field: "graphcode",
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.graphcode}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "catvol",
    field: "volume",
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.volume}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "cattech",
    field: "technique",
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.technique}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "catdistr",
    field: "distribution",
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.distribution}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "catusage",
    field: "usage1",
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.usage1}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "catsyll",
    field: "syllabic",
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.syllabic}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "catlogo",
    field: "logographic",
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.logographic}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "catengl",
    field: "english",
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.english}
          <CellLineHeight />
        </span>
      );
    },
  },
  {
    headerName: "catcalendrical",
    field: "calendrical",
    cellRendererFramework: (row) => {
      const { data } = row;
      return (
        <span>
          <CellLineHeight />
          {data?.calendrical}
          <CellLineHeight />
        </span>
      );
    },
  },
];

export default function Catalog({ isMainTab }) {
  const dispatch = useDispatch();

  const resCatalog = useSelector((state) => state.catalog);
  const resSelect = useSelector((state) => state.search);
  const resSelectParams = useSelector((state) => state.search.params);

  const [isLoading, setIsLoading] = useState(true);
  const [isScrollBottom, setIsScrollBottom] = useState(false);
  const [dataSource, setDataSource] = useState("catalog");
  const [tableData, setTableData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [dataOffset, setDataOffset] = useState(0);
  const [sortState, setSortState] = useState({
    colId: "codeid",
    sort: "DESC",
  });

  useEffect(() => {
    async function fetchData() {
      await dispatch(setQueryMenu(categoryQueryMenu));

      const savedSelectedOption = localStorage.getItem("savedSelectOption");

      if (
        savedSelectedOption &&
        JSON.parse(savedSelectedOption).search_type === "catalog"
      ) {
        const payload = JSON.parse(savedSelectedOption);

        await dispatch(setSearchParams(payload));
        await dispatch(fetchMainSearch("select", payload));
      } else {
        if (resCatalog.params?.actionType !== "main-catalog") {
          let type;
          if (localStorage.getItem("landingParams")) {
            const searchType = JSON.parse(
              localStorage.getItem("landingParams")
            ).type;

            if (searchType === "catalog") {
              type = "";

              localStorage.setItem(
                "catalogParams",
                JSON.stringify({
                  type,
                  limit: 50,
                  offset: 0,
                })
              );
            } else {
              if (localStorage.getItem("catalogParams")) {
                const catalogParams = JSON.parse(
                  localStorage.getItem("catalogParams")
                );

                type = catalogParams.type;
              }
            }
          }

          const payload = {
            actionType: "catalog",
            type,
            limit: 50,
            offset: 0,
            direction: "DESC",
            orderkey: "codeid",
          };

          await dispatch(setCatalogParams(payload));
          await dispatch(fetchCatalog(payload));
        }
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const { loading, data, params } = resCatalog;
    setIsLoading(loading);

    if (data.data) {
      if (params.actionType === "catalog") {
        setDataSource("catalog");
        setTableDetails(data, 50);
      } else if (params.actionType === "main-catalog") {
        setDataSource("main-catalog");
        setTableDetails(data, 0);
      }
    }
  }, [resCatalog]);

  useEffect(() => {
    const { loading, data } = resSelect;
    setIsLoading(loading);

    if (data.data) {
      if (resSelectParams?.actionType === "select") {
        setDataSource("select");
        setTableDetails(data, 50);
      }
    }
  }, [resSelect]);

  const setTableDetails = (data, limit) => {
    setTableData(data.data);
    setPageSize(limit);
    setTotalRecords(data.counts);
    setDataOffset(0);
  };

  const handleSortColumn = async (e) => {
    if (isLoading) return;

    let sortModel = e.api.getSortModel();
    const colId = sortModel[0].colId;
    const sort = sortModel[0].sort.toUpperCase();

    setSortState({ colId, sort });
  };

  const handleRowClicked = (row) => {
    const landingParams = localStorage.getItem("landingParams");

    dispatch(
      openModal({
        modal: "CATALOG_TABLE_ROW_MODAL",
        params: {
          row: row.data,
          searchType: JSON.parse(landingParams).type,
          tableData,
          pageSize,
          dataOffset,
          dataSource,
        },
      })
    );
  };

  const handleScrollToBottom = async () => {
    if (isLoading) return;
    if (isScrollBottom) return;
    if (tableData?.length === totalRecords) return;

    const type = JSON.parse(localStorage.getItem("catalogParams")).type;
    const { colId, sort } = sortState;
    const offset = dataOffset + pageSize;

    setDataOffset(offset);
    setIsLoading(true);
    setIsScrollBottom(true);
    if (dataSource === "catalog") {
      let payload = {
        actionType: "scrollToBottom",
        type,
        limit: pageSize,
        offset,
        orderkey: colId,
        direction: sort,
        dataSource,
      };

      await dispatch(setCatalogParams(payload));
      const result = await dispatch(fetchCatalog(payload));
      if (result.type === FETCH_CATALOG_SUCCESS) {
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
    }
  };

  return (
    <RootWrapper>
      <ContentWrapper isMainTab={isMainTab}>
        <ReactSpinner loading={isLoading} />
        <AgGrid
          columnDefs={catalogColumnDefs}
          rowData={tableData}
          totalRecords={totalRecords}
          dataOffset={dataOffset}
          sortState={sortState}
          onSortChanged={handleSortColumn}
          onRowClicked={handleRowClicked}
          onScrollToBottom={handleScrollToBottom}
          isTotalRecords
        />
      </ContentWrapper>
    </RootWrapper>
  );
}

const RootWrapper = styled.div`
  width: 100%;
`;

const ContentWrapper = styled.div`
  margin-top: ${({ isMainTab }) => (isMainTab ? 0 : `104px`)};
  padding: ${({ isMainTab }) => (isMainTab ? 0 : `56px 120px`)};
`;

const CellLineHeight = styled.div`
  height: 10px;
`;
