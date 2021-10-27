import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import DisplayMenuItem from "../../DisplayMenu/DisplayMenuItem";
import Data from "../../../pages/Catalog/Data";
import Lexical from "../../../pages/Catalog/Lexical";
import Complementation from "../../../pages/Catalog/Completementation";
import Substitution from "../../../pages/Catalog/Substitution";
import Classifications from "../../../pages/Catalog/Classifications";
import Citations from "../../../pages/Catalog/Citations";

import { fetchCatalog, setCatalogParams } from "../../../store/catalog/actions";
import { FETCH_CATALOG_SUCCESS } from "../../../store/catalog/constants";

import IconShare from "../../../assets/images/icons/icon-share.svg";
import IconClose from "../../../assets/images/icons/icon-close.svg";
import IconBack from "../../../assets/images/icons/icon-back.svg";
import IconNext from "../../../assets/images/icons/icon-next.svg";
import {
  fetchMainSearch,
  setSearchParams,
} from "../../../store/search/actions";
import { FETCH_MAIN_SEARCH_SUCCESS } from "../../../store/search/constants";
import ReactSpinner from "../../Loader/ReactSpinner";

const displayTabAll = [
  {
    id: "data",
    title: "Data",
  },
  {
    id: "lexical",
    title: "Lexical",
  },
  {
    id: "complementation",
    title: "Complementation",
  },
  {
    id: "substitution",
    title: "Substitution",
  },
  {
    id: "classifications",
    title: "Classifications",
  },
  {
    id: "citations",
    title: "Citations",
  },
];

// const displayTab = [
//   {
//     id: "lexical",
//     title: "Lexical",
//   },
//   {
//     id: "classifications",
//     title: "Classifications",
//   },
//   {
//     id: "citations",
//     title: "Citations",
//   },
// ];

export default function CatalogModal({ closeModal }) {
  const dispatch = useDispatch();

  const resSelectParams = useSelector((state) => state.search.params);
  const params = useSelector((state) => state.app.modalParams);
  const { pageSize, orderkey, direction, dataSource } = params;

  const selectedDisplayTab = params?.searchType?.includes("graphemes")
    ? displayTabAll
    : displayTabAll;

  const [activeTab, setActiveTab] = useState(selectedDisplayTab[0].id);

  const [rowsData, setRowsData] = useState([]);
  const [dataIndex, setDataIndex] = useState(0);
  const [tableDataOffset, setTableDataOffset] = useState(0);
  // const [recordsFrom, setRecordsFrom] = useState(0);
  // const [recordsTo, setRecordsTo] = useState(0);
  const [rowData, setRowData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // initial data
    setRowsData(params?.tableData);
    setRowData(params?.row);
    setTableDataOffset(params?.dataOffset);

    // const from = parseInt((params?.currentPage - 1) * pageSize) + 1;
    // const to = from + pageSize - 1;
    // setRecordsFrom(from);
    // setRecordsTo(to);

    let index = 0;
    params?.tableData.forEach((item) => {
      if (item.codeid === params?.row?.codeid) {
        setDataIndex(index);
      }
      index++;
    });
  }, []);

  const handleClickButton = (type) => async () => {
    if (type === "prev") {
      if (dataIndex !== 0) {
        setDataIndex(dataIndex - 1);
        setRowData(rowsData[dataIndex - 1]);
      } else {
        fetchTableRows(type, tableDataOffset - pageSize);
      }
    } else if (type === "next") {
      if (dataIndex !== rowsData.length - 1) {
        setDataIndex(dataIndex + 1);
        setRowData(rowsData[dataIndex + 1]);
      } else {
        fetchTableRows(type, tableDataOffset + pageSize);
      }
    }
  };

  const fetchTableRows = async (type, offset) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    if (dataSource === "main") {
      let payload = {
        actionType: "arrow-forward",
        limit: pageSize,
        offset,
        orderkey,
        direction,
      };

      await dispatch(setCatalogParams(payload));
      const result = await dispatch(fetchCatalog(payload));
      setIsSubmitting(false);

      if (result.type === FETCH_CATALOG_SUCCESS) {
        updateRowData(result, type, offset);
      }
    } else if (dataSource === "select") {
      const payload = {
        actionType: "arrow-forward",
        data: resSelectParams.data,
        type: resSelectParams.type,
        search_type: resSelectParams.search_type,
        limit: pageSize,
        offset,
        orderkey,
        direction,
      };

      await dispatch(setSearchParams(payload));
      const result = await dispatch(fetchMainSearch("select", payload));
      setIsSubmitting(false);

      if (result.type === FETCH_MAIN_SEARCH_SUCCESS) {
        updateRowData(result, type, offset);
      }
    }
  };

  const updateRowData = (result, type, offset) => {
    if (result.payload?.data.length !== 0) {
      setRowsData(result.payload?.data);
      setRowData(
        result.payload?.data[type === "prev" ? rowsData.length - 1 : 0]
      );
      setTableDataOffset(offset);
      setDataIndex(type === "prev" ? rowsData.length - 1 : 0);
    }
  };

  return (
    <ModalWrapper>
      <ReactSpinner loading={isSubmitting} />
      <ModalHeader>
        <IconShareImage src={IconShare} />
        <ModalTitleWrapper>
          <IconBackImage src={IconBack} onClick={handleClickButton("prev")} />
          <ModalTitle>ID : {rowData?.codeid}</ModalTitle>
          <IconBackImage src={IconNext} onClick={handleClickButton("next")} />
        </ModalTitleWrapper>
        <IconShareImage src={IconClose} onClick={closeModal} />
      </ModalHeader>
      <ModalTab>
        <TabWrapper>
          {selectedDisplayTab.map((item) => (
            <DisplayMenuItem
              key={item.id}
              title={item.title}
              isActive={activeTab === item.id}
              onTabItemClicked={() => setActiveTab(item.id)}
            />
          ))}
        </TabWrapper>
      </ModalTab>
      <ModalContent>
        {activeTab === "data" && <Data rowData={rowData} />}
        {activeTab === "lexical" && <Lexical data={rowData} />}
        {activeTab === "complementation" && <Complementation data={rowData} />}
        {activeTab === "substitution" && <Substitution data={rowData} />}
        {activeTab === "classifications" && <Classifications data={rowData} />}
        {activeTab === "citations" && <Citations data={rowData} />}
      </ModalContent>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  width: 1200px;
  background: #ffffff;
  padding: 0px;
  box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.04);
`;

const ModalHeader = styled.div`
  background: rgba(196, 196, 196, 0.29);
  height: 50px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconShareImage = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const ModalTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconBackImage = styled.img`
  width: 15px;
  cursor: pointer;
`;

const ModalTitle = styled.span`
  color: #001e89;
  font-size: 24px;
  margin: 0 20px;
`;

const ModalTab = styled.div`
  margin-right: 20px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const TabWrapper = styled.div`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const ModalContent = styled.div`
  padding: 10px 30px 30px;
  max-height: 600px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }
`;
