import React from "react";
import styled from "styled-components";
import DataTable from "react-data-table-component";
import Pagination from "react-js-pagination";
import "bootstrap/dist/css/bootstrap.min.css";

import { customStyles } from "./styles";

export default function ReactDataTable({
  columnDefs,
  rowData,
  activePage,
  itemsCountPerPage,
  totalItemsCount,
  dataOffset,
  pageRangeDisplayed,
  onSort,
  onRowClicked,
  onPagination,
  onChangePageSize,
  onChangePage,
  isPagination,
  isPaginationButton,
}) {
  const recordsFrom = parseInt((activePage - 1) * itemsCountPerPage) + 1;
  const recordsTo = recordsFrom + itemsCountPerPage - 1;

  if (rowData !== null) {
    return (
      <DataTableWrapper>
        <DataTable
          columns={columnDefs}
          customStyles={customStyles}
          data={rowData}
          highlightOnHover
          pointerOnHover
          fixedHeader
          striped
          onSort={onSort}
          onRowClicked={onRowClicked}
          overflowY
          // overflowYOffset="300px"
          // responsive
          // pagination
        />
        <TablePageOptionsWrapper>
          {isPagination && totalItemsCount !== 0 && (
            <>
              <PagesizeOptions
                value={itemsCountPerPage}
                onChange={onChangePageSize}
              >
                <PagesizeOption value="10">10</PagesizeOption>
                <PagesizeOption value="25">25</PagesizeOption>
                <PagesizeOption value="50">50</PagesizeOption>
                <PagesizeOption value="100">100</PagesizeOption>
              </PagesizeOptions>
              <PaginationWrapper>
                <TotalRowCount>
                  Showing {recordsFrom} to {recordsTo} of {totalItemsCount}{" "}
                  entries
                </TotalRowCount>
                <Pagination
                  className="pagination-field"
                  itemClass="page-item" // add it for bootstrap 4
                  linkClass="page-link" // add it for bootstrap 4
                  activePage={activePage}
                  itemsCountPerPage={itemsCountPerPage}
                  totalItemsCount={totalItemsCount}
                  pageRangeDisplayed={pageRangeDisplayed}
                  onChange={onPagination}
                />
              </PaginationWrapper>
            </>
          )}
          {isPaginationButton && (
            <>
              {dataOffset === 0 && rowData?.length !== itemsCountPerPage ? (
                <></>
              ) : (
                <>
                  <PagesizeOptions
                    value={itemsCountPerPage}
                    onChange={onChangePageSize}
                  >
                    <PagesizeOption value="10">10</PagesizeOption>
                    <PagesizeOption value="25">25</PagesizeOption>
                    <PagesizeOption value="50">50</PagesizeOption>
                    <PagesizeOption value="100">100</PagesizeOption>
                  </PagesizeOptions>
                  <ButtonWrapper>
                    {dataOffset !== 0 && (
                      <Button onClick={onChangePage("back")}>Prev</Button>
                    )}
                    {rowData?.length === itemsCountPerPage && (
                      <Button onClick={onChangePage("next")}>Next</Button>
                    )}
                  </ButtonWrapper>
                </>
              )}
            </>
          )}
        </TablePageOptionsWrapper>
      </DataTableWrapper>
    );
  } else {
    return <Alert>No Display Data</Alert>;
  }
}

const DataTableWrapper = styled.div``;

const TablePageOptionsWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-top: 270px;
`;

const PagesizeOptions = styled.select`
  position: relative;
  margin-right: 25px;
  border: 1px solid #ada8a8;
  padding: 4px;
  color: #6b6b6b;

  &:focus {
    outline: none;
  }
`;

const PagesizeOption = styled.option`
  border: 1px solid #ada8a8;

  &:checked {
    background: #6b6b6b -webkit-linear-gradient(bottom, #6b6b6b 0%, #6b6b6b 100%);
    color: #fff;
  }
`;

const PaginationWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  .pagination {
    margin: 0;
  }

  ul.pagination li a {
    text-decoration: none;
    color: #6b6b6b;
    font-size: 15px;

    &:hover {
      color: #6b6b6b;
    }
  }

  ul.pagination li.active a {
    color: white;
    background-color: #6b6b6b;
    border-color: #6b6b6b;

    &:hover {
      color: #fff;
    }

    &:focus {
      outline: none;
    }
  }
`;

const TotalRowCount = styled.span`
  color: #333;
  margin-bottom: 5px;
`;

const Alert = styled.div`
  font-size: 24px;
  color: #333;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

const Button = styled.button`
  border: 1px solid #b7b7b7;
  border-radius: 4px;
  margin-left: 10px;
  color: #404040;
  cursor: pointer;
  padding: 4px;
`;
