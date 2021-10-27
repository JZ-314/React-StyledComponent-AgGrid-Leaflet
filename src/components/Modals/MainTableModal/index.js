import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import ReactSpinner from "../../Loader/ReactSpinner";
import DisplayMenuItem from "../../DisplayMenu/DisplayMenuItem";
import MainButton from "../../Buttons/MainButton";
import DataTab from "./DataTab";
import BasicDataTab from "./BasicDataTab";
import TextCitationsTab from "./TextCitationsTab";

import {
  fetchMainTable,
  setMainTableParams,
} from "../../../store/main/actions";
import { FETCH_MAIN_TABLE_SUCCESS } from "../../../store/main/constants";

import IconShare from "../../../assets/images/icons/icon-share.svg";
import IconClose from "../../../assets/images/icons/icon-close.svg";
import IconBack from "../../../assets/images/icons/icon-back.svg";
import IconNext from "../../../assets/images/icons/icon-next.svg";
import {
  fetchMainSearch,
  setSearchParams,
} from "../../../store/search/actions";
import { FETCH_MAIN_SEARCH_SUCCESS } from "../../../store/search/constants";
import {
  fetchPreSelect,
  setPreselectParams,
} from "../../../store/preselect/actions";
import { PRE_SELECT_SUCCESS } from "../../../store/preselect/constants";

const tab = [
  {
    id: "data",
    title: "Data",
  },
  {
    id: "basic-data",
    title: "Basic Data",
  },
  {
    id: "citations",
    title: "Citations",
  },
];

export default function MainTableModal({ closeModal }) {
  const dispatch = useDispatch();

  const resSelectParams = useSelector((state) => state.search.params);
  const resPreselectParams = useSelector((state) => state.preselect.params);
  const params = useSelector((state) => state.app.modalParams);
  const { category, pageSize, orderkey, direction, dataSource } = params;

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
      if (item.blsort === params?.row?.blsort) {
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
        type: category,
        orderkey,
        direction,
      };

      await dispatch(setMainTableParams(payload));
      const result = await dispatch(fetchMainTable(payload));
      setIsSubmitting(false);

      if (result.type === FETCH_MAIN_TABLE_SUCCESS) {
        updateRowData(result, type, offset);

        // const from = parseInt((pageNum - 1) * pageSize) + 1;
        // const to = from + pageSize - 1;
        // setRecordsFrom(from);
        // setRecordsTo(to);
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
    } else if (dataSource === "preselect") {
      const payload = {
        actionType: "arrow-forward",
        type: resPreselectParams.type,
        keyword: resPreselectParams.keyword,
        limit: pageSize,
        offset,
        orderkey,
        direction,
      };

      await dispatch(setPreselectParams(payload));
      const result = await dispatch(fetchPreSelect(payload));
      setIsSubmitting(false);

      if (result.type === PRE_SELECT_SUCCESS) {
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

  const [activeTab, setActiveTab] = useState(tab[0].id);

  return (
    <ModalWrapper>
      <ReactSpinner loading={isSubmitting} />
      <ModalHeader>
        <IconShareImage src={IconShare} />
        <ModalTitleWrapper>
          <IconBackImage src={IconBack} onClick={handleClickButton("prev")} />
          <ModalTitle>
            ID : {rowData?.objabbr} - {rowData?.blsort}
          </ModalTitle>
          <IconBackImage src={IconNext} onClick={handleClickButton("next")} />
        </ModalTitleWrapper>
        <IconShareImage src={IconClose} onClick={closeModal} />
      </ModalHeader>
      <ModalTab>
        <TabWrapper>
          {tab.map((item) => (
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
        {activeTab === "data" && (
          <DataTab
            data={rowData}
            searchType={category}
            closeModal={closeModal}
          />
        )}
        {activeTab === "basic-data" && <BasicDataTab data={rowData} />}
        {activeTab === "citations" && <TextCitationsTab data={rowData} />}
      </ModalContent>
      <ButtonWrapper>
        <MainButton
          color="#FFFFFF"
          size="18px"
          bgColor="rgba(0, 0, 0, 0.88)"
          padding="4px"
        >
          Copy
        </MainButton>
        <MainButton
          color="#FFFFFF"
          size="18px"
          bgColor="rgba(0, 0, 0, 0.88)"
          padding="4px"
          onClick={closeModal}
        >
          Close
        </MainButton>
      </ButtonWrapper>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  width: 1200px;
  background: #fff;
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

const ModalContent = styled.div`
  padding: 8px;
  max-height: 600px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const ModalTab = styled.div`
  margin-bottom: 50px;
  padding: 8px;
`;

const TabWrapper = styled.div`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;
