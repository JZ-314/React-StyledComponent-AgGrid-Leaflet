/* eslint-disable react/display-name */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import DisplayMenuTab from "../../components/DisplayMenu";
import MainTable from "./MainTable";
import Map from "./Map";

import { setQueryMenu } from "../../store/app/actions";

import {
  mainQueryMenu,
  categoryQueryMenu,
} from "../../configs/queryMenuConfigs";
import { fetchMainTable, setMainTableParams } from "../../store/main/actions";

export const MainDisplayTab = [
  {
    id: "main-table",
    title: "Table",
  },
  // {
  //   id: "main-analyze",
  //   title: "Analyze",
  // },
  {
    id: "main-map",
    title: "Map",
  },
];

export default function Main() {
  const dispatch = useDispatch();
  const params = localStorage.getItem("landingParams");

  const resMain = useSelector((state) => state.main);

  useEffect(() => {
    async function fetchData() {
      await dispatch(setQueryMenu(mainQueryMenu));
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (params) {
        if (
          resMain.params?.actionType !== "landing" &&
          resMain.params?.actionType !== "name" &&
          resMain.params?.actionType !== "main-catalog"
        ) {
          const { type, limit, offset } = JSON.parse(params);
          const payload = {
            actionType: "main",
            type,
            limit,
            offset,
            orderkey: "blsort",
            direction: "ASC",
          };

          await dispatch(setMainTableParams(payload));
          await dispatch(fetchMainTable(payload));
        }
      } else {
        history.push("/");
      }
    }

    fetchData();
  }, []);

  const [activeTab, setActiveTab] = useState(MainDisplayTab[0].id);

  useEffect(() => {
    if (activeTab === "texts") {
      dispatch(setQueryMenu(mainQueryMenu));
    } else if (activeTab === "catalog") {
      dispatch(setQueryMenu(categoryQueryMenu));
    }
  }, [activeTab]);

  const handleClickTab = (id) => {
    setActiveTab(id);
  };

  return (
    <RootWrapper>
      <DisplayMenuTab
        menu={MainDisplayTab}
        activeTab={activeTab}
        bgColor="#f1f1f1"
        onClickTab={handleClickTab}
      />
      <ContentWrapper>
        {activeTab === "main-table" && (
          <MainTableWrapper>
            <MainTable params={params} />
          </MainTableWrapper>
        )}
        {activeTab === "main-map" && <Map />}
      </ContentWrapper>
    </RootWrapper>
  );
}

const RootWrapper = styled.div`
  width: 100%;
`;

const ContentWrapper = styled.div`
  margin-top: 130px;
  padding: 56px 120px;
  position: relative;
`;

const MainTableWrapper = styled.div``;
