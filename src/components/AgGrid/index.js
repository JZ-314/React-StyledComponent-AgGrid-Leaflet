import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { AgGridReact } from "ag-grid-react";
import "./index.css";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { clickDownload } from "../../store/app/actions";

const ReactAgGrid = ({
  columnDefs,
  rowData,
  sortState,
  totalRecords,
  isTotalRecords,
  onRowClicked,
  onSortChanged,
  onScrollToBottom,
  isAutoHeight,
}) => {
  const dispatch = useDispatch();

  // const columnDefs = [
  //   {
  //     headerName: "Make",
  //     field: "make",
  //   },
  //   {
  //     headerName: "Model",
  //     field: "model",
  //   },
  //   {
  //     headerName: "Price",
  //     field: "price",
  //   },
  //   // {
  //   //   headerName: "Actions",
  //   //   field: "transactions",
  //   //   width: 150,
  //   //   cellRendererFramework: params => {
  //   //     return (
  //   //       <div className="actions cursor-pointer">
  //   //         <Edit
  //   //             className="mr-50"
  //   //             size={15}
  //   //             onClick={(e) => {
  //   //                 let selectedData = this.gridApi.getSelectedRows();
  //   //                 this.handleUpdateRow(selectedData[0]);
  //   //             }}
  //   //         />
  //   //         <Trash2
  //   //           size={15}
  //   //           onClick={() => {
  //   //             let selectedData = this.gridApi.getSelectedRows();
  //   //             this.gridApi.updateRowData({ remove: selectedData });
  //   //             this.handleDeleteRow(selectedData);
  //   //           }}
  //   //         />
  //   //       </div>
  //   //     )
  //   //   }
  //   // }
  // ];

  const resClickDownload = useSelector((state) => state.app.clickDownload);

  const defaultColDef = {
    miWidth: 100,
    sortable: true,
    editable: false,
    resizable: true,
    // filter: true,
    wrapText: true,
    autoHeight: true,
    sortingOrder: ["asc", "desc"],
  };

  const [height, setHeight] = useState("60vh");
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [stayScrolledToEnd, setStayScrolledToEnd] = useState(true);
  // const [filterColumn, setFilterColumn] = useState(null);
  // const [filterModel, setFilterModel] = useState(null);

  useEffect(() => {
    if (gridApi) {
      gridApi.sizeColumnsToFit();
    }
  }, [gridApi]);

  useEffect(() => {
    if (isAutoHeight) {
      setAutoHeight();
    } else {
      setFixedHeight();
    }
  }, [isAutoHeight]);

  useEffect(() => {
    if (gridColumnApi) {
      gridColumnApi.applyColumnState({ data: sortState });
    }
  }, [gridColumnApi, sortState]);

  useEffect(() => {
    if (resClickDownload) {
      onBtnExport();
    }
  }, [resClickDownload]);

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    // keep column state (sort, filter ...)
    // var columnState = JSON.parse(localStorage.getItem("agGridColumnState"));
    // if (columnState) {
    //   params.columnApi.setColumnState(columnState);
    // }
  };

  const onSetColumnState = (params) => {
    var columnState = JSON.stringify(params.columnApi.getColumnState());
    localStorage.setItem("agGridColumnState", columnState);
  };

  const onColumnMoved = (params) => {
    onSetColumnState(params);
  };

  const gridOptions = {
    columnDefs,
    defaultColDef,
    rowSelection: "multiple",
    suppressScrollOnNewData: true,
    domLayout: "autoHeight",
    onGridReady: onGridReady,
    onColumnMoved: onColumnMoved,
  };

  const onBtnExport = async () => {
    await gridApi.exportDataAsCsv();
    await dispatch(clickDownload(false));
  };

  const getFilterData = (e) => {
    const filterData = e.api.getFilterModel();
    const keys = Object.keys(filterData);
    const savedFilters = keys.length > 0 ? keys.join(", ") : null;

    return savedFilters;
  };

  const onFilterChanged = useCallback(
    (e) => {
      getFilterData(e);
      // setFilterColumn(savedFilters);
    },
    [getFilterData]
  );

  const onBodyScroll = useCallback(
    (event) => {
      if (getFilterData(event)) return;

      if (event.top !== -1) {
        const grid = document.getElementById("ag-grid");
        if (grid) {
          const gridBody = grid.querySelector(".ag-body-viewport");
          const scrollPos = gridBody.offsetHeight + event.top;
          const scrollDiff = gridBody.scrollHeight - scrollPos;

          setStayScrolledToEnd(scrollDiff <= 3);

          if (scrollDiff <= 3) {
            onScrollToBottom();
          }
        }
      }
    },
    [getFilterData]
  );

  const handleRowDataChanged = () => {
    const index = this.messages.length - 1;
    if (stayScrolledToEnd) {
      gridOptions.api.ensureIndexVisible(index, "bottom");
    }
  };

  const setAutoHeight = () => {
    gridOptions.api.setDomLayout("autoHeight");
    // auto height will get the grid to fill the height of the contents,
    // so the grid div should have no height set, the height is dynamic.
    setHeight("");
  };

  const setFixedHeight = () => {
    // we could also call setDomLayout(null or undefined) here as normal is the default
    gridOptions.api.setDomLayout("normal");
    // when auto height is off, the grid ahs a fixed height, and then the grid
    // will provide scrollbars if the data does not fit into it.
    setHeight("60vh");
  };

  return (
    <div
      id="ag-grid"
      className="ag-theme-alpine"
      style={{ height, width: "100%" }}
    >
      {/* <FilterInput
        type="text"
        placeholder="Filter Text..."
        onChange={(e) => setFilterText(e.target.value)}
        value={filterText}
      /> */}
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        gridOptions={gridOptions}
        defaultColDef={defaultColDef}
        suppressExcelExport={true}
        onGridReady={onGridReady}
        onBodyScroll={onBodyScroll}
        onColumnMoved={onColumnMoved}
        onRowClicked={onRowClicked}
        onSortChanged={onSortChanged}
        onFilterChanged={onFilterChanged}
        rowDataChanged={handleRowDataChanged}
        rowStyle={rowStyle}
      ></AgGridReact>
      {isTotalRecords && (
        <TotalRowCount>
          Showing {rowData?.length === 0 ? 0 : 1} to {rowData?.length} of{" "}
          {totalRecords} entries
        </TotalRowCount>
      )}
    </div>
  );
};

const TotalRowCount = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #333;
  margin-top: 20px;
  padding-bottom: 20px;
  font-size: 16px;
`;

// const FilterInput = styled.input`
//   padding: 8px;
//   border-radius: 3px;
//   margin-bottom: 10px;
//   border: 1px solid #888;
//   color: #888;

//   &:focus {
//     outline: none;
//   }
// `;

const rowStyle = {
  // paddingTop: "5px",
  // paddingBottom: "5px",
};

export default ReactAgGrid;
